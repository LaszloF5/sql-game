const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database", err.message);
    throw err;
  }
  console.log("Connected to the SQLite database.");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Persons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        age INTEGER NOT NULL,
        ssn INTEGER UNIQUE NOT NULL,
        gender TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        eye-color TEXT NOT NULL,
        hair-color TEXT NOT NULL,
        car_type TEXT NOT NULL,
        motor_type TEXT NOT NULL,
        registration-number INTEGER NOT NULL,
        annual_income INTEGER NOT NULL,
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Police_db (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        crime_type TEXT NOT NULL,
        city TEXT NOT NULL,
        crime_report TEXT NOT NULL
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Secret_hacker_db (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        witness_testimonty TEXT NOT NULL
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Crimes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            crime_type TEXT NOT NULL,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            FOREIGN KEY (person_id) REFERENCES Persons(id) ON DELETE CASCADE
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Zoo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        visit_date TEXT NOT NULL,
        hair_color TEXT NOT NULL,
        ticket_type TEXT NOT NULL,
        FOREIGN KEY (person_id) REFERENCES Persons(id) ON DELETE CASCADE
        )`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
