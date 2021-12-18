// SQL = Structured Query Language
// mysql -u root -p   to log into SQL 
// quit to exit 
// npm i --save mysql2  ( to use source )
// crud creating, reading, updating, and deleting
// ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';

const { application } = require("express");
const db = require("./db/connection");

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

// db.query example
// runs the SQL query and 
// executes the callback with all the resulting rows that match the query
db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

// Delete a candidate
// ? denotes a placeholder , make this a prepared statement 
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// an example of data retrival
app.get ('/api/dogs',(req,res)=>{
  const sql= `SELECT*FROM dogs`;
  db.query(sql,(err,rows)=>{
    if (err){
      res.status(500).json({error:err.message});
      return;
    }
    res.json({
      message:'success',
      data: rows,
    })
  })
})

// Get all candidates
// the api in the URL signifies that this is an API endpoint
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get a single candidate
// assign the captured value populated in the req.params object with the key id to params
// Because params can be accepted in the database call as an array,
//  params is assigned as an array with a single element, req.params.id
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a candidate
//  http://localhost:3001/api/candidate/1   in insomnia will delete candidate with id of 1
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  // !! param values must be in an array
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a candidate
// create a post route 
// use the object req.body to populate the candidate's data
// using object destructuring to pull the body property out of the request object
// n the callback function block, 
// we assign errors to receive the return from the inputCheck function
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
});

// text has a longer character limit which is built in sql
description TEXT

//  A foreign key is a field in one table that references the primary key of another table

//  add a new field, delete an existing field, or modify a field
ALTER TABLE candidates ADD COLUMN party_id INTEGER;

// flag the party_id field as an official foreign key and 
// tells SQL which table and field it references\
// ensures that no id can be inserted into the candidates table 
// if it doesn't also exist in the parties table
CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) 
// set a candidate's party_id field to NULL if 
// the corresponding row in parties is ever deleted.
ON DELETE SET NULL

// parties table must be created before the candidates table
// candidates table must be dropped before the parties table

// filling in the foreign keys with the actual data
// returns the whole table from candidates
SELECT * FROM candidates
// the table would be the object and the column would be the property
LEFT JOIN parties ON candidates.party_id = parties.id;
// inner join , matching id from both tables
// left join, matching id from the joinee
// right join , matching id from the joiner
// full outer join, adding two tables together. 

// only returns the party's name
// * wildcard unique to sql , does not work in js
// wildcard selects all of the column data 
// AS defines an alias for the data, useful when there are overlapping names
SELECT candidates.*, parties.name AS party_name
FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;

// when using join , where clause must be at the end
const sql = `SELECT candidates.*, parties.name 
               AS party_name 
               FROM candidates 
               LEFT JOIN parties 
               ON candidates.party_id = parties.id 
              
               WHERE candidates.id = ?`;


// Update a candidate's party
// The affected row's id should always be part of the route (e.g., /api/candidate/2) while
//  the actual fields we're updating should be part of the body.
app.put('/api/candidate/:id', (req, res) => {
  const sql = `UPDATE candidates SET party_id = ? 
               WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// time stamp
// datetime will display 2020-01-01 13:00:00 format
// current_timestamp returns the current date and time in the same format.
// default will allow a value to be put in if no value is provided
// dafault current_timestamp sets the default value to current_timestamp
created_at DATETIME DEFAULT CURRENT_TIMESTAMP

// 
// originally app.get('/api/candidates')
router.get('/candidates', (req, res) => {
  // internal logic remains the same
});

// originally app.get('/api/candidate/:id')
router.get('/candidate/:id', (req, res) => {});

// originally app.post('/api/candidate')
router.post('/candidate', ({ body }, res) => {});

// originally app.put('/api/candidate/:id')
router.put('/candidate/:id', (req, res) => {});

// originally app.delete('/api/candidate/:id')
router.delete('/candidate/:id', (req, res) => {});

// built in sql sort by alphabetical order
const sql = `SELECT * FROM voters ORDER BY last_name`;
// sort starting from z instead of a. 
ORDER BY last_name DESC
// js sort
Array.prototype.sort()

// -- get all voters who do not have a last name of Cooper or Jarman
SELECT * FROM voters WHERE last_name != 'Cooper' AND last_name != 'Jarman';

// -- get all voters who have a .edu email address
SELECT * FROM voters WHERE email LIKE '%.edu';

// -- get only the last created voter
SELECT * FROM voters ORDER BY created_at DESC LIMIT 1;

// values inserted into vote_id must be unique
CONSTRAINT uc_voter UNIQUE (voter_id),

// on delete cascade, deleting the reference key will also
// delete the entire row from this table and 
// relevant rows in related tables
CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,

// count how many times a certain field value appears
SELECT COUNT(candidate_id) FROM votes GROUP BY candidate_id;
// w/o group by, only counts up how many rows there are in the table
AVG() to return the average value within a group

SUM() to add up all of the values in a group

MIN() to return the minimum value of a group

// join candidates with parties table , join votes table with candidates today
SELECT candidates.*, parties.name AS party_name, COUNT(candidate_id)
FROM votes
LEFT JOIN candidates ON votes.candidate_id = candidates.id
LEFT JOIN parties ON candidates.party_id = parties.id
GROUP BY candidate_id;
// sort by vote count
GROUP BY candidate_id ORDER BY count DESC;
// change name to count
COUNT(candidate_id) AS count
FROM votes