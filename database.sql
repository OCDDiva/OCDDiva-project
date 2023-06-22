
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INTEGER
);

CREATE TABLE "user_inquiries" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES users,
	"services_id" INT REFERENCES services,
	"date_received" DATE NOT NULL,
	"date_requested" DATE NOT NULL,
	"moving" INT REFERENCES moving_questions,
	"cleaning" INT REFERENCES cleaning_questions,
	"organizing" INT REFERENCES organizing_questions,
	"declutting" INT REFERENCES decluttering_questions,
	"comments" VARCHAR(10000)
);

CREATE TABLE "customer" (
	id serial primary key,
	user_id integer REFERENCES users,
	inquiries integer REFERENCES user_inquiries,
	services_id integer REFERENCES services,
	address varchar(1000),
	phone_number integer,
	email varchar(50),
	residence varchar(240),
	bathroom integer,
	bedroom integer,
	notes INT REFERENCES notes,
	completion_status INT REFERENCES completion,
	priority INT REFERENCES priority,
	user_media INT REFERENCES user_media,
	service_on date 
);

CREATE TABLE "notes" (
	id serial primary key,
	user_id integer REFERENCES users,
	notes varchar(30000)
);

CREATE TABLE "services" (
	id serial primary key,
	description varchar(2000)
);

CREATE TABLE "completion" (
	id serial primary key,
	description varchar(2000)
);

CREATE TABLE "priority" (
	id serial primary key,
	description varchar(2000)
);

CREATE TABLE "user_media" (
	id serial primary key,
	blob_data BYTEA,
	user_id int references users
);

CREATE TABLE "moving_questions" (
	id serial primary key, 
	question1 VARCHAR (10000),
	question2 VARCHAR (10000),
	question3 VARCHAR (10000),
	question4 VARCHAR (10000),
	question5 VARCHAR (10000)
);

CREATE TABLE "cleaning_questions" (
	id serial primary key,
	question1 VARCHAR (10000),
	question2 VARCHAR (10000),
	question3 VARCHAR (10000),
	question4 VARCHAR (10000),
	question5 VARCHAR (10000),
	question6 VARCHAR (10000)
);

CREATE TABLE "organizing_questions" (
	id serial primary key,
	question1 VARCHAR (10000),
	question2 VARCHAR (10000),
	question3 VARCHAR (10000),
	question4 VARCHAR (10000),
	question5 VARCHAR (10000)
);

CREATE TABLE "decluttering_questions" (
	id serial primary key,
	question1 VARCHAR (10000),
	question2 VARCHAR (10000),
	question3 VARCHAR (10000),
	question4 VARCHAR (10000),
	question5 VARCHAR (10000)
);