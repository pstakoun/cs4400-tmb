#DO NOT RUN! this file is just a documentation of all the queries our routes folder uses.

# cards.js
    # GET cards
    SELECT * FROM Card WHERE user_ID = '?';

    #add card
    INSERT INTO Card SET '?';

#todo. ADD ALL FILES QUERIES HERE.

# lines.js
# reviews.js
# stations.js
# trips.js
# users.js
    # register Add passenger user
    INSERT INTO User SET ?

    # login
    SELECT User.*, Admin.ID AS admin FROM User LEFT JOIN Admin ON User.ID = Admin.ID WHERE User.ID = ?

    # update Profile
    UPDATE User SET ? WHERE ID = ?

    #Cascade Delete station
    DELETE FROM station
    WHERE name IN (SELECT names
     FROM (SELECT DISTINCT station.name as names
     FROM station LEFT OUTER JOIN admin_add_station
     ON station.name = admin_add_station.station_name
     WHERE admin_add_station.admin_id = ? ) AS required);

     #Cascade Delete line
     DELETE FROM line
          WHERE name IN (SELECT names
          FROM (SELECT DISTINCT line.name as names
          FROM line LEFT OUTER JOIN admin_add_line
          ON line.name = admin_add_line.line_name
          WHERE admin_add_line.admin_id = ? ) AS required);

    #Delete User
    DELETE FROM User WHERE ID = ?'
