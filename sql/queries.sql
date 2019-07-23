#DO NOT RUN! this file is just a documentation of all the queries our routes folder uses.

# cards.js
    # GET cards
    SELECT * FROM Card WHERE user_ID = '?';

    #add card
    INSERT INTO Card SET '?';

# lines.js
  #get Lines
  SELECT name FROM Line

  # get stations on a given line
  SELECT station_name, order_number FROM Station_On_Line WHERE line_name = ? ORDER BY order_number ASC

  #get station with given order number
  SELECT EXISTS(SELECT * FROM Station_On_Line WHERE line_name = ? AND order_number = ?) AS matched

  #create line
  INSERT INTO Line SET ?
  INSERT INTO Station_On_Line SET ?

  #get station with a given order number
  UPDATE Station_On_Line SET order_number = ? WHERE line_name = ? AND station_name = ?

# reviews.js
  #get Reviews
  SELECT * FROM Review WHERE passenger_ID = ?

  #get pending reviews
  SELECT * FROM Review WHERE approval_status = ?

  #get review
  SELECT * FROM Review WHERE rid = ? AND passenger_ID = ?

  #create review
  INSERT INTO Review SET ?

  #update review
  UPDATE Review SET ? WHERE rid = ? AND passenger_ID = ?

  #approve reviews
  UPDATE Review SET approval_status = 'Approved', approver_ID = ? WHERE rid = ? AND passenger_ID = ?

  #reject Reviews
  UPDATE Review SET approval_status = 'Rejected', approver_ID = ? WHERE rid = ? AND passenger_ID = ?

  #delete reviews
  DELETE FROM Review WHERE rid = ? AND passenger_ID = ?


# stations.js
  #get stations in asc order
  SELECT name FROM Station ORDER BY name ASC

  #get station by name
  SELECT * FROM Station WHERE name = ?

  #get lines
  SELECT line_name FROM Station_On_Line WHERE station_name = ?

  #get reviews for a given station
  SELECT * FROM Review WHERE approval_status = 'approved' AND station_name = ?

  #get average rating for a station
  SELECT AVG(shopping) AS avgShopping, AVG(connection_speed) AS avgSpeed FROM Review WHERE approval_status = 'approved' AND station_name = ?

  #update station status
    UPDATE Station SET status = ? WHERE name = ?

  #create station
  INSERT INTO Station SET ?
  INSERT INTO Admin_Add_Station SET ?
  INSERT INTO Station_On_Line SET ?


# trips.js
    # get Trips
    SELECT * FROM Trip WHERE user_ID = ?

    # create trip
    SELECT * FROM Card WHERE user_ID = ? AND type = ? AND purchase_date_time = ?
    INSERT INTO Trip SET ?
    UPDATE Card SET uses_left = uses_left - 1 WHERE user_ID = ? AND type = ? AND purchase_date_time = ?

    #update trip
      UPDATE Trip SET to_station_name = ? WHERE user_ID = ? AND card_type = ? AND card_purchase_date_time = ? AND start_date_time = ?

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
