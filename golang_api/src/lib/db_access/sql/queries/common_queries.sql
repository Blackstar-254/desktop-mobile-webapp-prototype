-- name: GetAllPatientFiles :many
select * from patients_file
order by patients_file.patient_name;


-- name: GetAllVisitRecords :many
select * from visit_records
join patients_file on patients_file.patients_file_id  = visit_records.patient;

-- name: CreateAppointment :one
INSERT INTO appt_cal(
	appt_cal_updated_at,
	appt_date,
	appt_state
)
VALUES (
    NOW(),
    $1,
    default
)
RETURNING *;

-- name: GetAllAppointmentsWithinRange :many
SELECT * FROM appt_cal
where 
    appt_cal.appt_date >= $1
    and 
    appt_cal.appt_date <= $2
order by appt_cal.appt_date asc;


-- name: GetAllAppointmentsWithinRangeToCSV :many
SELECT appt_cal_id, 
appt_date::date as "day",
appt_date::time as "time", 
patient_uuid, 
appt_state,
patients_file_id,  
patient_name, 
patient_no, 
file_no, 
occupation, 
contact_info, 
next_of_kin, 
date_of_birth
from appt_cal join patients_file on patients_file.uuid = appt_cal.patient_uuid
where 
    appt_cal.appt_date >= $1
    and 
    appt_cal.appt_date <= $2
    and appt_cal.patient_uuid is not null
order by appt_cal.appt_date asc;


    