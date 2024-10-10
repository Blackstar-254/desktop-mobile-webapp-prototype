package gin_server

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"reflect"
	"sync"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/base"
	cms_context "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/context"
)

const file_mode = os.FileMode(base.S_IRWXU | base.S_IRWXO | base.S_IRWXG)

func ApiGalleryRouterGroup(ctx cms_context.Context, err_c chan error, api_g *gin.RouterGroup) {

	var save_chan chan string
	go SaveImagesEngine(ctx.Add(), save_chan)
	api_g.GET("/", func(gtx *gin.Context) {
		client_id := gtx.GetHeader("client-id")
		gallery_json, err1 := GalleryJson(client_id)
		if err1 != nil {
			gtx.JSON(500, gin.H{
				response_success: false,
			})
			return
		}

		TestJson(gallery_json)
		gtx.JSON(200, gin.H{
			response_success: true,
			response_data:    *gallery_json,
		})
	})

	api_g.POST("/:image-id", func(gtx *gin.Context) {
		client_id := gtx.GetHeader("client-id")
		gallery_json, err1 := GalleryJson(client_id)
		if err1 != nil {
			log.Println("error: ", err1.Error())
			gtx.JSON(500, gin.H{
				response_success: false,
			})
			return
		}

		TestJson(gallery_json)

		req_t := map[string]any{}
		err2 := gtx.BindJSON(&req_t)
		if err2 != nil {
			log.Println("error: ", err2.Error())
			gtx.JSON(401, gin.H{
				response_success: false,
			})
			return
		}
		gtx.JSON(400, gin.H{
			response_success: false,
		})
	})
}

func SaveImagesEngine(ctx cms_context.Context, save_chan chan string) {
	defer ctx.Finished()
	log.Println("starting save gallery engine")
	if save_chan == nil {
		save_chan = make(chan string, 10)
	}

	tc := time.NewTicker(time.Minute * time.Duration(5))

	for stop, client_id := false, ""; !stop; {
		select {
		case <-tc.C:
		case <-ctx.Done():
			stop = true
		case client_id = <-save_chan:
			if len(client_id) < 5 {
				continue
			}
			cache_item, exists := HotCache.GalleryCache.Get(client_id)
			if exists {
				cache_item.Save()
			} else {
				log.Println("client-id: ", client_id, " doesn't exist")
			}

			continue
		}

		for _, key := range HotCache.GalleryCache.Keys() {

			cache_item, _ := HotCache.GalleryCache.Get(key)

			err := cache_item.Save()
			if err != nil {
				log.Println("error saving: ", err)
			}

		}
	}
	return
}

type JsonLocalStorageStruct[subtype any] struct {
	Name string
	Data subtype

	LastLoad time.Time
	s        sync.RWMutex
}

func (jl *JsonLocalStorageStruct[subtype]) Save() error {
	jl.s.Lock()
	defer jl.s.Unlock()
	data, err1 := json.MarshalIndent(jl.Data, " ", " ")
	if err1 != nil {
		return err1
	}

	err2 := os.WriteFile(jl.Name, data, file_mode)
	if err2 != nil {
		return err2
	}

	return nil

}

func (jl *JsonLocalStorageStruct[subtype]) Load(file_name string, rest ...any) error {
	jl.Name = fmt.Sprintf(file_name, rest...)

	data, err1 := os.ReadFile(jl.Name)
	if err1 != nil {
		if errors.Is(err1, os.ErrNotExist) {
			d, err2 := json.MarshalIndent(jl.Data, " ", " ")
			if err2 != nil {
				log.Println("error marshall: ", err2.Error())
				return err2
			}
			var err3 error
			if reflect.ValueOf(jl.Data).Kind() == reflect.Ptr && reflect.ValueOf(jl.Data).IsNil() {
				err3 = os.WriteFile(jl.Name, []byte("{}"), file_mode)
			} else {

				err3 = os.WriteFile(jl.Name, d, file_mode)
			}
			if err3 != nil {
				log.Println("error writefile: ", err3.Error())
			}

			return jl.Load(file_name, rest...)
		}
		log.Println("error: ", err1.Error())
		return err1
	}

	jl.s.Lock()
	err2 := json.Unmarshal(data, jl.Data)
	jl.s.Unlock()
	if err2 != nil {
		log.Println("error: ", err2.Error())
		return err2
	}

	err3 := jl.Save()
	if err3 != nil {
		log.Println("error: ", err3.Error())
		return err3
	}
	jl.LastLoad = time.Now()

	return nil

}

func GalleryJson(client_id string) (d *GalleryCacheItem, err error) {

	var ok bool
	if d, ok = HotCache.GalleryCache.Get(client_id); ok {
		if time.Since(d.LastLoad) < time.Duration(5)*time.Minute {

			return
		} else {
			err = d.Load(d.Name)
			if err != nil {
				return
			}

			return
		}
	}

	g_s := &JsonLocalStorageStruct[*GalleryStorageItem]{
		Data: NewGalleryStorageItem(client_id),
	}
	err = g_s.Load("./public/%s/images/images.json", client_id)
	if err != nil {

		return
	}

	d = &GalleryCacheItem{
		JsonLocalStorageStruct: g_s,
	}
	HotCache.GalleryCache.Set(client_id, d)
	return
}

type GalleryCacheItem struct {
	*JsonLocalStorageStruct[*GalleryStorageItem]
}

type GalleryStorageItem struct {
	ClientID   string              `json:"client-id"`
	ImagesList []*GalleryPhotoItem `json:"images-list"`
	RestAnyMap
}

type ImageType string

const (
	ImageTypeWebp ImageType = "webp"
	ImageTypeJpeg ImageType = "jpg"
	ImageTypePng  ImageType = "png"
	ImageTypeMp4  ImageType = "mp4"
)

type GalleryPhotoItem struct {
	Name     string    `json:"name"`
	UUID     string    `json:"uuid"`
	Type     ImageType `json:"type"`
	Keywords []string  `json:"keywords"`
	Location string    `json:"location"`
	Size     string    `json:"size"`
	Hash     string    `json:"hash"`
	F        *os.File
}

func NewGalleryStorageItem(client_id string) (gc_i *GalleryStorageItem) {
	gc_i = &GalleryStorageItem{
		ClientID:   client_id,
		ImagesList: []*GalleryPhotoItem{},
	}

	return
}
