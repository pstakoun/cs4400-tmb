USE TMB;
ALTER TABLE User ADD CONSTRAINT pass_length CHECK (Length(password) > 7);


/* TODO add default pending status for insert review */

ALTER TABLE Review MODIFY COLUMN rid INT NOT NULL AUTO_INCREMENT UNIQUE;


#ALTER TABLE Review MODIFY COLUMN approval_status SET DEFAULT 'Pending';



ALTER TABLE Review
ALTER approval_status SET DEFAULT 'Pending';