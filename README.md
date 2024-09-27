# Intract

Things I couldn't implement because I am new to backend are 


 We will need to have our database as - > 
    userID
    notification_ID
    notification_data  // timestamps message and all


if send has a userID, then push it to the database as it is 
but if there isnt any userID then take all unique userIDs and attach the message to each of them and push them to db.
