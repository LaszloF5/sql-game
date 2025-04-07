const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { faker } = require("@faker-js/faker");
const { error } = require("console");

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

  db.run(`CREATE TABLE IF NOT EXISTS Zoo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        visit_date TEXT NOT NULL,
        hair_color TEXT NOT NULL,
        ticket_type TEXT NOT NULL,
        person_id INTEGER NOT NULL,
        FOREIGN KEY (person_id) REFERENCES Persons(id) ON DELETE CASCADE
        )`);

  db.run(`CREATE TABLE IF NOT EXISTS Session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fruit_name TEXT NOT NULL,
    quantity TEXT NOT NULL
    )`);
});

app.get("/api/warmup", (req, res) => {
    res.status(200).send("Server responded.");
});

app.get("/api/session", (req, res) => {
  db.all("SELECT * FROM Session", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/api/session", (req, res) => {
  const { formattedQuery } = req.body;

  const expectedQuery1 = `INSERT INTO Session (fruit_name, quantity) VALUES ('apple', '1kg')`;
  const expectedQuery2 = `INSERT INTO Session (fruit_name, quantity) VALUES ('banana', '2kg')`;

  if (
    formattedQuery.trim() !== expectedQuery1 &&
    formattedQuery.trim() !== expectedQuery2
  ) {
    return res.status(400).json({ error: "Invalid query" });
  }
  const sql = `INSERT INTO Session (fruit_name, quantity) VALUES (?, ?)`;

  const values = formattedQuery.includes("apple")
    ? ["apple", "1kg"]
    : ["banana", "2kg"];
  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: `Session with ${this.lastID} added successfully.`,
      newRecord: {
        id: this.lastID,
        fruit_name: values[0],
        quantity: values[1],
      },
    });
  });
});

app.delete("/api/session", (req, res) => {
  const { formattedQuery } = req.body;

  const possibleQuery1 = "DELETE FROM Session WHERE id = 1";
  const possibleQuery2 = "DELETE FROM Session WHERE id = 2";
  const possibleQuery3 = "del";

  let sql;
  if (formattedQuery === possibleQuery1) {
    sql = "DELETE FROM Session WHERE id = 1";
  } else if (formattedQuery === possibleQuery2) {
    sql = "DELETE FROM Session WHERE id = 2";
  } else if (formattedQuery === possibleQuery3) {
    sql = "DELETE FROM Session";
  } else {
    return res.status(400).json({ error: "Invalid query" });
  }

  db.run(sql, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      if (formattedQuery === possibleQuery3) {
        return console.log("The db was empty.");
      }
      return res.status(404).json({ error: "Session not found" });
    }

    db.get("SELECT COUNT(*) AS count FROM Session", [], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (row.count === 0) {
        db.run(
          "DELETE FROM sqlite_sequence WHERE name = 'Session'",
          [],
          (err) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            return res.json({
              message: "Session deleted successfully and ID sequence reset.",
            });
          }
        );
      } else {
        return res.json({ message: "Session deleted successfully." });
      }
    });
  });
});

//UPDATE

app.put("/api/session", (req, res) => {
  const { formattedQuery } = req.body;
  const expectedUpdateQuery = `UPDATE Session SET quantity = '1kg' WHERE fruit_name = 'banana'`;

  if (formattedQuery.trim() !== expectedUpdateQuery) {
    console.log(`Invalid query attempt: ${formattedQuery}`);
    return res.status(400).json({
      error: "Invalid query",
      expectedFormat: expectedUpdateQuery,
      note: "This is a training endpoint that only accepts one specific query",
    });
  }

  db.run(
    `UPDATE Session SET quantity = ? WHERE fruit_name = ?`,
    ["1kg", "banana"],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Database error",
          details: err.message,
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({
          error: "No matching record found",
          solution: "Create a banana record first",
        });
      }
      res.json({
        message: "Successfully updated banana quantity to 1kg",
        changes: this.changes,
      });
    }
  );
});

// Delete Session datas

app.post("/api/session", [], (req, res) => {
  db.run("DELETE FROM Session", [], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "All Session data has been deleted." });
  });
});

app.get("/api/persons", (req, res) => {
  db.all(`SELECT * FROM Persons`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/api/persons/mydata", (req, res) => {
  db.all(
    `SELECT * FROM Persons 
     WHERE name =
       'Elaine Mayert-Deckow'`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

app.get("/api/zoo", (req, res) => {
  db.all(`SELECT * FROM Zoo`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/api/policeDB", (req, res) => {
  db.all(`SELECT * FROM Police_db`, [], (err, rows) => {
    if (err) {
      console.error("Error retrieving crimes:", err.message);
      res.status(500).send("Error retrieving crimes.");
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/secretHackerDb", (req, res) => {
  db.all(`SELECT * FROM Secret_hacker_db`, [], (err, rows) => {
    if (err) {
      console.error("Error retrieving hackers:", err.message);
      res.status(500).send("Error retrieving hackers.");
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/solution", (req, res) => {
  db.all(
    `SELECT *
     FROM Persons
     JOIN Zoo ON Persons.id = Zoo.person_id
     WHERE Persons.age > 48 
       AND Persons.gender = 'male' 
       AND Persons.annual_income < 490280 
       AND Persons.car_type LIKE '%Taurus' 
       AND Zoo.ticket_type = 'vip'`,
    [],
    (err, rows) => {
      if (err) {
        console.error("Error retrieving male persons:", err.message);
        res.status(500).send("Error retrieving male persons.");
      } else {
        res.json(rows);
      }
    }
  );
});

app.post("/api/PoliceDB", (req, res) => {
  const { tutorialQuery } = req.body;
  if (!tutorialQuery) {
    return res.status(404).json({ error: "No query found." });
  }

  if (!tutorialQuery.toLowerCase().startsWith("select")) {
    return res.status(400).json({ error: "Only SELECT queries are allowed." });
  }

  db.all(tutorialQuery, [], (err, rows) => {
    if (err) {
      console.error("Error executing query: ", err.message);
      return res.json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/api/Persons", (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(404).json({ error: "No persons query found." });
  }
  if (!query.toLowerCase().startsWith("select")) {
    return res.status(400).json({ error: "Only SELECT queries are allowed." });
  }
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error executing persons query: ", err.message);
      return res.json({ err: err.message });
    } else {
      return res.json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
