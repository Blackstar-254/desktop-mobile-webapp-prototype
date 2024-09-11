package logging

import (
	"io"
	"sync"
	"sync/atomic"
	"time"

	cms_context "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/context"
	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/logging/log_item/v2"
)

type FakeLogger struct {
	C chan *log_item.LogItem

	out  io.Writer
	lock sync.Mutex

	prefix atomic.Pointer[string] // prefix on each line to identify the // Logger (but see Lmsgprefix)
	flag   atomic.Int32           // properties

}

func (fl *FakeLogger) Engine(ctx cms_context.Context, log_level log_item.LogLevelT, path string, extern_C chan *log_item.LogItem) {
	defer ctx.Finished()

	lf := &LogFileWriter{P: get_new_name(path, DurationDay)}
	for ok := true; ok; {
		select {
		case _, ok = <-ctx.Done():
		case v := <-fl.C:
			if v != nil {
			} else {
				continue
			}
			extern_C <- v
			if v.LogLevelT.No() >= log_level.No() {
				lf.WriteString(v.Read())
			}

		}
	}

}

func (l *FakeLogger) Fatal(v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp

}
func (l *FakeLogger) Fatalf(format string, v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp
}
func (l *FakeLogger) Fatalln(v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp
}
func (l *FakeLogger) Flags() int {
	return int(l.flag.Load())
}
func (l *FakeLogger) Output(calldepth int, s string) error {
	return nil
}
func (l *FakeLogger) Panic(v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp
	panic(tmp)
}
func (l *FakeLogger) Panicf(format string, v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp
	panic(tmp)
}
func (l *FakeLogger) Panicln(v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp
	panic(tmp)
}
func (l *FakeLogger) Prefix() string {
	return *l.prefix.Load()
}
func (l *FakeLogger) Print(v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp
}
func (l *FakeLogger) Printf(format string, v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp
}
func (l *FakeLogger) Println(v ...any) {
	tmp := &log_item.LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	tmp.SetMessage(v...)
	l.C <- tmp
}
func (l *FakeLogger) SetFlags(flag int) {
	l.flag.Store(int32(flag))
}
func (l *FakeLogger) SetOutput(w io.Writer) {
	l.lock.Lock()
	l.out = w
	l.lock.Unlock()
}
func (l *FakeLogger) SetPrefix(prefix string) {
	l.prefix.Store(&prefix)
}
