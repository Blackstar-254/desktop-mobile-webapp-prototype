package filehandler

import (
	"errors"
	"fmt"

	"os"

	"shiloheye.com/hmis/lib/logging/log_item/v2"
)

type LockFile struct {
	locked bool
	Name   string
}

func Lock(file_path string) (lf *LockFile, err error) {
	loc := log_item.Locf(`Lock("%s" string) (lf *LockFile, err error)`, file_path)
	err1 := os.MkdirAll(file_path, os.FileMode(os.ModeExclusive))
	if err1 != nil {
		if errors.Is(err1, os.ErrExist) {
			err = err1
			return
		}

		err = log_item.NewLogItem(loc).SetAfter(`err1 := os.MkdirAll("%s", os.FileMode(os.ModeExclusive))`, file_path).SetMessage(err1.Error()).Set_level_error()
		return
	}

	lf = &LockFile{
		Name:   file_path,
		locked: true,
	}

	return
}

func (lf *LockFile) Unlock() error {
	loc := log_item.Loc(`func (lf *LockFile) Unlock() error`)
	err1 := os.Remove(lf.Name)
	if err1 == nil || errors.Is(err1, os.ErrNotExist) {
		lf.locked = false
		return nil
	}

	err2 := log_item.NewLogItem(loc).SetAfter(`err1 := os.Remove("%s")`, lf.Name).SetMessage(err1.Error()).Set_level_error()
	return err2
}

func (lf *LockFile) Lock() (err error) {
	loc := log_item.Locf(`Lock("%s" string) (lf *LockFile, err error)`, lf.Name)
	if lf.locked {
		return fmt.Errorf("already locked")
	}
	err1 := os.MkdirAll(lf.Name, os.FileMode(os.ModeExclusive))
	if err1 != nil {
		if errors.Is(err1, os.ErrExist) {

			err = err1
			return
		}

		err = log_item.NewLogItem(loc).SetAfter(`err1 := os.MkdirAll("%s", os.FileMode(os.ModeExclusive))`, lf.Name).SetMessage(err1.Error()).Set_level_error()
		return
	}

	lf.locked = true

	return
}
