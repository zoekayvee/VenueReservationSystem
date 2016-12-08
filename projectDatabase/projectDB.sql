/*
CMSC 127 Project Database

Go to directory where projectDB.sql is located or enter full path to file then run:
	mysql -u root -p < projectDB.sql

//	Changelog	//
November 1, 2016:
	- Some minor adjustments in create table statements
	- Added accountid attribute to user table
	- Added date attribute (venuedate & dateapproved) to admin_manages_venue and event_is_approved_by_admin table respectively
	- Set increment start to 9000 for admin
	- Insertion of initial data via .csv files, which hold the initial data
*/

create database projectDB;
use projectDB;

create table user(
	accountid int unsigned auto_increment,
	username varchar(50) not null,
	password varchar(50) not null,
	accounttpye varchar(30) not null,
	firstname varchar(50) not null,
	middlename varchar(50),
	lastname varchar(50) not null,
	contactno varchar(50),
	address varchar(100),
	email varchar(100),
	dateadded varchar(50),
	approved boolean not null default FALSE,
	constraint user_accountid_pk primary key(accountid)
);

create table user_admin(
	adminid int unsigned auto_increment,
	accountid int unsigned,
	rank varchar(30),
	constraint user_admin_adminid_pk primary key(adminid),
	constraint user_admin_accountid_fk foreign key(accountid) references user(accountid)
	on delete cascade
	on update RESTRICT
)auto_increment=9000;

create table user_normal_user(
	userid int unsigned auto_increment,
	accountid int unsigned,
	affiliation varchar(100),
	constraint user_normal_user_userid_pk primary key(userid),
	constraint user_normal_user_accountid_fk foreign key(accountid) references user(accountid)
	on delete cascade
	on update RESTRICT
);

create table event(
	eventid int unsigned auto_increment,
	userid int unsigned,
	accountid int unsigned,
	eventname varchar(100) not null,
	eventdetails varchar(500),
	eventdate varchar(50) not null,
	eventstarttime varchar(30) not null,
	eventendtime varchar(30) not null,
	eventtype varchar(50),
	eventadvertised varchar(50),
	constraint event_eventid_pk primary key(eventid),
	constraint event_userid_fk foreign key(userid) references user_normal_user(userid),
	constraint event_accountid_fk foreign key(accountid) references user(accountid)
	on delete cascade
	on update RESTRICT
)auto_increment=100;

create table venue(
	venueid int unsigned auto_increment,
	venuename varchar(100) not null,
	venuecapacity int unsigned not null,
	venuedetails varchar(500),
	constraint venue_venueid_pk primary key(venueid)
)auto_increment=1000;

create table event_date_of_event(
	eventdate date,
	eventid int unsigned,
	constraint event_date_of_event_eventdate_pk primary key(eventdate),
	constraint event_date_of_event_eventid_fk foreign key(eventid) references event(eventid)
	on delete cascade
	on update RESTRICT
);

create table event_has_venue(
	eventid int unsigned,
	venueid int unsigned,
	reservationdate date,
	constraint event_has_venue_venueid_pk primary key(venueid),
	constraint event_has_venue_eventid_fk foreign key(eventid) references event(eventid),
	constraint event_has_venue_venueid_fk foreign key(venueid) references venue(venueid)
	on delete cascade
	on update RESTRICT
);

create table admin_manages_venue(
	venueid int unsigned,
	adminid int unsigned,
	venuedate date,
	constraint admin_manages_venue_venueid_pk primary key(venueid),
	constraint admin_manages_venue_venueid_fk foreign key(venueid) references venue(venueid),
	constraint admin_manages_venue_adminid_fk foreign key(adminid) references user_admin(adminid)
	on delete cascade
	on update RESTRICT
);

create table event_is_managed_by_admin(
	eventid int unsigned,
	adminid int unsigned,
	constraint event_is_managed_by_admin_eventid_pk primary key(eventid),
	constraint event_is_managed_by_admin_eventid_fk foreign key(eventid) references event(eventid),
	constraint event_is_managed_by_admin_adminid_fk foreign key(adminid) references user_admin(adminid)
	on delete cascade
	on update RESTRICT
);

create table event_is_approved_by_admin(
	eventid int unsigned,
	adminid int unsigned,
	dateapproved date,
	constraint event_is_approved_by_admin_eventid_pk primary key(eventid),
	constraint event_is_approved_by_admin_eventid_fk foreign key(eventid) references event(eventid),
	constraint event_is_approved_by_admin_adminid_fk foreign key(adminid) references user_admin(adminid)
	on delete cascade
	on update RESTRICT
);

create table user_is_maintained_by_admin(
	accountid int unsigned,
	userid int unsigned,
	adminid int unsigned,
	constraint user_is_maintained_by_admin_accountid_pk primary key(accountid),
	constraint user_is_maintained_by_admin_userid_fk foreign key(userid) references user_normal_user(userid),
	constraint user_is_maintained_by_admin_adminid_fk foreign key(adminid) references user_admin(adminid)
	on delete cascade
	on update RESTRICT
);


---- 	Insertion of Initial Data 	----

-- load common user data from user.csv
LOAD DATA LOCAL INFILE 'projectData/user.csv' INTO TABLE user
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES (username,password,accounttpye,firstname,middlename,lastname,contactno,address,email,dateadded)
set accountid = NULL;

-- get accountid from each admin in user and insert into user_admin table
insert into user_admin (accountid) select accountid from user where accounttpye = 'admin';
-- get accountid from each normal user in user and insert into user_normal_user table
insert into user_normal_user (accountid) select accountid from user where accounttpye = 'normal_user';
-- convert string to date and apply to dateadded column
update user set dateadded = str_to_date(dateadded,"%m/%d/%Y");

-- load event data from event.csv
LOAD DATA LOCAL INFILE 'projectData/event.csv' INTO TABLE event
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES (eventname,eventdetails,eventdate,eventstarttime,eventendtime)
set eventid = NULL;

-- convert string to date and apply to eventdate column
update event set eventdate = str_to_date(eventdate,"%m/%d/%Y");

-- load venue data from venue.csv
LOAD DATA LOCAL INFILE 'projectData/venue.csv' INTO TABLE venue
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES (venuename,venuecapacity,venuedetails)
set venueid = NULL;