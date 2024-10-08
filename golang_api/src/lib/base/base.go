package base

import (
	"io/fs"
	"os"
	"strings"
)

type FilePermisson int

const (
	S_IRWXU FilePermisson = 00700 // user (file owner) has read, write and execute permission
	S_IRUSR               = 00400 // user has read permission
	S_IWUSR               = 00200 // user has write permission
	S_IXUSR               = 00100 // user has execute permission
	S_IRWXG               = 00070 // group has read, write and execute permission
	S_IRGRP               = 00040 // group has read permission
	S_IWGRP               = 00020 // group has write permission
	S_IXGRP               = 00010 // group has execute permission
	S_IRWXO               = 00007 // others have read, write and execute permission
	S_IROTH               = 00004 // others have read permission
	S_IWOTH               = 00002 // others have write permission
	S_IXOTH               = 00001 // others have execute permission
)

func OpenFile(name string, flag int) (f *os.File, err error) {

	return os.OpenFile(name, flag, fs.FileMode(S_IRWXU|S_IRWXO))
}

func WriteFile(name string, data []byte) error {
	return os.WriteFile(name, data, fs.FileMode(S_IRWXU|S_IRWXO))
}

const FS_MODE = fs.FileMode(S_IRWXO | S_IRWXU)

func GetFileDir(path string) string {
	ls := []string{}
	ls01 := strings.Split(path, "/")
	for _, v := range ls01 {
		ls = append(ls, strings.Split(v, "\\")...)
	}
	return strings.Join(ls[:len(ls01)-1], string(os.PathSeparator))
}
