package logging

import (
	"fmt"
	"log"
	"os"
	"strings"
	"sync"
	"time"

	cms_context "shiloheye.com/hmis/lib/context"
	"shiloheye.com/hmis/lib/logging/log_item/v2"
)

var lock sync.Mutex

var Logger = NewLogger()

const log_dir string = "./log"

type log_file_t struct {
	log_item.LogLevelT
	LogFileWriter
}

type log_file = *log_file_t
type LoggerT struct {
	sync.RWMutex
	C chan *log_item.LogItem

	uniq_logf map[string]log_file
}

func init() {

}

func NewLogger() (lt *LoggerT) {
	lt = &LoggerT{
		C:         make(chan *log_item.LogItem, 5),
		uniq_logf: map[string]log_file{},
	}

	return
}

func (lt *LoggerT) WriteToLogFile(logs []*log_item.LogItem) (err error) {

	for _, log_it := range logs {
		for m, logf := range lt.uniq_logf {
			if logf.File != nil {
			} else {
				if err := logf.Open(m); err != nil {
					log.Println(err.Error())
					continue
				}

			}

			if logf.LogLevelT.No() >= log_it.No() {
				logf.append_queue(log_it)
			}
		}
	}

	for _, log_t := range lt.uniq_logf {
		if _, err := log_t.write_queue(); err != nil {
			fmt.Fprint(os.Stderr, err)
		}
		log_t.clear_queue()
	}
	return nil
}

func (lt *LoggerT) AddLogFile(log_level log_item.LogLevelT, name string) (logger *LogFileWriter, err error) {
	lt.Lock()
	defer lt.Unlock()
	if v, ok := lt.uniq_logf[name]; ok && v.File != nil {
		return
	}

	llt := &log_file_t{
		LogLevelT: log_level,
		LogFileWriter: LogFileWriter{
			P: name,
		},
	}
	logger = &llt.LogFileWriter
	err = llt.LogFileWriter.Open()
	if err != nil {
		return
	}
	lt.uniq_logf[name] = llt
	return
}

type duration_t = int

const (
	// "2006-01-02 15:04:05.999999999 -0700 MST"
	//
	// "20060102_15"
	DurationHour duration_t = 13
	// "2006-01-02 15:04:05.999999999 -0700 MST"
	//
	// "20060102"
	DurationDay duration_t = 10
	// "2006-01-02 15:04:05.999999999 -0700 MST"
	//
	// "200601"
	DurationMonth duration_t = 7
)

func get_new_name(path string, dur duration_t) string {
	new_name := path + "_" + time.Now().String()[:dur]
	new_name = strings.ToLower(new_name)
	new_name = strings.ReplaceAll(new_name, "-", "")
	new_name = strings.ReplaceAll(new_name, " ", "_")
	new_name = strings.ReplaceAll(new_name, ":", "")
	return new_name
}
func (lt *LoggerT) add_timed_log_file(ctx cms_context.Context, log_level log_item.LogLevelT, path string, duration duration_t) (err error) {

	new_name := get_new_name(path, duration)

	t := time.NewTicker(time.Minute)
	_, err = lt.AddLogFile(log_level, new_name)
	if err != nil {
		return
	}

	go func() {
		defer ctx.Finished()

		var old_name string

		for ok := true; ok; {
			select {
			case _, ok = <-ctx.Done():
			case <-t.C:
			}

			old_name, new_name = new_name, get_new_name(path, DurationDay)

			if new_name == old_name {
				continue
			}

			_, err = lt.AddLogFile(log_level, new_name)
			if err != nil {
				log.Println(err)
			}

		}
	}()

	return nil
}

func (lt *LoggerT) Engine(ctx cms_context.Context) error {
	defer ctx.Finished()
	lock.Lock()
	defer lock.Unlock()

	var v *log_item.LogItem
	log_queue := []*log_item.LogItem{}
	t := time.NewTicker(time.Second)

	lt.add_timed_log_file(ctx, log_item.LOGLEVEL_WARN, "day/errors", DurationDay)
	lt.add_timed_log_file(ctx, log_item.LOGLEVEL_TRACE, "day/log", DurationDay)
	lt.add_timed_log_file(ctx, log_item.LOGLEVEL_WARN, "month/errors", DurationMonth)
	lt.add_timed_log_file(ctx, log_item.LOGLEVEL_TRACE, "month/log", DurationMonth)
	lt.AddLogFile(log_item.LOGLEVEL_WARN, "sink")

	for ok := true; ok; {

		select {
		case _, ok = <-ctx.Done():
			return ctx.Err()
		case v = <-lt.C:
			if v != nil {
				log_queue = append(log_queue, v)

				if v.Is_error() || v.Is_fatal() || v.Is_warn() {
					fmt.Fprint(os.Stderr, v.Read())
				} else {
					fmt.Print(v.Read())
				}
				if v.Is_fatal() {
					lt.WriteToLogFile(log_queue)
					os.Exit(-1)
				}
			}
			continue
		case <-t.C:
		}
		lt.WriteToLogFile(log_queue)
		if len(log_queue) > 0 {

			log.Println("updated log")
		}
		clear(log_queue)

	}

	return nil
}

func (lt *LoggerT) NewLogger(ctx cms_context.Context, log_level log_item.LogLevelT, path string) (lf *FakeLogger, err error) {
	lf = &FakeLogger{}

	go lf.Engine(ctx, log_level, path, lt.C)
	return

}

func (le *LoggerT) RecoverFunc(loc log_item.Loc) (func(format string, v ...any), func()) {
	after := &struct {
		str string
	}{
		str: "setup",
	}

	recover_func := func() {
		log := log_item.NewLogItem(loc).SetAfter(after.str)
		if r := recover(); r != nil {
			log.Set_level_error()
			if err, ok := r.(error); ok {
				log.AppendParent(err)
			}
			fmt.Println("==================================================")
			fmt.Println("===================recovering=====================")
			fmt.Println(after.str)
			fmt.Println("==================================================")
			log.Log(le.C)
		}
	}

	set_after := func(format string, v ...any) {
		after.str = fmt.Sprintf(format, v...)
	}

	return set_after, recover_func
}
