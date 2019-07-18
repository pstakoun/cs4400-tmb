USE TMB;
BEGIN;
ALTER TABLE User ADD CONSTRAINT pass_length CHECK (Length(password) > 7);