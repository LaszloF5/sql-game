const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { faker } = require('@faker-js/faker');

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
        eye_color TEXT NOT NULL,
        hair_color TEXT NOT NULL,
        car_type TEXT NOT NULL,
        bike_type TEXT NOT NULL,
        car_registration_number TEXT NOT NULL,
        motorbike_registration_number TEXT NOT NULL,
        annual_income INTEGER NOT NULL
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Police_db (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        crime_type TEXT NOT NULL,
        city TEXT NOT NULL,
        crime_report TEXT NOT NULL
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Secret_hacker_db (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        witness_testimony TEXT NOT NULL
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Crimes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            crime_type TEXT NOT NULL,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            person_id INTEGER NOT NULL,
            FOREIGN KEY (person_id) REFERENCES Persons(id) ON DELETE CASCADE
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Zoo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        visit_date TEXT NOT NULL,
        hair_color TEXT NOT NULL,
        ticket_type TEXT NOT NULL,
        person_id INTEGER NOT NULL,
        FOREIGN KEY (person_id) REFERENCES Persons(id) ON DELETE CASCADE
        )`);
});

// const generatePerson = () => {
//     return [
//       faker.person.fullName(),
//       faker.number.int({ min: 18, max: 80 }),
//       faker.number.int({ min: 100000000, max: 999999999 }),
//       faker.person.sexType(),
//       faker.internet.email(),
//       faker.phone.number({ style: 'national' }),
//       faker.location.streetAddress(),
//       faker.location.city(),
//       faker.color.human(),
//       faker.color.human(),
//       faker.vehicle.vehicle(),
//       faker.vehicle.bicycle(),
//       faker.string.alpha(5).toUpperCase() + " - " + faker.number.int({ min: 10000, max: 49999 }),
//       faker.string.alpha(5).toUpperCase() + " - " + faker.number.int({ min: 50000, max: 99999 }),
//       faker.number.int({ min: 10000, max: 1000000 })
//     ];
// };

// db.serialize(() => {
//   const stmt = db.prepare(`
//     INSERT OR IGNORE INTO Persons 
//     (name, age, ssn, gender, email, phone, address, city, eye_color, hair_color, car_type, bike_type, car_registration_number, motorbike_registration_number, annual_income) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `);

//   for (let i = 0; i < 100; i++) {
//     stmt.run(generatePerson(), (err) => {
//       if (err) {
//         console.error("❌ Error inserting person:", err.message);
//       }
//     });
//   }

//   stmt.finalize();
//   console.log("✅ 100 személy beszúrva az adatbázisba.");
// });

app.get('/api/persons', (req, res) => {
    db.all(`SELECT * FROM Persons`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    })
})

// const deletePersons = () => {
//     db.run(`DELETE FROM Persons`, (err) => {
//         if (err) {
//             console.error("�� Error deleting persons:", err.message);
//         } else {
//             console.log("�� Személyek törlésére sikeresen megtörtént.");
//         }
//     })
// }

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
