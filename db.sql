create EXTENSION IF NOT EXISTS "uuid-ossp";

create table company (
  id uuid primary key default uuid_generate_v4 (),
  company_registration_no varchar(255),
  tin varchar(100),
  issuing_country varchar(50),
  type varchar(30),
  company_name text,
  country varchar(50),
  address text,
  phone varchar(15),
  email text UNIQUE,
  director_contact text,
  manager_contact text,
  manager2_contact text,
  password text,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create table staff(
  id uuid primary key default uuid_generate_v4 (),
  first_name varchar(255),
  last_name varchar (255),
  other_names text,
  nationality varchar(50),
  dob date,
  sex varchar(7),
  permit_no varchar(25),
  permit_issuer varchar(255),
  designation varchar(30),
  passport_no varchar(30),
  national_id_no varchar(50),
  phone_concat_1 varchar (15),
  phone_concat_2 varchar (15),
  residence_country varchar(50),
  residence_area text,
  residence_city text,
  nok_name varchar(50),
  nok_residence text,
  nok_phone varchar (15),
  nok_relationship varchar(100),
  nok2_name varchar(50),
  nok2_residence text,
  nok2_phone varchar (15),
  nok2_relationship varchar(100),
  photo bytea,
  role varchar(25),
  company_id uuid references company(id),
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create table vehicle(
  id uuid primary key default uuid_generate_v4 (),
  head_registration_no varchar(15),
  country varchar(30),
  model varchar (255),
  manufacture_year integer,
  principle_driver uuid references staff(id),
  optional_driver uuid references staff(id),
  company uuid references company(id),
  configuration varchar(30),
  trailer_no varchar(15),
  trailer2_no varchar(15),
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create table application(
  id uuid primary key default uuid_generate_v4 (),
  application_date timestamp,
  company uuid references company(id),
  driver uuid references staff(id),
  assistant_driver uuid references staff(id),
  loaded boolean,
  type_of_Goods varchar(50),
  cargo_nature varchar (50),
  client_details text,
  expected_departure_date timestamp,
  expected_date_of_arrival date,
  departure_country varchar(50),
  departure_city varchar(50),
  destination_country varchar(50),
  last_visited_countries text,
  vehicle uuid references vehicle(id),
  trailer_no varchar(15),
  trailer2_no varchar(15),
  approval_termination_country varchar(50),
  approval_termination_city varchar(50),
  approval_distance numeric,
  jmp_expiry_date timestamp,
  supervisor uuid references staff(id),
  uganda_physical_address text,
  days_in_uganda integer,
  application_status varchar(15),
  assigned_moh_id text,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create function login(mail text) returns company as $$
select
  *
from
  company
where
  email = mail
limit
  1 $$ language sql stable;