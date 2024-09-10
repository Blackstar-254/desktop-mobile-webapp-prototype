package log_item

import (
	"fmt"
	"strings"
	"sync"
	"time"
)

type LogItem struct {
	LogLevelT
	T time.Time
	sync.RWMutex
	M         map[string]string
	CallStack []string
}

type LogErr = *LogItem

type Loc string

func Locf(str string, v ...any) Loc {
	return Loc(fmt.Sprintf(str, v...))
}

func (l Loc) String() string {
	return string(l)
}

type LogLevelT string

const (
	LOGLEVEL_LOG   LogLevelT = "log"
	LOGLEVEL_TRACE LogLevelT = "trace"
	LOGLEVEL_DEBUG LogLevelT = "debug"
	LOGLEVEL_WARN  LogLevelT = "warn"
	LOGLEVEL_ERROR LogLevelT = "error"
	LOGLEVEL_FATAL LogLevelT = "fatal"
)

func (lt LogLevelT) Is_log() bool   { return lt == LOGLEVEL_LOG }
func (lt LogLevelT) Is_trace() bool { return lt == LOGLEVEL_TRACE }
func (lt LogLevelT) Is_debug() bool { return lt == LOGLEVEL_DEBUG }
func (lt LogLevelT) Is_warn() bool  { return lt == LOGLEVEL_WARN }
func (lt LogLevelT) Is_error() bool { return lt == LOGLEVEL_ERROR }
func (lt LogLevelT) Is_fatal() bool { return lt == LOGLEVEL_FATAL }
func (li LogLevelT) String() string {
	return string(li)
}

func (li LogLevelT) No() int {
	for i, v := range []LogLevelT{
		LOGLEVEL_TRACE,
		LOGLEVEL_DEBUG,
		LOGLEVEL_LOG,
		LOGLEVEL_WARN,
		LOGLEVEL_ERROR,
		LOGLEVEL_FATAL,
	} {
		if v == li {
			return i
		}
	}
	panic(fmt.Errorf("invlaid code: %s", li))
}

const (
	LogItemKeyMessage string = "message"
	LogItemKeyParent  string = "parent"
	LogItemKeyAfter   string = "after"
)

func (li *LogItem) Now() *LogItem {
	li.Lock()
	defer li.Unlock()
	if li.M == nil {
		li.M = map[string]string{}
	}
	li.T = time.Now()
	return li
}

func (li *LogItem) SetAfter(after string, v ...any) *LogItem {
	li.Lock()
	defer li.Unlock()
	if li.M == nil {
		li.M = map[string]string{}
	}
	f := fmt.Sprintf(after, v...)
	li.M[LogItemKeyAfter] = f
	return li
}

func (li *LogItem) SetMessage(v ...any) *LogItem {
	li.Lock()
	defer li.Unlock()
	if li.M == nil {
		li.M = map[string]string{}
	}
	f := fmt.Sprint(v...)
	li.M[LogItemKeyMessage] = f
	return li
}

func (li *LogItem) AppendParent(err ...error) *LogItem {
	li.Lock()
	defer li.Unlock()
	if li.M == nil {
		li.M = map[string]string{}
	}
	for _, v := range err {
		li.CallStack = append(li.CallStack, v.Error())
	}
	li.M[LogItemKeyParent] = li.CallStack[len(li.CallStack)-1]
	return li
}

func (li *LogItem) SetKey(key, val string) *LogItem {
	li.Lock()
	defer li.Unlock()
	if li.M == nil {
		li.M = map[string]string{}
	}
	li.M[key] = val
	return li
}

func (li *LogItem) SetKeyf(key, format string, v ...any) *LogItem {
	li.Lock()
	defer li.Unlock()
	if li.M == nil {
		li.M = map[string]string{}
	}
	f := fmt.Sprintf(format, v...)
	li.M[key] = f
	return li
}

func (li *LogItem) Read() string {
	li.RLock()
	defer li.RUnlock()
	if li.M == nil {
		li.M = map[string]string{}
	}

	f := fmt.Sprintf("[ %s ] %s:\n", li.LogLevelT, li.T.String())

	if v, k := li.M[LogItemKeyMessage]; k {

		f += "message: " + v + "\n"
	}
	if v, k := li.M[LogItemKeyAfter]; k {

		f += "after: " + v + "\n"
	}
	for k, val := range li.M {
		switch k {
		case LogItemKeyAfter:
		case LogItemKeyParent:
		case LogItemKeyMessage:
		default:
			f += fmt.Sprintf("%s: %s\n", k, val)
		}
	}
	if v, k := li.M[LogItemKeyParent]; k {
		f += "parent: " + v + "\n"
	}
	for _, v := range li.CallStack {
		f += v
	}

	return f
}

func (li *LogItem) MarshalText() (text []byte, err error) {
	text = []byte(li.Read())
	return
}

func (li *LogItem) Error() string {
	if li.Is_error() || li.Is_fatal() || li.Is_warn() {
		return li.Read()
	}
	return ""
}

func (li *LogItem) Is(err error) bool {
	k := err.Error()
	s := li.Error()
	return len(k) > 0 && len(s) > 0 && strings.Contains(s, k)
}

func (li *LogItem) Set_level_debug() *LogItem {
	li.LogLevelT = LOGLEVEL_DEBUG
	return li
}
func (li *LogItem) Set_level_error() *LogItem {
	li.LogLevelT = LOGLEVEL_ERROR
	return li
}
func (li *LogItem) Set_level_fatal() *LogItem {
	li.LogLevelT = LOGLEVEL_FATAL
	return li
}
func (li *LogItem) Set_level_log() *LogItem {
	li.LogLevelT = LOGLEVEL_LOG
	return li
}
func (li *LogItem) Set_level_trace() *LogItem {
	li.LogLevelT = LOGLEVEL_TRACE
	return li
}
func (li *LogItem) Set_level_warn() *LogItem {
	li.LogLevelT = LOGLEVEL_WARN
	return li
}

func (li *LogItem) Log(c chan *LogItem) {

	c <- li
}

func NewLogItem(loc Loc) (li *LogItem) {

	li = &LogItem{
		T: time.Now(),
		M: map[string]string{},
	}
	return
}
