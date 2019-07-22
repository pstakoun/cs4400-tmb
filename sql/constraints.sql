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
ALTER TABLE Review ADD CONSTRAINT connection_speed NOT NULL CHECK(connection_speed > 0 AND connection_speed <= 5);
ALTER TABLE Review ADD CONSTRAINT shopping NOT NULL CHECK(shopping > 0 AND shopping <= 5);
ALTER TABLE Review ALTER approval_status SET DEFAULT 'Pending';



#  Constraints for deleting passenger users. cascading on Review, Card, and Trip
ALTER TABLE Review
   ADD CONSTRAINT passenger_ID_cascade
   FOREIGN KEY (passenger_ID) REFERENCES User(ID) ON DELETE CASCADE;
ALTER TABLE Card
   ADD CONSTRAINT user_card_cascades
   FOREIGN KEY (user_ID) REFERENCES User(ID) ON DELETE CASCADE;
ALTER TABLE Trip
   ADD CONSTRAINT user_trip_cascade
   FOREIGN KEY (user_ID) REFERENCES Card(user_ID) ON DELETE CASCADE;

#  Constraints for updating passengers users. cascading on Review, Card, and Trip
ALTER TABLE Review
   ADD CONSTRAINT passenger_ID_cascade
   FOREIGN KEY (passenger_ID) REFERENCES User(ID) ON UPDATE CASCADE;
ALTER TABLE Card
   ADD CONSTRAINT user_card_cascades
   FOREIGN KEY (user_ID) REFERENCES User(ID) ON UPDATE CASCADE;
ALTER TABLE Trip
   ADD CONSTRAINT user_trip_cascade
   FOREIGN KEY (user_ID) REFERENCES Card(user_ID) ON UPDATE CASCADE;


# Card Datetime
ALTER TABLE Card MODIFY COLUMN purchase_date_time Datetime DEFAULT CURRENT_TIMESTAMP;
# Trip Datetime
ALTER TABLE Trip MODIFY COLUMN start_date_time Datetime DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Trip MODIFY COLUMN end_date_time Datetime NULL ON UPDATE CURRENT_TIMESTAMP;






#  Constraints for deleting admin users. cascading on Review, Admin_Add_Line, and Admin_Add_Station

ALTER TABLE Admin_Add_Line
   ADD CONSTRAINT line_create_delete
   FOREIGN KEY (user_ID) REFERENCES ADMIN(ID) ON DELETE CASCADE;
ALTER TABLE Admin_Add_Station
   ADD CONSTRAINT station_create_delete
   FOREIGN KEY (admin_ID) REFERENCES ADMIN(ID) ON DELETE CASCADE;

#delete admin approval id in review table. cascade to null. change status to pending.
#TEST THIS
ALTER TABLE Review
   ADD CONSTRAINT approver_id_deleted
   FOREIGN KEY (approver_id) REFERENCES ADMIN(ID) ON DELETE SET NULL;


#  Constraints for updating admin users. cascading on Review, Card, and Trip

ALTER TABLE Admin_Add_Line
   ADD CONSTRAINT line_create_update
   FOREIGN KEY (user_ID) REFERENCES ADMIN(ID) ON UPDATE CASCADE;
ALTER TABLE Admin_Add_Station
   ADD CONSTRAINT station_create_update
   FOREIGN KEY (admin_ID) REFERENCES ADMIN(ID) ON UPDATE CASCADE;


/* is this required??
#update admin approval id in review table. cascade to null. change status to pending.
#TEST THIS
ALTER TABLE Review
   ADD CONSTRAINT approver_id_updated
   FOREIGN KEY (approver_id) REFERENCES ADMIN(ID) ON UPDATE SET NULL;

*/



# TODO!
#drop foriegn key for admin
#add cascade 
#todo fix error messages for all constraints.
#continue adding and double checking constraints as we go.






