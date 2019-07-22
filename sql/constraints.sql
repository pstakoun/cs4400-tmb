USE TMB;

# Constraints for registration.  (email must be null for admins)
ALTER TABLE User MODIFY COLUMN first_name VARCHAR(255) NOT NULL;
ALTER TABLE User ADD CONSTRAINT first_name CHECK (Length(first_name) != 0);
ALTER TABLE User MODIFY COLUMN last_name VARCHAR(255) NOT NULL;
ALTER TABLE User ADD CONSTRAINT last_name CHECK (Length(last_name) != 0);
ALTER TABLE User ADD CONSTRAINT passenger_email CHECK (Length(passenger_email) != 0);
ALTER TABLE User ADD CONSTRAINT pass_length CHECK (Length(password) > 7);


# Constraints for adding reviews.
ALTER TABLE Review MODIFY COLUMN rid INT NOT NULL AUTO_INCREMENT UNIQUE;
ALTER TABLE Review ADD CONSTRAINT connection_speed  CHECK(connection_speed > 0 AND connection_speed <= 5) ;
ALTER TABLE Review MODIFY COLUMN connection_speed INT NOT NULL;
ALTER TABLE Review ADD CONSTRAINT shopping   CHECK(shopping > 0 AND shopping <= 5);
ALTER TABLE Review MODIFY COLUMN shopping INT NOT NULL;
ALTER TABLE Review ALTER approval_status SET DEFAULT 'pending';

# Card Datetime
ALTER TABLE Card MODIFY COLUMN purchase_date_time Datetime DEFAULT CURRENT_TIMESTAMP;
# Trip Datetime
ALTER TABLE Trip MODIFY COLUMN start_date_time Datetime DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Trip MODIFY COLUMN end_date_time Datetime NULL ON UPDATE CURRENT_TIMESTAMP;


#  Constraints for editing id deleting passenger users. cascading on Review, Card, and Trip
#added to create tables file.

#  Constraints for editing id /deleting admin users. cascading on Review, Admin_Add_Line, and Admin_Add_Station
#added to create tables file.





# TODO!
#drop foriegn key for admin
#add cascade
#todo fix error messages for all constraints.
#continue adding and double checking constraints as we go.
