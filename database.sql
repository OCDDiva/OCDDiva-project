-- RUN ALL QUERIES IN ORDER, TOP TO BOTTOM

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

CREATE TABLE "dates" (
    id serial primary key,
    date_requested DATE,
    date_submitted DATE,
    service_date DATE
);

INSERT INTO "dates" ("date_requested", "date_submitted", "service_date")
VALUES ('2023-06-26', '2023-06-25', NULL);

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

CREATE TABLE "moving_questions" (
	id serial primary key,
	"Moving" BOOLEAN default false, 
	"Moving To" VARCHAR (10000),
	"Moving From" VARCHAR (10000),
	"Large Items" VARCHAR (10000)
);

INSERT INTO "moving_questions" ("Moving", "Moving To", "Moving From", "Large Items")
VALUES (false, 'movingAnswer1', 'movingAnswer2', 'movingAnswer3');

CREATE TABLE "cleaning_questions" (
	id serial primary key,
	"Cleaning" BOOLEAN default false,
	"EssentialClean" BOOLEAN default false,
	"UltimateClean" BOOLEAN default false,
	"Bedrooms" INT,
	"Bathrooms" INT,
	"AdditionalRooms" INT,
    "DoorsWindows" INT,
    "HasPets" BOOLEAN default false,
    "HazardousConditions" VARCHAR (10000)
);

INSERT INTO "cleaning_questions" ("Cleaning", "EssentialClean", "UltimateClean", "Bedrooms", "Bathrooms", "AdditionalRooms", "DoorsWindows", "HasPets", "HazardousConditions")
VALUES (true, false, true, 3, 2, 1, 0, false, 'test9');

CREATE TABLE "organizing_questions" (
	id serial primary key,
	"Organizing" BOOLEAN default false,
	"Bedrooms" INT,
	"Bathrooms" INT,
	"AdditionalRooms" INT,
	"Donation" BOOLEAN default false
);

INSERT INTO "organizing_questions" ("Organizing", "Bedrooms", "Bathrooms", "AdditionalRooms", "Donation")
VALUES (true, 3, 2, 1, true);

CREATE TABLE "decluttering_questions" (
	id serial primary key,
	"Declutter" BOOLEAN default false,
	"Bedrooms" INT,
	"Bathrooms" INT,
	"AdditionalRooms" INT,
	"Donation" BOOLEAN default false
);

INSERT INTO "decluttering_questions" ("Declutter", "Bedrooms", "Bathrooms", "AdditionalRooms", "Donation")
VALUES (true, 3, 2, 1, true);

CREATE TABLE "user_inquiries" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES users,
	"services_id" INT REFERENCES services,
	"date_received" INT REFERENCES dates,
	"date_requested" INT REFERENCES dates,
	"moving" INT REFERENCES moving_questions,
	"cleaning" INT REFERENCES cleaning_questions,
	"organizing" INT REFERENCES organizing_questions,
	"declutting" INT REFERENCES decluttering_questions,
	"comments" VARCHAR(10000)
);

INSERT INTO "user_inquiries" ("id", "user_id", "services_id", "date_received", "date_requested", "moving", "cleaning", "organizing", "declutting", "comments")
VALUES (1, 1, 1, 1, 1, 1, 1, 1, 1, 'Everett was here');

SELECT
"services"."description" AS "services_id",
"dates"."date_submitted" AS "date_received",
"moving_questions"."id" AS "moving",
"cleaning_questions"."id" AS "cleaning",
"organizing_questions"."id" AS "organizing",
"decluttering_questions"."id" AS "declutting"
FROM "user_inquiries"
JOIN "services" ON "user_inquiries"."services_id" = "services"."id"
JOIN "dates" ON "user_inquiries"."date_received" = "dates"."id"
JOIN "moving_questions" ON "user_inquiries"."moving" = "moving_questions"."id"
JOIN "cleaning_questions" ON "user_inquiries"."cleaning" = "cleaning_questions"."id"
JOIN "organizing_questions" ON "user_inquiries"."organizing" = "organizing_questions"."id"
JOIN "decluttering_questions" ON "user_inquiries"."declutting" = "decluttering_questions"."id";


CREATE TABLE "customer" (
	"id" serial primary key,
	"user_id" integer REFERENCES users,
	"inquiries" integer REFERENCES user_inquiries ON DELETE CASCADE,
	"services_id" integer REFERENCES services,
	"firstName" varchar(100),
	"lastName" varchar(250),
	"street1" varchar(1000),
	"street2" varchar(1000),
	"city" varchar(1000),
	"state" varchar(2),
	"zip" varchar(5),
	"phone_number" varchar(11),
	"email" varchar(50),
	"residence" varchar(240),
	"completion_status" INT REFERENCES completion,
	"priority" INT REFERENCES priority,
	"service_on" date 
);

INSERT INTO "customer" ("id", "user_id", "inquiries", "services_id", "firstName", "lastName", "street1", "street2", "city", "state", "zip", "phone_number", "email", "residence", "completion_status", "priority",  "service_on")
VALUES (1, 1, 1, 1, 'Everett', 'Butler', '123 Vista Wayyyyyy', null, 'Illicit', 'MO', '12345', '5555555555', 'yowaddup@email.com', 'Home', 5, 1, '2023-06-26');

CREATE TABLE "user_media" (
	id serial primary key,
	blob_data BYTEA,
	customer_id int references customer,
	user_id int references users
);

-- NO TEST DATA YET

CREATE TABLE "notes" (
	id serial primary key,
	user_id integer REFERENCES users,
	customer_id integer REFERENCES customer,
	notes varchar(30000)
);

-- NO TEST DATA YET