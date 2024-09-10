package calendar

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"shiloheye.com/hmis/lib/base"
	cms_context "shiloheye.com/hmis/lib/context"
	db "shiloheye.com/hmis/lib/db_access"
	db_access "shiloheye.com/hmis/lib/db_access/generated"
	filehandler "shiloheye.com/hmis/lib/file_handler"
	"shiloheye.com/hmis/lib/logging/log_item/v2"
)

var db_pool = db.DBPool
var get_conn = db.DBPool.GetConn
var ret_conn = db.DBPool.Return

var Db = db.DB

var CalendarMap = base.NewMutexedMap[*CalendarT]()

func NewCal(year string, ctx cms_context.Context) (cal *CalendarT) {
	year = year[:4]
	y, err := strconv.Atoi(year)
	if err != nil {
		log.Println(err.Error())
		return
	}
	cal = &CalendarT{Year: y}

	cal.GenerateCalendar(ctx)
	CalendarMap.Set(fmt.Sprintf("%d", year), cal)

	return
}

func InitCalendar(ctx cms_context.Context) {
	year := time.Now().Year()
	cal := &CalendarT{Year: year}

	go cal.GenerateCalendar(ctx)
	CalendarMap.Set(fmt.Sprintf("%d", year), cal)
}

type CalendarT struct {
	Year         int     `json:"year"`
	Appointments []*Date `json:"appointments"`
}

type Date struct {
	*db_access.ApptCal
}

func (d *Date) String() string {

	return fmt.Sprintf("%s %02dth %s %d", d.Weekday(), d.Day(), d.Month(), d.Year())
}

// t1 := time.Date(ApptDate.Time.Year(), ApptDate.Time.Month(), ApptDate.Time.Day(), 0, 0, 0, ApptDate.Time.Nanosecond(), ApptDate.Time.Location())
func (d *Date) SetHour(h int) *Date {

	tmp := time.Date(d.ApptDate.Time.Year(), d.ApptDate.Time.Month(), d.ApptDate.Time.Day(), h, d.ApptDate.Time.Minute(), 0, d.ApptDate.Time.Nanosecond(), d.ApptDate.Time.Location())
	d.ApptDate.Time = tmp

	return d
}

func (d *Date) SetMinute(m int) *Date {

	tmp := time.Date(d.ApptDate.Time.Year(), d.ApptDate.Time.Month(), d.ApptDate.Time.Day(), d.ApptDate.Time.Hour(), m, 0, d.ApptDate.Time.Nanosecond(), d.ApptDate.Time.Location())
	d.ApptDate.Time = tmp

	return d
}

func (d *Date) Time() string { return d.ApptDate.Time.String() }

func (d *Date) Hour() int    { return d.ApptDate.Time.Hour() }
func (d *Date) Minutes() int { return d.ApptDate.Time.Minute() }

func (d *Date) Day() int        { return d.ApptDate.Time.Day() }
func (d *Date) Weekday() string { return d.ApptDate.Time.Weekday().String() }
func (d *Date) Month() string   { return d.ApptDate.Time.Month().String() }
func (d *Date) Year() int       { return d.ApptDate.Time.Year() }

func new_date(i int, year int, h int, m int, t *time.Time) *time.Time {

	new_t := time.Date(year, 1, i+1, h, m, 0, 0, t.Location())
	// log.Println(" ", i, "\n", new_t, "\n", t)
	return &new_t

}

type HMStruct struct {
	H int
	M int
}

func generate_calendar(year int) []*Date {
	log.Println("GenerateCalendar")
	calendar := []*Date{}
	t := time.Now()
	new_date := func(i int) (d_c []*time.Time) {

		for _, hrs := range []int{9, 10, 11, 12, 14, 15, 16} {
			for _, mins := range []int{00, 15, 30, 45} {
				new_t := new_date(i, year, hrs, mins, &t)
				d_c = append(d_c, new_t)

				if false {
					fmt.Println(hrs, "hrs ", mins, "mins", new_t)
				}
			}
		}
		// os.Exit(-1)
		return

	}
	// start :=  time.Date(year, 1,1,0,0,0,0, ApptDate.Time.Location())
	day := 0
	for ; day < 367; day += 1 {

		T := new_date(day)
		if T[0].Year() != year {
			log.Println("breaking here")
			break
		}
		for _, it := range T {
			D := &Date{
				ApptCal: &db_access.ApptCal{
					ApptDate: pgtype.Timestamptz{
						Time:  *it,
						Valid: true,
					},
				},
			}
			// log.Println(D)
			calendar = append(calendar, D)
		}
	}

	return calendar
}

func (cal *CalendarT) GenerateCalendar(ctx cms_context.Context) (err error) {
	loc := log_item.Locf("func (cal *CalendarT) GenerateCalendar(ctx cms_context.Context) (err error)")
	defer ctx.Finished()
	db_conn := get_conn(ctx)
	defer ret_conn(db_conn, ctx)
	t_t := time.Now()
	d_start := new_date(0, cal.Year, 8, 0, &t_t)
	d_end := new_date(366, cal.Year, 18, 0, &t_t)
	appointments, err1 := Db.GetAllAppointmentsWithinRange(ctx, db_conn, &db_access.GetAllAppointmentsWithinRangeParams{
		ApptDate: pgtype.Timestamptz{
			Time:  *d_start,
			Valid: true,
		},
		ApptDate_2: pgtype.Timestamptz{
			Time:  *d_end,
			Valid: true,
		},
	})

	if err1 != nil {
		return log_item.NewLogItem(loc).Set_level_error().AppendParent(err1)
	}
	var date_cache = map[time.Time]struct {
		found bool
		appt  *db_access.ApptCal
	}{}
	var tmp_cal []*Date
	if len(cal.Appointments) < 1 {
		tmp_cal = generate_calendar(cal.Year)
	} else {
		tmp_cal = cal.Appointments
	}

	for i, appt := range appointments {
		if false {
			print_json_line(appt, i, `appointments, err1 := Db.GetAllAppointmentsWithinRange(ctx, db_conn, &db_access.GetAllAppointmentsWithinRangeParams`)
		}
		date_cache[appt.ApptDate.Time] = struct {
			found bool
			appt  *db_access.ApptCal
		}{
			found: true,
			appt:  appt,
		}
	}

	final_list := []*Date{}

	for i, cal_date := range tmp_cal {

		if data, exists := date_cache[cal_date.ApptDate.Time]; exists {
			final_list = append(final_list, &Date{
				ApptCal: data.appt,
			})
			continue
		}
		appt, err2 := Db.CreateAppointment(ctx, db_conn, cal_date.ApptDate)
		if err2 != nil {
			log.Println(`err2 := Db.CreateAppointment(ctx,db_conn,cal_date.ApptDate)`)
			log.Fatalln(err2.Error())
		}
		final_list = append(final_list, &Date{
			ApptCal: appt,
		})

		if false {

			log.Println("appointment created:")
			print_json_line(cal_date, i, `tmp_cal := generate_calendar(cal.Year)`)
		}
	}

	cal.Appointments = final_list

	log.Println("appointments generated for year: ", cal.Year)

	return
}

func print_json_line(item any, i int, after string) {
	fmt.Printf("%03d------------------------------------", i)
	b, err1 := json.MarshalIndent(item, "", "\t")
	if err1 != nil {
		fmt.Println(after)
		log.Println(err1.Error())

	}
	fmt.Println(string(b))
}

type ToCSV_T = filehandler.CSV

func (cal *CalendarT) ToCSV(ctx cms_context.Context) (csv *ToCSV_T, err error) {
	loc := log_item.Locf("func (cal *CalendarT) ToCSV(ctx cms_context.Context) (csv *ToCSV_T, err error) ")
	if len(cal.Appointments) < 1 {
		cal.GenerateCalendar(ctx.Add())
	}
	db_conn := get_conn(ctx)
	defer ret_conn(db_conn, ctx)
	t_t := time.Now()
	d_start := new_date(0, cal.Year, 8, 0, &t_t)
	d_end := new_date(366, cal.Year, 18, 0, &t_t)
	appointments, err1 := Db.GetAllAppointmentsWithinRangeToCSV(ctx, db_conn, &db_access.GetAllAppointmentsWithinRangeToCSVParams{
		ApptDate: pgtype.Timestamptz{
			Time:  *d_start,
			Valid: true,
		},
		ApptDate_2: pgtype.Timestamptz{
			Time:  *d_end,
			Valid: true,
		},
	})

	if err1 != nil {
		err = log_item.NewLogItem(loc).Set_level_error().AppendParent(err1)
		return
	}

	csv = &ToCSV_T{
		HeaderRow: []string{
			"appt_cal_id", "day", "time", "patient_uuid", "appt_state", "patients_file_id", "patient_name", "patient_no", "file_no", "occupation", "contact_info", "next_of_kin", "date_of_birth",
		},
	}

	for _, appt := range appointments {
		csv.DataRows = append(csv.DataRows, DBAppointmentToCSVRow(appt))
	}

	return
}

/*
	type GetAllAppointmentsWithinRangeToCSVRow struct {
		ApptCalID      int32       `json:"appt_cal_id"`
		Day            pgtype.Date `json:"day"`
		Time           pgtype.Time `json:"time"`
		PatientUuid    pgtype.UUID `json:"patient_uuid"`
		ApptState      interface{} `json:"appt_state"`
		PatientsFileID int32       `json:"patients_file_id"`
		PatientName    string      `json:"patient_name"`
		PatientNo      string      `json:"patient_no"`
		FileNo         string      `json:"file_no"`
		Occupation     *string     `json:"occupation"`
		ContactInfo    []byte      `json:"contact_info"`
		NextOfKin      []byte      `json:"next_of_kin"`
		DateOfBirth    pgtype.Date `json:"date_of_birth"`
	}
*/
func DBAppointmentToCSVRow(Appt *db_access.GetAllAppointmentsWithinRangeToCSVRow) []string {
	date := (func() string {
		year, month, day := Appt.Day.Time.Date()

		return fmt.Sprintf("%04d-%02d-%02d", year, month, day)
	})()

	appt_time := (func() string {

		pgt := Appt.Time
		hours := pgt.Microseconds / time.Hour.Microseconds()
		minutes := (pgt.Microseconds % time.Hour.Microseconds()) / time.Minute.Microseconds()
		return fmt.Sprintf("%02d:%02d", hours, minutes)
	})()

	patient_uuid := func() string {
		s, err := Appt.PatientUuid.MarshalJSON()
		if err != nil {
			log.Println("loc: func DBAppointmentToCSVRow(Appt *db_access.GetAllAppointmentsWithinRangeToCSVRow) []string")
			log.Fatalln(err.Error())
		}

		return string(s)
	}()

	occupation := func() string {
		if Appt.Occupation != nil {
			return *Appt.Occupation
		}

		return ""
	}()

	date_of_birth := (func() string {
		year, month, day := Appt.DateOfBirth.Time.Date()

		return fmt.Sprintf("%04d-%02d-%02d", year, month, day)
	})()

	csv_row := []string{
		fmt.Sprintf("%03d", Appt.ApptCalID),
		date,
		appt_time,
		patient_uuid,
		fmt.Sprint(Appt.ApptState),
		fmt.Sprintf("%03d", Appt.PatientsFileID),
		Appt.PatientName,
		Appt.PatientNo,
		Appt.FileNo,
		occupation,
		string(Appt.ContactInfo),
		string(Appt.NextOfKin),
		date_of_birth,
	}

	return csv_row
}
