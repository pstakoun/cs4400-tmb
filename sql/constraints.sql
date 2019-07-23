USE TMB;

-- Registration (email null for admin)
ALTER TABLE User ADD CONSTRAINT check_first_name CHECK (Length(first_name) != 0);
ALTER TABLE User ADD CONSTRAINT check_last_name CHECK (Length(last_name) != 0);
ALTER TABLE User ADD CONSTRAINT check_passenger_email CHECK (Length(passenger_email) != 0);
ALTER TABLE User ADD CONSTRAINT check_password CHECK (Length(password) > 7);

-- Reviews
ALTER TABLE Review ADD CONSTRAINT check_shopping   CHECK(shopping > 0 AND shopping <= 5);
ALTER TABLE Review ADD CONSTRAINT check_connection_speed  CHECK(connection_speed > 0 AND connection_speed <= 5) ;
SET SQL_SAFE_UPDATES = 0;

/*
DELIMITER $
CREATE TRIGGER delete_station 
BEFORE DELETE ON Admin
FOR EACH ROW 
BEGIN
	DELETE FROM Station WHERE name IN (SELECT stat.station_name FROM admin_add_station AS stat WHERE stat.admin_ID = OLD.ID);
END $
DELIMITER ;*/

DELIMITER $
CREATE TRIGGER delete_station BEFORE DELETE ON Admin
for each row
BEGIN
    DELETE FROM Station WHERE name IN (SELECT S.station_name from
    Admin_Add_Station AS S WHERE S.admin_ID = deleted.ID);
END$
DELIMITER ;

-- TODO:

#  Constraints for editing id deleting passenger users. cascading on Review, Card, and Trip
#added to create tables file.

#  Constraints for editing id /deleting admin users. cascading on Review, Admin_Add_Line, and Admin_Add_Station
#added to create tables file.

#drop foriegn key for admin
#add cascade
#todo fix error messages for all constraints.
#continue adding and double checking constraints as we go.
