CREATE TABLE IF NOT EXISTS user_roles(
    id serial primary key,
    roles text unique not null,
    description text,
    priority integer,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS hospital_stations(
    id serial primary key,
    station text unique not null,
    description text,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TYPE sex_t as enum('male', 'female');

CREATE TABLE IF NOT EXISTS user_data(
    id serial primary key,
    first_name text not null,
    middle_name text not null,
    sur_name text not null,
    patient_sex sex_t not null,
    date_of_birth date,
    occupation text,
    employer text,
    employer_address text,
    user_role integer references user_roles(id) not null,
    bio text,
    phone_no_01 text,
    phone_no_02 text,
    email_01 text,
    email_02 text,
    next_of_kin_01 integer references user_data(id),
    next_of_kin_02 integer references user_data(id),
    deleted_by integer references user_data(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS staff_register(
    id serial primary key,
    user_id integer references user_data(id) not null,
    qualification text not null,
    specialty text [] not null,
    station integer references hospital_stations(id),
    file_no text unique,
    deleted_by integer references staff_register(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS patient_data(
    id serial primary key,
    user_id integer references user_data(id) not null,
    patient_number text unique,
    file_no text unique,
    deleted_by integer references staff_register(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE UNIQUE INDEX unique_user_name ON user_data(first_name, middle_name, sur_name);

CREATE INDEX contact_info_idx ON user_data(
    phone_no_01,
    phone_no_02,
    email_01,
    email_02
);

CREATE INDEX patient_info_idx ON patient_data(patient_number, file_no);

CREATE TABLE IF NOT EXISTS payment_methods(
    id serial primary key,
    name text unique not null,
    description text,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS doctor_register(
    id serial primary key,
    staff_id integer unique references staff_register(id) not null,
    deleted_by integer references staff_register(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TYPE visit_type_t as enum(
    'outpatient-consultation',
    'outpatient-diagnostic',
    'inpatient-la',
    'inpatient-ga',
    'emergency',
    'post-op'
);

CREATE TYPE discharge_type_t as enum(
    'referral',
    'emergency',
    'deceased',
    'good_condition'
);

CREATE TYPE exit_comment_t as enum('deferred', 'served', 'awol');

CREATE TABLE IF NOT EXISTS visit_records(
    id serial primary key,
    patient integer references patient_data(id) not null,
    payment_method integer references payment_methods(id) not null,
    receiving_staff integer references staff_register(id) not null,
    visit_type visit_type_t not null,
    exit_comment exit_comment_t,
    exit_time timestamptz,
    discharge_time timestamptz,
    admission_time timestamptz,
    invoice_no text unique not null,
    -- always generate invoice no.deleted_by integer references staff_register(id),
    deleted_at timestamptz,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);



CREATE TABLE IF NOT EXISTS price_list_history(
    id serial primary key,
    service_name text not null,
    description text,
    payment_method integer references payment_methods(id) not null,
    units text not null,
    price integer not null,
    deleted_by integer references staff_register(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS services_pricelist(
    id serial primary key,
    service_name text not null,
    description text,
    payment_method integer references payment_methods(id) not null,
    units text not null,
    price integer not null,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE UNIQUE INDEX services_pricelist_idx ON services_pricelist(service_name, payment_method);

CREATE TABLE IF NOT EXISTS diagnoses_table(
    id serial primary key,
    common_complaints text,
    diagnosis text unique not null,
    deleted_by integer references staff_register(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS visit_notes(
    id serial primary key,
    visit_id integer references visit_records(id) not null,
    patients_id integer references patient_data(id) not null,
    patients_complaints text,
    doctors_notes text,
    diagnosis_id integer references diagnoses_table(id) not null,
    diagnosis text,
    resolution text,
    staff integer references staff_register(id),
    station integer references hospital_stations(id),
    deleted_by integer references staff_register(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE INDEX notes_idx ON visit_notes(
    patients_complaints,
    doctors_notes,
    diagnosis_id,
    diagnosis,
    resolution
);

CREATE TABLE IF NOT EXISTS usage_instructions(
    id serial primary key,
    instructions text unique not null,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS prescription(
    id serial primary key,
    visit_id integer references visit_records(id) not null,
    service_id integer references services_pricelist(id) not null,
    usage_id integer references usage_instructions(id) not null,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TYPE insurance_state_t as enum(
    'n/a',
    'requested',
    'approved',
    'preauthed',
    'declined',
    'copay'
);

CREATE TABLE IF NOT EXISTS sales_register(
    id serial primary key,
    visit_id integer references visit_records(id) not null,
    service_id integer references services_pricelist(id) not null,
    amount integer not null CHECK (amount > -1),
    insurance_state insurance_state_t not null,
    paid integer CHECK (paid > -1),
    copay integer default 0,
    served boolean default false,
    billed_by integer references staff_register(id),
    served_by integer references staff_register(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS transactions_register(
    id serial primary key,
    user_id integer references user_data(id),
    description text unique not null,
    debit integer default 0,
    credit integer default 0,
    pending integer default 0,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS appointment_diary(
    id serial primary key,
    patient integer references patient_data(id) not null,
    payment_method integer references payment_methods(id),
    visit_type visit_type_t not null,
    paid integer references transactions_register(id),
    appointment_date date not null default NOW()::date,
    appointment_time time not null,
    deleted_by integer references user_data(id),
    deleted_at timestamptz,
    created_by integer references user_data(id),
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS resource_table(
    id serial primary key,
    user_id integer references user_data(id),
    resource_url text unique not null,
    description text,
    meta_data json not null,
    deleted_by integer references user_data(id),
    deleted_at timestamptz,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TYPE crude_t as enum(
    'create',
    'read',
    'update',
    'delete'
);

CREATE TABLE IF NOT EXISTS tables_list(
    id serial primary key,
    table_name text unique not null,
    table_description text,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS edit_history(
    id serial primary key,
    user_id integer references user_data(id),
    db_table integer references tables_list(id) not null,
    crud crude_t not null,
    previous_value text not null,
    last_update timestamptz default now(),
    created_at timestamptz default now()
);