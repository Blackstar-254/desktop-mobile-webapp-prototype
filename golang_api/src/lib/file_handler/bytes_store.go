package filehandler

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"hash"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/logging/log_item/v2"
)

type BytesStore struct {
	h hash.Hash
	bytes.Buffer
}

func (bs *BytesStore) Hash() (hash string, err error) {
	loc := log_item.Loc("func (bs *BytesStore) Hash() (hash string, err error)")
	bs.h.Reset()
	_, err1 := bs.WriteTo(bs.h)
	if err1 != nil {
		err = log_item.NewLogItem(loc).
			Set_level_error().
			SetAfter("_, err = bs.CopyTo(bs.h)").
			SetMessage(err1.Error()).
			AppendParent(err1)
		return
	}
	hash = fmt.Sprintf("%x", bs.h.Sum(nil))

	return
}

func NewBytesStore() (bs *BytesStore) {
	bs = &BytesStore{
		h:      sha256.New(),
		Buffer: bytes.Buffer{},
	}
	bs.Grow(100_000)
	return
}
