CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INTEGER
);

-- REGISTER A USER AFTER CREATING THIS TABLE BEFORE MAKING THE REST OF THE TABLES

CREATE TABLE "services" (
	id serial primary key,
	description varchar(2000)
);

INSERT INTO "services" ("description")
VALUES ('Essential Cleaning'),('Ultimate Cleaning'), ('Moving In'), ('Moving Out'), ('Organize'), ('Declutter');

CREATE TABLE "completion" (
	id serial primary key,
	description varchar(2000)
);

INSERT INTO "completion" ("description")
VALUES ('Pending'), ('Bid Offered'), ('Bid Rejected'), ('In Progress'), ('Complete');

CREATE TABLE "priority" (
	id serial primary key,
	description varchar(2000)
);

INSERT INTO "priority" ("description")
VALUES ('High'), ('Medium'), ('Low');

CREATE TABLE "user_inquiries" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES users,
	"date_received" DATE,
	"date_requested" DATE,
	"firstName" varchar(100),
	"lastName" varchar(250),
	"street1" varchar(1000),
	"street2" varchar(1000),
	"city" varchar(1000),
	"state" varchar(2),
	"zip" varchar(5),
	"phone_number" varchar(11),
	"email" varchar(50),
	"priority" INT REFERENCES priority DEFAULT 3,
	"completion_status" INT REFERENCES completion DEFAULT 1,
	"comments" VARCHAR(10000)
);

CREATE TABLE "customer" (
	"id" serial primary key,
	"user_id" integer REFERENCES users,
	"inquiries" integer REFERENCES user_inquiries ON DELETE CASCADE,
	"service_on" date,
	"notes" VARCHAR(40000)
);

CREATE TABLE "user_media" (
	id serial primary key,
	inquiry_id INT references user_inquiries ON DELETE CASCADE,
	url varchar(10000)
);

 CREATE TABLE "moving_questions" (
	id serial primary key,
	inquiry_id INT references user_inquiries ON DELETE CASCADE,
	"moving" BOOLEAN default false,
	"moving_to" VARCHAR (10000),
	"moving_from" VARCHAR (10000),
	"large_items" VARCHAR (10000)
);

CREATE TABLE "cleaning_questions" (
    id serial primary key,
    inquiry_id INT references user_inquiries ON DELETE CASCADE,
    "Cleaning" BOOLEAN default false,
    "ServiceType" VARCHAR(100),
    "Bedrooms" INT,
    "Bathrooms" INT,
    "AdditionalRooms" INT,
    "Doors" INT,
	"Windows" INT,
    "HasPets" varchar(500),
    "HazardousConditions" VARCHAR(10000)
);

CREATE TABLE "organizing_questions" (
	id serial primary key,
	inquiry_id INT references user_inquiries ON DELETE CASCADE,
	"Organizing" BOOLEAN default false,
	"Bedrooms" INT,
	"Bathrooms" INT,
	"AdditionalRooms" INT
);

CREATE TABLE "decluttering_questions" (
	id serial primary key,
	inquiry_id INT references user_inquiries ON DELETE CASCADE,
	"Declutter" BOOLEAN default false,
	"Bedrooms" INT,
	"Bathrooms" INT,
	"AdditionalRooms" INT,
	"Donation" BOOLEAN default false
);