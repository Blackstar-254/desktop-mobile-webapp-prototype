package filehandler

import (
	"fmt"

	"shiloheye.com/hmis/lib/logging/log_item/v2"
)

type FileHash struct {
	*FileBasic
	Hash     string         `json:"hash"`
	ModTime  string         `json:"last_mod_time"`
	MetaData map[string]any `json:"meta_data"`
}

func HashFile(Fo *FileBasic, bs *BytesStore) (hash string, err error) {
	loc := log_item.Loc(" NewFileHash(Fo *FileBasic, bs *BytesStore)(hash string, err error)")
	if Fo == nil || Fo.File == nil {

		err = log_item.NewLogItem(loc).SetMessage("FileBasic or os.File pointer is nil").Set_level_error()
		return
	}
	if bs == nil || bs.h == nil {

		err = log_item.NewLogItem(loc).SetMessage("ByteStore pointer provided is invalid").Set_level_error()
		return
	}

	var err1, err2 error
	bs.Reset()

	_, err1 = bs.ReadFrom(Fo.File)
	if err1 != nil {

		err = log_item.NewLogItem(loc).SetAfter(`_, err1 = bs.ReadFrom(Fo.File)`).SetMessage(err1.Error()).Set_level_error().AppendParent(err1)
		return
	}

	hash, err2 = bs.Hash()
	if err2 != nil {
		err = log_item.NewLogItem(loc).SetAfter(`hash, err2 = bs.Hash()`).SetMessage(err2.Error()).Set_level_error().AppendParent(err2)
		return
	}
	return
}

func NewFileHashOpen(file_path string) (Fh *FileHash, err error) {
	loc := log_item.Loc("NewFileHashOpen(file_path string) (Fh *FileHash, err error)")
	Fh = &FileHash{}
	var err1 error
	Fh.FileBasic, err1 = Open(file_path)
	if err1 != nil {
		err = log_item.NewLogItem(loc).SetAfter(`Fh.FileBasic, err1 = Open("%s")`, file_path).SetMessage(err1.Error()).Set_level_error().AppendParent(err1)
		return
	}

	Fh.ModTime = fmt.Sprint(Fh.fs.ModTime())

	return
}

func NewFileHashCreate(file_path string) (Fh *FileHash, err error) {
	loc := log_item.Loc("NewFileHashOpen(file_path string) (Fh *FileHash, err error)")
	Fh = &FileHash{}
	var err1 error
	Fh.FileBasic, err1 = Create(file_path)
	if err1 != nil {

		err = log_item.NewLogItem(loc).SetAfter(`Fh.FileBasic, err1 = Create("%s")`, file_path).SetMessage(err1.Error()).Set_level_error().AppendParent(err1)
		return
	}

	return
}

func (fh *FileHash) Get(key string) (it any, ok bool) {
	it, ok = fh.MetaData[key]
	return
}

func (fh *FileHash) Set(key string, val any) {

	fh.MetaData[key] = val
}

func GetFileHash[T any](fh *FileHash, key string) (it T, ok bool) {

	a, ok_ := fh.Get(key)
	if !ok_ {
		return
	}

	it, ok = a.(T)
	return
}
