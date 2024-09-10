package filehandler

import (
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"regexp"
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

type CSV struct {
	file_path string
	file_name string
	f         *os.File

	HeaderRow []string   `json:"header_row"`
	DataRows  [][]string `json:"data_row"`
}

func ReadCsv(file_name string) (csv *CSV, err error) {
	loc := fmt.Sprintf(`func ReadCsv(file_name: %s (csv *CSV, err error)`, file_name)

	csv = &CSV{
		file_path: "./input/" + file_name + ".csv",
		file_name: file_name,
	}

	csv.f, err = os.OpenFile(csv.file_path, os.O_RDONLY, fs.FileMode(S_IRWXU|S_IRWXG))
	if err != nil {
		err = fmt.Errorf("%s\n%s", loc, err.Error())
		return
	}

	data, err := io.ReadAll(csv.f)
	if err != nil {
		err = fmt.Errorf("%s\n%s", loc, err.Error())
		return
	}

	rows := strings.Split(string(data), "\n")
	for i, raw_row := range rows {
		row := get_row(raw_row)
		if i == 0 {
			csv.HeaderRow = row
			continue
		}
		csv.DataRows = append(csv.DataRows, row)
	}
	log.Println(rows[:10])
	for _, col := range get_row(rows[0]) {
		log.Println(col)
	}

	log.Println(csv.ToCSV())
	return

}

func get_row(str string) (row []string) {
	curr := ""
	skip := false
	row = []string{}

	for _, char := range str {
		switch char {
		case '"':
			skip = !skip

		case ',':
			if skip {
				break
			}
			curr = strings.ReplaceAll(curr, "\"", "")
			curr = strings.TrimSpace(curr)
			row = append(row, curr)
			curr = ""
			continue
		}
		curr += string(char)
	}

	return
}

func (csv *CSV) WriteFile() (err error) {

	a, err := json.MarshalIndent(csv, "", "\t")
	if err != nil {
		return
	}
	file_name := strings.ReplaceAll(strings.ToLower(csv.file_name), " ", "-")
	err = os.WriteFile(fmt.Sprintf("./tmp/%s.json", file_name), a, fs.FileMode(S_IRWXO|S_IRWXG|S_IRWXU))

	return
}

func (csv *CSV) Len() int {
	return len(csv.DataRows)
}
func (csv *CSV) GetRow(row int) map[string]string {
	if row >= csv.Len() {
		return nil
	}
	m := map[string]string{}
	for i, key := range csv.HeaderRow {
		m[key] = csv.DataRows[row][i]
	}

	return m
}

func is_number(col string) bool {
	if m, err := regexp.Match("[a-zA-Z :\\-\\(\\)]+", []byte(col)); m || err != nil {
		if err != nil {
			log.Fatalln(err.Error())
		}
		return false
	}
	col = strings.ReplaceAll(col, ",", "")
	if m, err := regexp.Match("[0-9,\\.]+", []byte(col)); m || err != nil {
		if err != nil {
			log.Fatalln(err.Error())
		}
		return true
	}
	return false
}

func (csv *CSV) to_string_row(ind int) string {
	if ind >= len(csv.DataRows) {
		panic("invalid memory access")
	}
	a := csv.DataRows[ind]
	return to_string_row(a)
}

func to_string_row(b []string) string {
	// log.Println("---------------------------------------")
	res := []string{}

	for _, col_d := range b {
		// log.Println(col_d)
		if is_number(col_d) {
			col_d = strings.ReplaceAll(col_d, ",", "")
			res = append(res, col_d)
			continue
		}
		if len(col_d) < 1 {
			res = append(res, "")
			continue
		}
		res = append(res, fmt.Sprintf("\"%s\"", col_d))
	}

	return strings.Join(res, ",")
}

func ToCSV(col_row []string, data [][]string) string {
	rows := []string{to_string_row(col_row)}

	for _, row := range data {

		tmp_row := to_string_row(row)
		// log.Println("\nrow: ", row, "\ntmp_row: ", tmp_row)
		// os.Exit(-1)

		rows = append(rows, tmp_row)
	}

	return strings.Join(rows, "\n")
}

func (csv *CSV) ToCSV() string {
	return ToCSV(csv.HeaderRow, csv.DataRows)
}
