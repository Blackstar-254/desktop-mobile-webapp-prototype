package logging

import (
	"io"
	"io/fs"
	"log"
	"os"
	"sync"
	"syscall"
	"time"

	"shiloheye.com/hmis/lib/base"
	"shiloheye.com/hmis/lib/logging/log_item/v2"
)

type LogFileWriter struct {
	P        string
	opened_t time.Time
	queue    []*log_item.LogItem
	sync.RWMutex
	*os.File
}

func (lf *LogFileWriter) Open(v ...string) (err error) {
	p := lf.P
	if len(v) > 0 {
		p = v[0]
		lf.P = p
	}

	new_file := log_dir + string(os.PathSeparator) + p + ".log"

	dir_p := base.GetFileDir(new_file)
	os.MkdirAll(dir_p, base.FS_MODE)

	log.Println("opening file:", new_file)
	lf.File, err = os.OpenFile(new_file, os.O_CREATE|os.O_APPEND|os.O_RDWR, base.FS_MODE)

	if err != nil {
		log.Println(err.Error())
	}
	lf.opened_t = time.Now()
	if lf.queue == nil {
		lf.queue = []*log_item.LogItem{}
	}
	return
}
func (lf *LogFileWriter) append_queue(log ...*log_item.LogItem) {
	lf.queue = append(lf.queue, log...)
}
func (lf *LogFileWriter) write_queue() (int, error) {
	if lf != nil {
	} else {
		panic("invlaid logfilewriter")
	}

	if lf.queue != nil {

	} else {
		lf.queue = []*log_item.LogItem{}
	}
	str := ""
	for _, k := range lf.queue {
		str += k.Read()
	}

	return lf.WriteString(str)

}
func (lf *LogFileWriter) clear_queue() (n int) {

	n = len(lf.queue)

	clear(lf.queue)
	return

}

func (lf *LogFileWriter) Chdir() error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Chdir()
}
func (lf *LogFileWriter) Chmod(mode fs.FileMode) error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Chmod(mode)
}
func (lf *LogFileWriter) Chown(uid int, gid int) error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Chown(uid, gid)
}
func (lf *LogFileWriter) Close() error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Close()
}
func (lf *LogFileWriter) Fd() uintptr {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Fd()
}
func (lf *LogFileWriter) Name() string {
	lf.RLock()
	defer lf.RUnlock()
	return lf.File.Name()
}
func (lf *LogFileWriter) Read(b []byte) (n int, err error) {
	lf.RLock()
	defer lf.RUnlock()
	return lf.File.Read(b)
}
func (lf *LogFileWriter) ReadAt(b []byte, off int64) (n int, err error) {
	lf.RLock()
	defer lf.RUnlock()
	return lf.File.ReadAt(b, off)
}
func (lf *LogFileWriter) ReadDir(n int) ([]fs.DirEntry, error) {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.ReadDir(n)
}
func (lf *LogFileWriter) ReadFrom(r io.Reader) (n int64, err error) {
	lf.RLock()
	defer lf.RUnlock()
	return lf.File.ReadFrom(r)
}
func (lf *LogFileWriter) Readdir(n int) ([]fs.FileInfo, error) {
	lf.RLock()
	defer lf.RUnlock()
	return lf.File.Readdir(n)
}
func (lf *LogFileWriter) Readdirnames(n int) (names []string, err error) {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Readdirnames(n)
}
func (lf *LogFileWriter) Seek(offset int64, whence int) (ret int64, err error) {
	lf.RLock()
	defer lf.RUnlock()
	return lf.File.Seek(offset, whence)
}
func (lf *LogFileWriter) SetDeadline(t time.Time) error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.SetDeadline(t)
}
func (lf *LogFileWriter) SetReadDeadline(t time.Time) error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.SetReadDeadline(t)
}
func (lf *LogFileWriter) SetWriteDeadline(t time.Time) error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.SetWriteDeadline(t)
}
func (lf *LogFileWriter) Stat() (fs.FileInfo, error) {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Stat()
}
func (lf *LogFileWriter) Sync() error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Sync()
}
func (lf *LogFileWriter) SyscallConn() (syscall.RawConn, error) {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.SyscallConn()
}
func (lf *LogFileWriter) Truncate(size int64) error {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Truncate(size)
}
func (lf *LogFileWriter) Write(b []byte) (n int, err error) {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.Write(b)
}
func (lf *LogFileWriter) WriteAt(b []byte, off int64) (n int, err error) {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.WriteAt(b, off)
}
func (lf *LogFileWriter) WriteString(s string) (n int, err error) {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.WriteString(s)
}
func (lf *LogFileWriter) WriteTo(w io.Writer) (n int64, err error) {
	lf.Lock()
	defer lf.Unlock()
	return lf.File.WriteTo(w)
}
