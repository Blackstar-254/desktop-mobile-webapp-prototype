-- truncate tables
TRUNCATE TABLE public.diagnoses_table  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.doctor_register  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.hospital_stations  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.patient_data  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.payment_methods  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.prescription  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.price_list_history  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.sales_register  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.services_pricelist  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.staff_register  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.transactions_register  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.usage_instructions  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.user_data  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.user_roles  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.visit_notes  RESTART IDENTITY CASCADE;
TRUNCATE TABLE  public.visit_records RESTART IDENTITY CASCADE;



-- drop tables
DROP TABLE public.appointment_diary ,
 public.diagnoses_table ,
 public.doctor_register ,
 public.edit_history ,
 public.hospital_stations ,
 public.patient_data ,
 public.payment_methods ,
 public.prescription ,
 public.price_list_history ,
 public.resource_table ,
 public.sales_register ,
 public.services_pricelist ,
 public.staff_register ,
 public.tables_list ,
 public.transactions_register ,
 public.usage_instructions ,
 public.user_data ,
 public.user_roles ,
 public.visit_notes ,
 public.visit_records CASCADE;
drop type sex_t,
    insurance_state_t,
    visit_type_t,
    discharge_type_t,
    exit_comment_t,
    crude_t CASCADE;