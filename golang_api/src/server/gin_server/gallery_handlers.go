package gin_server

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"reflect"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/base"
	cms_context "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/context"
	filehandler "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/file_handler"
	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/logging/log_item/v2"
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
	loc := log_item.Locf(`func SaveImagesEngine(ctx cms_context.Context, save_chan chan string) `)
	defer ctx.Finished()
	log.Println("starting save gallery engine")
	if save_chan == nil {
		save_chan = make(chan string, 10)
	}

	tc := time.NewTicker(time.Minute * time.Duration(5))

	for stop, client_id := false, ""; !stop; {
		select {
		case <-tc.C:
			HotCache.GalleryCache.Lock()
			for _, photo_item := range HotCache.GalleryCache.M {
				err1, success := photo_item.UpdateImagesList(ctx)
				if err1 != nil {
					err2 := log_item.NewLogItem(loc).SetAfter(`err1, success := photo_item.UpdateImagesList(ctx)`).Set_level_error().AppendParent(err1)
					log.Println(err2)
				}
				if !success {
					break
				}
			}
			log.Println("UPDATE IMAGESLIST")
			HotCache.GalleryCache.Unlock()
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
	loc := log_item.Locf(`func (jl *JsonLocalStorageStruct[subtype]) Load(file_name: %s, rest ...any) error `, jl.Name)

	data, err1 := os.ReadFile(jl.Name)
	if err1 != nil {
		if errors.Is(err1, os.ErrNotExist) {
			d, err2 := json.MarshalIndent(jl.Data, " ", " ")
			if err2 != nil {
				err := log_item.NewLogItem(loc).
					SetAfter(`d, err2 := json.MarshalIndent(jl.Data, " ", " ")`).
					AppendParent(err2).
					SetMessage(`error marshalling data`).
					Set_level_error()
				log.Println(err.Error())
				return err
			}
			var err3 error
			if reflect.ValueOf(jl.Data).Kind() == reflect.Ptr && reflect.ValueOf(jl.Data).IsNil() {
				err3 = os.WriteFile(jl.Name, []byte("{}"), file_mode)
				if err3 != nil {
					err3 = log_item.NewLogItem(loc).
						SetAfter(`err3 = os.WriteFile(jl.Name: %s, []byte("{}"), file_mode)`, jl.Name).
						AppendParent(err3).
						Set_level_error()

				}
			} else {

				err3 = os.WriteFile(jl.Name, d, file_mode)
				if err3 != nil {
					err3 = log_item.NewLogItem(loc).
						SetAfter(`err3 = os.WriteFile(jl.Name: %s, d, file_mode)`, jl.Name).
						AppendParent(err3).
						Set_level_error()

				}
			}
			if err3 != nil {
				log.Println("error writefile: ", err3.Error())
				return err3
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
	filehandler.FileHash
}

func NewGalleryStorageItem(client_id string) (gc_i *GalleryStorageItem) {
	gc_i = &GalleryStorageItem{
		ClientID:   client_id,
		ImagesList: []*GalleryPhotoItem{},
	}

	return
}

func (gci *GalleryCacheItem) UpdateImagesList(ctx cms_context.Context) (err error, successfully_updated bool) {
	loc := log_item.Locf(`func (gci *GalleryCacheItem) UpdateImagesList(ctx cms_context.Context) (err error)`)
	client_id := gci.Data.ClientID
	log.Println("pinging ", loc)
	dir_entry_list, err1 := os.ReadDir(fmt.Sprintf("public/%s/images", client_id))
	if err1 != nil {
		err = log_item.NewLogItem(loc).
			Set_level_error().SetAfter(`dir_entry_list, err1 := os.ReadDir(fmt.Sprintf("public/%s/images",client_id))`, client_id).
			AppendParent(err1)

		return
	}

	simplemap := map[string]*GalleryPhotoItem{}
	for _, photo_item := range gci.Data.ImagesList {
		simplemap[photo_item.Name] = photo_item
	}
	byte_store := filehandler.NewBytesStore()
dir_list_loop:
	for _, item := range dir_entry_list {
		file_name := item.Name()
		for _, file_type := range []string{".jpg", ".webp", ".png"} {
			if _, ok := simplemap[file_name]; !strings.Contains(file_name, file_type) || ok {
				if ok {
					continue dir_list_loop
				}
				continue
			}

			new_entry := &GalleryPhotoItem{
				Name: file_name,
			}

			var err2, err3, err4 error
			new_entry.FileHash, err2 = filehandler.NewFileHashOpen(fmt.Sprintf("public/%s/images/%s", client_id, file_name))
			if err2 != nil {
				err = log_item.NewLogItem(loc).
					Set_level_error().SetAfter(`new_entry.FileHash, err2 = filehandler.NewFileHashOpen(%s)`, new_entry.Path).
					AppendParent(err2)
				log.Println(err.Error())

				continue dir_list_loop

			}

			simplemap[file_name] = new_entry
			stats, err3 := item.Info()
			if err3 != nil {
				err = log_item.NewLogItem(loc).
					Set_level_error().SetAfter(`stats, err2 :=item.Info() | item: %s`, new_entry.Path).
					AppendParent(err3)
				log.Println(err.Error())

				continue dir_list_loop

			}

			new_entry.Size = stats.Size()
			switch file_type {
			case ".jpg":
				new_entry.Type = ImageTypeJpeg
			case ".webp":
				new_entry.Type = ImageTypeWebp
			case ".png":
				new_entry.Type = ImageTypePng
			}

			new_entry.Hash, err4 = filehandler.HashFile(new_entry.FileBasic, byte_store)
			if err4 != nil {
				err = log_item.NewLogItem(loc).
					Set_level_error().SetAfter(`new_entry.Hash, err4 = filehandler.HashFile(new_entry.FileBasic,byte_store) | item: %s`, new_entry.Path).
					AppendParent(err4)
				log.Println(err.Error())

			}
			continue dir_list_loop
		}
	}

	gci.Data.ImagesList = nil

	for _, photo_item := range simplemap {
		gci.Data.ImagesList = append(gci.Data.ImagesList, photo_item)
	}

	successfully_updated = true
	return
}
