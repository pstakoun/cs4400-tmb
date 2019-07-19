USE TMB;
ALTER TABLE User MODIFY COLUMN first_name VARCHAR(255) NOT NULL;
ALTER TABLE User ADD CONSTRAINT first_name CHECK (Length(first_name) != 0);
ALTER TABLE User MODIFY COLUMN last_name VARCHAR(255) NOT NULL;
ALTER TABLE User ADD CONSTRAINT last_name CHECK (Length(last_name) != 0);
ALTER TABLE User ADD CONSTRAINT email CHECK (Length(email) != 0);


ALTER TABLE User ADD CONSTRAINT pass_length CHECK (Length(password) > 7);





ALTER TABLE Review MODIFY COLUMN rid INT NOT NULL AUTO_INCREMENT UNIQUE;
ALTER TABLE Review ADD CONSTRAINT connection_speed CHECK(connection_speed > 0 AND connection_speed <= 5);
ALTER TABLE Review ADD CONSTRAINT shopping CHECK(shopping > 0 AND shopping <= 5);



#ALTER TABLE Review MODIFY COLUMN approval_status SET DEFAULT 'Pending';
ALTER TABLE Review ALTER approval_status SET DEFAULT 'Pending';

