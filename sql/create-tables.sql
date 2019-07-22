DROP DATABASE IF EXISTS TMB;
CREATE DATABASE TMB;
GRANT ALL PRIVILEGES ON TMB.* TO 'tmb-user'@'localhost';
USE TMB;

CREATE TABLE User
(
	ID varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    minit char(1),
    last_name varchar(255) NOT NULL,
    password varchar(255),
    passenger_email varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE Admin
(
    ID varchar(255) PRIMARY KEY,
	FOREIGN KEY(ID) REFERENCES User(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Station
(
    name varchar(255),
    status varchar(255),
    state_province varchar(255),
    address varchar(255),
    zipcode int,
    city varchar(255),
    PRIMARY KEY(name),
    UNIQUE(state_province, address, zipcode, city)
);

CREATE TABLE Line
(
    name varchar(255) PRIMARY KEY
);

CREATE TABLE Card
(
    user_ID varchar(255),
    type varchar(255),
    purchase_date_time Datetime DEFAULT CURRENT_TIMESTAMP,
    uses_left int,
    expiration_date Date,
    PRIMARY KEY (user_ID, type, purchase_date_time),
    FOREIGN KEY(user_ID) REFERENCES User(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Trip
(
    user_ID varchar(255),
    card_type varchar(255),
    card_purchase_date_time Datetime,
    start_date_time Datetime DEFAULT CURRENT_TIMESTAMP,
    end_date_time Datetime NULL ON UPDATE CURRENT_TIMESTAMP,
    from_station_name varchar(255) NOT NULL,
    to_station_name varchar(255),
    PRIMARY KEY(user_ID, card_type, card_purchase_date_time, start_date_time),
    FOREIGN KEY (from_station_name) REFERENCES Station(name),
	FOREIGN KEY (to_station_name) REFERENCES Station(name),
    FOREIGN KEY (user_ID, card_type, card_purchase_date_time) REFERENCES Card(user_ID, type, purchase_date_time) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Review
(
    passenger_ID varchar(255),
    rid int NOT NULL AUTO_INCREMENT UNIQUE,
    shopping int NOT NULL,
    connection_speed int NOT NULL,
    comment text,
    approver_ID varchar(255) DEFAULT NULL,
    approval_status varchar(255) DEFAULT 'pending',
    edit_timestamp Datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    station_name varchar(255) NOT NULL,
    PRIMARY KEY (passenger_ID, rid),
	FOREIGN KEY(passenger_ID) REFERENCES User(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(approver_ID) REFERENCES Admin(ID) ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY(station_name) REFERENCES Station(name)
);

CREATE TABLE Admin_Add_Line
(
    line_name varchar(255) PRIMARY KEY,
    admin_ID varchar(255),
    date_time Datetime DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(admin_ID) REFERENCES Admin(ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(line_name) REFERENCES Line(name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Admin_Add_Station
(
    station_name varchar(255) PRIMARY KEY,
    admin_ID varchar(255),
    date_time Datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(admin_ID) REFERENCES Admin(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(station_name) REFERENCES Station(name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Station_On_Line
(
    station_name varchar(255),
    line_name varchar(255),
    order_number int,
    PRIMARY KEY(station_name, line_name),
	FOREIGN KEY(station_name) REFERENCES Station(name),
    FOREIGN KEY(line_name) REFERENCES Line(name)
);
