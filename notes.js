// SQL = Structured Query Language
// mysql -u root -p   to log into SQL 
// quit to exit 
// npm i --save mysql2  ( to use source )
// crud creating, reading, updating, and deleting

// to create a database
// mysql> CREATE DATABASE election;   
// to select the database
// USE election;

// creates the candidates talbe
CREATE TABLE candidates (
    //   column names must not contain spaces and are normally lowercase
    // primary key states each value in this colum must be unique for each record in the table
    // auto increment with each successive row and assign that new value to the id
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
//   varchar stands for a variable character
// the number that follows represents the number of characters this column's values can have
  first_name VARCHAR(30) NOT NULL,
//   null would mean it s ok for a reocrd to not have a value, not null. it s not ok
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL
);

// DESCRIBE candidates;  describes the table's fields and field attributes but doesnt display data

// data insertion example 
// VARCHAR values must be surrounded by quotes. they are strings
// the order of values must match the order of the columns
INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES ('Ronald', 'Firbank', 1);

// a query that will return all rows of data in the table.
// We could list individual column names separated by commas,
//  but we use the wildcard *, which means "all the columns."
SELECT * FROM candidates;


INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES
  ('Virginia', 'Woolf', 1),
  ('Piers', 'Gaveston', 0),
  ('Charles', 'LeRoi', 1),
  ('Katherine', 'Mansfield', 1),
  ('Dora', 'Carrington', 0),
  ('Edward', 'Bellamy', 0),
  ('Montague', 'Summers', 1),
  ('Octavia', 'Butler', 1),
  ('Unica', 'Zurn', 1);

//   retrives only specific column values 
  SELECT first_name, last_name FROM candidates;

//   conditionally filter through the data in the table
  SELECT first_name, industry_connected
FROM candidates
// The WHERE clause is followed by an expression that SQL evaluates to be true or false
// this = is equivalent to js === operator, not an assignment 
// other where operators , < , !=, OR , AND 
WHERE industry_connected = 1;

// select a specific row using the primary key with the id
SELECT first_name, last_name, industry_connected
FROM candidates
WHERE id = 5;

//  to verify this data base doesnt already exist , use 
show databases;

// max number of digits is 11
INTEGER(11)

// shows the current table 
show tables;

// hit uparrow to repeat last entry 

// to delete a database 
DROP DATABASE election;

// execute db.sql check the file to see more
source db/db.sql

// update info example
UPDATE candidates
// data to be changed
SET industry_connected = 1
// position where the data is
WHERE id = 3;

// delete an entry
// this will delete the entire row 
DELETE FROM candidates
WHERE first_name = "Montague";

// creates .gitignore and writes node_module to the file
echo "node_modules/" > .gitignore

// initialize node js
npm init --y

// this might be why node was not working
"scripts": {
  "test": "jest",
  "start": "node server.js"
},