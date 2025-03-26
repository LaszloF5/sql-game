const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { faker } = require("@faker-js/faker");

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

const crimeTypes = [
  "Theft",
  "Robbery",
  "Assault",
  "Vandalism",
  "Fraud",
  "Arson",
  "Burglary",
  "Drug trafficking",
  "Murder",
  "Kidnapping",
  "Embezzlement",
  "Extortion",
  "Cybercrime",
  "Human trafficking",
  "Sexual assault",
  "Domestic violence",
  "Money laundering",
  "Stalking",
  "Identity theft",
  "Bribery",
];

const names = [
  {
    name: "Abraham Wuckert",
    id: 43,
  },
  {
    name: "Alan Wiza",
    id: 15,
  },
  {
    name: "Albert Kuhn",
    id: 87,
  },
  {
    name: "Alexander Barton",
    id: 89,
  },
  {
    name: "Alicia King",
    id: 52,
  },
  {
    name: "Andres Prohaska",
    id: 83,
  },
  {
    name: "Angela Krajcik",
    id: 22,
  },
  {
    name: "Austin Dietrich PhD",
    id: 69,
  },
  {
    name: "Ben Cruickshank",
    id: 94,
  },
  {
    name: "Beulah Mayert",
    id: 12,
  },
  {
    name: "Brian Deckow",
    id: 97,
  },
  {
    name: "Candice Blanda-Strosin",
    id: 9,
  },
  {
    name: "Carolyn Boyle",
    id: 30,
  },
  {
    name: "Cecil Dickens",
    id: 70,
  },
  {
    name: "Christy Bartell",
    id: 50,
  },
  {
    name: "Daniel Rowe",
    id: 5,
  },
  {
    name: "Daryl O'Connell",
    id: 18,
  },
  {
    name: "Debbie Gleason",
    id: 44,
  },
  {
    name: "Dixie Reichert",
    id: 32,
  },
  {
    name: "Doyle Lueilwitz",
    id: 42,
  },
  {
    name: "Dr. Grant Gislason",
    id: 49,
  },
  {
    name: "Dr. Jeremy Hahn",
    id: 21,
  },
  {
    name: "Dr. Lynn Kunze",
    id: 60,
  },
  {
    name: "Dr. Max Koepp",
    id: 24,
  },
  {
    name: "Drew Stiedemann Jr.",
    id: 37,
  },
  {
    name: "Dwayne Veum",
    id: 64,
  },
  {
    name: "Edmond Kunze",
    id: 86,
  },
  {
    name: "Edward Paucek",
    id: 7,
  },
  {
    name: "Elaine Mayert-Deckow",
    id: 29,
  },
  {
    name: "Emilio Kuhic Jr.",
    id: 11,
  },
  {
    name: "Erma Lind-Goldner",
    id: 55,
  },
  {
    name: "Eugene Baumbach",
    id: 36,
  },
  {
    name: "Faith Johns II",
    id: 63,
  },
  {
    name: "Franklin Fay",
    id: 6,
  },
  {
    name: "Gail Moen",
    id: 39,
  },
  {
    name: "Guillermo Schuster",
    id: 71,
  },
  {
    name: "Ida Kerluke",
    id: 90,
  },
  {
    name: "Irvin Hyatt",
    id: 100,
  },
  {
    name: "Jaime Kulas",
    id: 31,
  },
  {
    name: "Jasmine Haley",
    id: 17,
  },
  {
    name: "Jenna Murazik MD",
    id: 99,
  },
  {
    name: "Jerald Mayert",
    id: 1,
  },
  {
    name: "Jonathan Abshire-Goyette",
    id: 3,
  },
  {
    name: "Jonathon Altenwerth",
    id: 48,
  },
  {
    name: "Kara Beer PhD",
    id: 56,
  },
  {
    name: "Karl Lemke",
    id: 79,
  },
  {
    name: "Kathleen Veum",
    id: 41,
  },
  {
    name: "Kayla Toy",
    id: 73,
  },
  {
    name: "Kelvin Gleason",
    id: 8,
  },
  {
    name: "Kirk Koch I",
    id: 67,
  },
  {
    name: "Kristie Rolfson",
    id: 28,
  },
  {
    name: "Kristina Weimann",
    id: 34,
  },
  {
    name: "Laverne Schneider",
    id: 35,
  },
  {
    name: "Laverne Stokes",
    id: 93,
  },
  {
    name: "Lawrence Stokes",
    id: 65,
  },
  {
    name: "Lee Shields",
    id: 27,
  },
  {
    name: "Levi Ruecker",
    id: 2,
  },
  {
    name: "Louis Pfannerstill",
    id: 61,
  },
  {
    name: "Louise Corwin-Okuneva",
    id: 47,
  },
  {
    name: "Lucille Gerlach",
    id: 78,
  },
  {
    name: "Marcia Dibbert",
    id: 82,
  },
  {
    name: "Margie Swaniawski",
    id: 13,
  },
  {
    name: "Matt Hessel",
    id: 74,
  },
  {
    name: "Maurice Heidenreich",
    id: 72,
  },
  {
    name: "Mercedes Halvorson V",
    id: 26,
  },
  {
    name: "Miss Carolyn Hermiston",
    id: 46,
  },
  {
    name: "Miss Marilyn Gleichner",
    id: 16,
  },
  {
    name: "Miss Tami Dare",
    id: 80,
  },
  {
    name: "Misty Kertzmann",
    id: 85,
  },
  {
    name: "Mitchell Durgan",
    id: 75,
  },
  {
    name: "Mr. Ian Steuber",
    id: 20,
  },
  {
    name: "Mr. Lorenzo Corkery",
    id: 58,
  },
  {
    name: "Mr. Nathaniel Crona",
    id: 19,
  },
  {
    name: "Mr. Paul Durgan",
    id: 53,
  },
  {
    name: "Mr. Steve Nicolas",
    id: 25,
  },
  {
    name: "Mr. Trevor Boyle",
    id: 62,
  },
  {
    name: "Ms. Melissa Emmerich",
    id: 95,
  },
  {
    name: "Nancy Pfeffer IV",
    id: 77,
  },
  {
    name: "Norma Pollich",
    id: 96,
  },
  {
    name: "Olga Rohan",
    id: 98,
  },
  {
    name: "Opal Collins",
    id: 38,
  },
  {
    name: "Patrick Abshire",
    id: 66,
  },
  {
    name: "Rebecca Hilpert-McDermott",
    id: 84,
  },
  {
    name: "Ross Bartoletti DDS",
    id: 88,
  },
  {
    name: "Ruby Moore",
    id: 33,
  },
  {
    name: "Ruby Waelchi",
    id: 51,
  },
  {
    name: "Rufus King I",
    id: 23,
  },
  {
    name: "Samuel Bechtelar",
    id: 68,
  },
  {
    name: "Sherry Douglas",
    id: 40,
  },
  {
    name: "Silvia Schmeler",
    id: 10,
  },
  {
    name: "Sonia Langworth",
    id: 81,
  },
  {
    name: "Stanley Dooley",
    id: 92,
  },
  {
    name: "Susan Kuhic",
    id: 59,
  },
  {
    name: "Sylvester Kirlin",
    id: 45,
  },
  {
    name: "Tabitha Hegmann",
    id: 54,
  },
  {
    name: "Terrell Labadie",
    id: 91,
  },
  {
    name: "Tim Kozey I",
    id: 57,
  },
  {
    name: "Virginia Heller",
    id: 76,
  },
  {
    name: "Willie Hansen",
    id: 14,
  },
  {
    name: "Wilma Huels",
    id: 4,
  },
];

const cities = [
  "West Selmercester",
  "Reicherttown",
  "Lake Vivianneberg",
  "Boganville",
  "New Angieview",
  "Abbigailview",
  "East Maggieport",
  "Justonland",
  "Osbornefield",
  "Lake Hilma",
  "Lake Rodrick",
  "South Major",
  "Venahaven",
  "Redmond",
  "South Edbury",
  "Millerville",
  "Hesterfort",
  "Fort Enidfort",
  "Richmond",
  "Darefurt",
  "Revere",
  "West Emmanuel",
  "West Randal",
  "Lake Rahsaan",
  "Teaganfield",
  "Grapevine",
  "North Kiana",
  "Southaven",
  "Parisianberg",
  "North Kaci",
  "South Maureenborough",
  "Loycefield",
  "North Leann",
];

// function generateRandomDate() {
//   const start = new Date("2020-01-01");
//   const end = new Date("2024-12-31");
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
// }

// db.serialize(() => {
//   const stmt = db.prepare(`
//       INSERT INTO Crimes (date, crime_type, name, location, person_id) VALUES (?, ?, ?, ?, ?)
//     `);

//   for (let i = 0; i < 20; ++i) {
//     const randomPerson = names[Math.floor(Math.random() * names.length)];
//     const crime = crimeTypes[i];
//     const crimeDate = generateRandomDate().toISOString().split("T")[0];
//     const randomName = randomPerson.name;
//     const randomCity = cities[Math.floor(Math.random() * cities.length)];
//     const randomId = randomPerson.id;

//     stmt.run(crimeDate, crime, randomName, randomCity, randomId, (err) => {
//       if (err) {
//         console.error(err.message);
//       } else {
//         console.log(`Inserted record ${i + 1} into Crimes table`);
//       }
//     });
//   }

//   stmt.finalize();
// });

app.get("/api/crimes", (req, res) => {
  db.all(`SELECT *FROM Crimes`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({ error: "Error retrieving data" });
    } else {
      res.send(rows);
    }
  });
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

app.get("/api/persons", (req, res) => {
  db.all(`SELECT * FROM Persons`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// app.get("/api/persons/mydata", (req, res) => {
//   db.all(`SELECT * FROM Persons WHERE `, [], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// });

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

// const createzoo = () => {
//   const sql = `INSERT INTO Zoo (name, visit_date, hair_color, ticket_type, person_id) VALUES
// ('Andres Prohaska', '2023-07-15', 'gold', 'normal', 83),
// ('Angela Krajcik', '2024-02-10', 'magenta', 'normal', 22),
// ('Austin Dietrich PhD', '2022-11-23', 'olive', 'normal', 69),
// ('Ben Cruickshank', '2023-06-30', 'teal', 'vip', 94),
// ('Beulah Mayert', '2024-01-05', 'olive', 'normal', 12),
// ('Brian Deckow', '2023-09-14', 'cyan', 'normal', 97),
// ('Candice Blanda-Strosin', '2022-08-19', 'violet', 'normal', 9),
// ('Carolyn Boyle', '2023-12-07', 'silver', 'normal', 30),
// ('Cecil Dickens', '2023-05-22', 'plum', 'normal', 70),
// ('Christy Bartell', '2024-03-18', 'mint green', 'vip', 50),
// ('Daniel Rowe', '2022-10-11', 'white', 'normal', 5),
// ('Elaine Mayert-Deckow', '2023-04-29', 'orchid', 'vip', 29),
// ('Franklin Fay', '2022-07-03', 'orchid', 'vip', 6),
// ('Mitchell Durgan', '2024-02-25', 'silver', 'vip', 75),
// ('Olga Rohan', '2023-11-13', 'lime', 'vip', 98);
// `;
//   db.run(sql, [], (err) => {
//     if (err) {
//       console.error("�� Error creating zoo table:", err.message);
//     } else {
//       console.log("�� Zoo table created successfully.");
//     }
//   })
// }

// const createSecretHackerDb = () => {
//   const sql = `INSERT INTO Secret_hacker_db (witness_testimony) VALUES 
//   ('Since the police force is the most corrupt institution in the city, you cannot rely on their reports to solve the murder. Fortunately, you managed to access the secret hacker database where witness testimonies are stored. Hopefully, with these, you will figure out who committed the murder.'),
//   ('Witness Testimony 1: The suspect is a man with short hair. His face was blurred. His clothing was quite simple but not noticeable. The short hair was typical, likely due to practical reasons and a simple lifestyle.'),
//   ('Witness Testimony 2: The man appeared to be elderly, judging by his movements. His steps were slow and uncertain. His face also resembled that of an older person, and his behavior displayed a sense of maturity.'),
//   ("Witness Testimony 3: He was poorly dressed, likely with a lower income than average. The man\'s clothing was quite worn and dirty, not reflecting a high social status."),
//   ('Witness Testimony 4: A Taurus-type car was parked not far from the scene, into which he hurriedly got, and he was wearing a green zoo entrance bracelet, which is only given to those who buy VIP tickets.');
//   `;

//   db.run(sql, [], (err) => {
//     if (err) {
//       console.error("Error creating secret hacker db table:", err.message);
//     } else {
//       console.log("Secret hacker db table created successfully.");
//     }
//   });
// };

app.get("/api/zoo", (req, res) => {
  db.all(`SELECT * FROM Zoo`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// const crimesData = [
//     { city: "West Selmercester", crime_type: "Theft", crime_report: "A local shop was robbed by an unknown individual. The suspect is still at large." },
//     { city: "Reicherttown", crime_type: "Assault", crime_report: "A man was attacked in his home by an unknown assailant. He sustained injuries." },
//     { city: "Lake Vivianneberg", crime_type: "Fraud", crime_report: "A fraudulent investment scheme was discovered, involving multiple victims." },
//     { city: "Boganville", crime_type: "Vandalism", crime_report: "Several public buildings were damaged by graffiti and broken windows." },
//     { city: "New Angieview", crime_type: "Burglary", crime_report: "A house was broken into during the night, and valuable items were stolen." },
//     { city: "Abbigailview", crime_type: "Murder", crime_report: "A homicide occurred in a quiet neighborhood, with little evidence at the scene." },
//     { city: "East Maggieport", crime_type: "Drug trafficking", crime_report: "A drug ring was uncovered in the region, with several arrests made." },
//     { city: "Justonland", crime_type: "Arson", crime_report: "A suspicious fire was started at a warehouse, causing extensive damage." },
//     { city: "Osbornefield", crime_type: "Robbery", crime_report: "A bank robbery took place early this morning, with the criminals still unapprehended." },
//     { city: "Lake Hilma", crime_type: "Kidnapping", crime_report: "A child was abducted from a local park, and the authorities are investigating." },
//     { city: "Lake Rodrick", crime_type: "Manslaughter", crime_report: "An individual was killed in a car accident, and investigations are ongoing." },
//     { city: "South Major", crime_type: "Extortion", crime_report: "A local business owner received threats unless they paid a sum of money." },
//     { city: "Venahaven", crime_type: "Smuggling", crime_report: "A major smuggling operation was intercepted, involving illegal goods." },
//     { city: "Redmond", crime_type: "Domestic violence", crime_report: "A domestic violence incident was reported, with the victim seeking help." },
//     { city: "South Edbury", crime_type: "Tax evasion", crime_report: "A large-scale tax evasion scheme was uncovered, involving multiple companies." },
//     { city: "Millerville", crime_type: "Forgery", crime_report: "A forged document was discovered during a routine audit, leading to an investigation." },
//     { city: "Hesterfort", crime_type: "Human trafficking", crime_report: "A human trafficking ring was dismantled, rescuing several victims." },
//     { city: "Fort Enidfort", crime_type: "Theft", crime_report: "A vehicle was stolen from a parking lot during the night." },
//     { city: "Richmond", crime_type: "Corruption", crime_report: "A local government official was caught in a bribery scheme." },
//     { city: "Darefurt", crime_type: "Battery", crime_report: "A person was physically attacked in a public place, resulting in minor injuries." },
//     { city: "Revere", crime_type: "Money laundering", crime_report: "Several businesses were found to be involved in a money laundering operation." },
//     { city: "West Emmanuel", crime_type: "Assault", crime_report: "A bar fight turned violent, resulting in one person being severely injured." },
//     { city: "West Randal", crime_type: "Vandalism", crime_report: "Graffiti was found on several public monuments in the city." },
//     { city: "Lake Rahsaan", crime_type: "Robbery", crime_report: "A jewelry store was robbed in broad daylight, with the suspects escaping in a getaway car." },
//     { city: "Teaganfield", crime_type: "Drug possession", crime_report: "A suspect was arrested for possessing illegal narcotics in a public area." },
//     { city: "Grapevine", crime_type: "Murder", crime_report: "A body was discovered in a remote area, and the cause of death appears to be a stabbing." },
//     { city: "North Kiana", crime_type: "Bribery", crime_report: "A local politician was caught accepting bribes in exchange for favorable decisions." },
//     { city: "Southaven", crime_type: "Arson", crime_report: "Several houses were set on fire by an unknown individual, causing widespread panic." },
//     { city: "Parisianberg", crime_type: "Kidnapping", crime_report: "A woman was abducted from a park, and the authorities are searching for the suspect." },
//     { city: "North Kaci", crime_type: "Smuggling", crime_report: "Several illegal goods were intercepted by customs agents at the local port." },
//     { city: "South Maureenborough", crime_type: "Fraud", crime_report: "A scam targeting elderly residents was discovered, involving fake investments." },
//     { city: "Loycefield", crime_type: "Money laundering", crime_report: "A network of money laundering operations was found involving several local businesses." },
//     { city: "North Leann", crime_type: "Tax evasion", crime_report: "A group of companies was found to be evading taxes, leading to significant fines." },
//     { city: "Ebertborough", crime_type: "Assault", crime_report: "A domestic violence case resulted in a serious assault, and the suspect has been arrested." },
//     { city: "Sauerland", crime_type: "Corruption", crime_report: "A public official was caught embezzling funds from a local charity." },
//     { city: "Gilbert", crime_type: "Forgery", crime_report: "A forged signature was used to withdraw funds from a local bank account." },
//     { city: "Cassinhaven", crime_type: "Battery", crime_report: "A street fight led to an assault charge after one person was beaten severely." },
//     { city: "New Manuelmouth", crime_type: "Murder", crime_report: "A murder took place in a residential area, and investigations are ongoing." },
//     { city: "Haagland", crime_type: "Theft", crime_report: "A series of burglaries have been reported in the city, with many homes broken into." },
//     { city: "New Frederick", crime_type: "Arson", crime_report: "A fire was intentionally set in a factory, causing significant damage." },
//     { city: "Port Yesenia", crime_type: "Drug trafficking", crime_report: "A large drug trafficking operation was uncovered with multiple arrests made." },
//     { city: "D'Amoreland", crime_type: "Fraud", crime_report: "A financial fraud involving fake insurance claims was uncovered." },
//     { city: "Garrisonfurt", crime_type: "Kidnapping", crime_report: "A child was abducted from a local playground, and the investigation is ongoing." },
//     { city: "East Ida", crime_type: "Bribery", crime_report: "A public servant was found accepting bribes for facilitating construction permits." },
//     { city: "Port Vivianne", crime_type: "Forgery", crime_report: "A forged document was used in an attempt to obtain a loan from a bank." },
//     { city: "Mellieland", crime_type: "Extortion", crime_report: "A business owner received threats unless he paid money to the perpetrators." },
//     { city: "Sandy", crime_type: "Assault", crime_report: "A bar fight led to a severe assault charge after one individual was knocked unconscious." },
//     { city: "Fort Alda", crime_type: "Robbery", crime_report: "A local convenience store was robbed, and the suspects are still being sought." },
//     { city: "Virgiecester", crime_type: "Smuggling", crime_report: "A smuggling ring involving rare goods was intercepted by local authorities." },
//     { city: "Ebertfurt", crime_type: "Battery", crime_report: "An individual was assaulted in the street, resulting in minor injuries." },
//     { city: "Murazikfort", crime_type: "Murder", crime_report: "A body was discovered, and foul play is suspected." },
//     { city: "Durganmouth", crime_type: "Extortion", crime_report: "A local shopkeeper was threatened with violence unless money was paid." },
//     { city: "New Kayla", crime_type: "Vandalism", crime_report: "A series of cars were damaged by vandals overnight." },
//     { city: "Elnashire", crime_type: "Fraud", crime_report: "A Ponzi scheme was uncovered, defrauding hundreds of investors." },
//     { city: "Port Obiechester", crime_type: "Theft", crime_report: "A series of thefts from local stores were reported, with suspects still unidentified." },
//     { city: "West Lolafield", crime_type: "Corruption", crime_report: "A city official was arrested for taking bribes in exchange for contracts." },
//     { city: "Anastasiaview", crime_type: "Arson", crime_report: "A fire was deliberately started at a local school, causing extensive damage." },
//     { city: "Fort Jazlynfield", crime_type: "Drug trafficking", crime_report: "Authorities uncovered a large-scale drug trafficking operation involving several individuals." },
//     { city: "South Duncanmouth", crime_type: "Battery", crime_report: "A fight broke out in a club, leading to serious injuries." },
//     { city: "Port Judah", crime_type: "Theft", crime_report: "A break-in at a local electronics store resulted in the theft of expensive items." },
//     { city: "Hosealand", crime_type: "Robbery", crime_report: "A gas station was robbed, and the suspects fled with cash." },
//     { city: "Bettiemouth", crime_type: "Murder", crime_report: "A homicide investigation is ongoing after a body was found in a nearby forest." },
//     { city: "Bel Air South", crime_type: "Forgery", crime_report: "Fake identification cards were used to obtain loans illegally." },
//     { city: "Durham", crime_type: "Bribery", crime_report: "Several employees of a local business were found accepting bribes to avoid inspection." },
//     { city: "Katelinshire", crime_type: "Smuggling", crime_report: "Illegal goods were smuggled through the port and seized by customs." },
//     { city: "Lake Brianneshire", crime_type: "Extortion", crime_report: "A business owner was blackmailed for money by a local gang." },
//     { city: "North Nikki", crime_type: "Vandalism", crime_report: "Several public parks were defaced with graffiti." },
//     { city: "West Sammieberg", crime_type: "Assault", crime_report: "A student was assaulted by another student during a school event." },
//     { city: "Chicago", crime_type: "Murder", crime_report: "A high-profile murder case is under investigation after a well-known figure was killed." },
//     { city: "Port Katlynn", crime_type: "Robbery", crime_report: "A robbery took place at a local bank, and the suspects are still at large." },
//     { city: "Heathcotefort", crime_type: "Drug possession", crime_report: "An individual was caught possessing illegal drugs in a public area." },
//     { city: "Kuphalton", crime_type: "Extortion", crime_report: "A group was caught blackmailing business owners for large sums of money." },
//     { city: "West Skyeton", crime_type: "Vandalism", crime_report: "A series of statues were vandalized overnight in the downtown area." },
//     { city: "Port Kellie", crime_type: "Bribery", crime_report: "A local official was arrested for accepting bribes from contractors." },
//     { city: "Ezrafort", crime_type: "Battery", crime_report: "A person was attacked in a parking lot during a dispute." },
//     { city: "Ebertland", crime_type: "Forgery", crime_report: "A forged passport was discovered during a border inspection." },
//     { city: "West Marjorieton", crime_type: "Fraud", crime_report: "A fraudulent business venture was uncovered, deceiving multiple investors." },
//     { city: "Busterfurt", crime_type: "Theft", crime_report: "A high-end electronics store was robbed, with the thieves escaping with valuable goods." },
//     { city: "East Jon", crime_type: "Kidnapping", crime_report: "A child was kidnapped from a park, and the authorities are working on locating the suspect." },
//     { city: "South Izaiahville", crime_type: "Corruption", crime_report: "Several government officials were found guilty of embezzling public funds." },
//     { city: "North Myrna", crime_type: "Fraud", crime_report: "An online scam targeting elderly citizens was reported, resulting in financial loss." },
//     { city: "Scranton", crime_type: "Smuggling", crime_report: "A smuggling ring was uncovered at a local shipping port." },
//     { city: "North Cicerofort", crime_type: "Arson", crime_report: "A car was intentionally set on fire in a parking lot." },
//     { city: "Wolfffurt", crime_type: "Murder", crime_report: "A mysterious murder occurred in the woods, and the case is still under investigation." },
//     { city: "Lake Shannon", crime_type: "Extortion", crime_report: "A local merchant was blackmailed for a sum of money by an unknown group." },
//     { city: "Juwanboro", crime_type: "Robbery", crime_report: "A local jewelry store was targeted in a daylight robbery." },
//     { city: "Lake Abigalecester", crime_type: "Forgery", crime_report: "A forged check was discovered, attempting to cash out a significant amount of money." },
//     { city: "Fridafield", crime_type: "Kidnapping", crime_report: "A child was taken from a family home, and an investigation is ongoing." },
//     { city: "New Marcusburgh", crime_type: "Bribery", crime_report: "A local contractor was found guilty of offering bribes to city officials." },
//     { city: "Cathrynshire", crime_type: "Murder", crime_report: "A body was found near a lake, and authorities are looking for clues to identify the killer." },
//     { city: "Waterbury", crime_type: "Vandalism", crime_report: "Several statues in the park were vandalized with spray paint." },
//     { city: "Samcester", crime_type: "Fraud", crime_report: "A Ponzi scheme was uncovered, defrauding dozens of people out of their savings." },
//     { city: "Hollywood", crime_type: "Theft", crime_report: "A robbery took place at a celebrity's home, and the suspects have fled the area." },
//     { city: "Kerlukeside", crime_type: "Smuggling", crime_report: "A smuggling ring was found to be operating through a local warehouse." },
//     { city: "Saulworth", crime_type: "Murder", crime_report: "A mysterious death was discovered near the woods, under suspicious circumstances." },
//     { city: "East Noemy", crime_type: "Battery", crime_report: "A fight broke out in a restaurant, resulting in injuries to two individuals." },
//     { city: "Josehaven", crime_type: "Bribery", crime_report: "A mayor was arrested for accepting bribes in exchange for zoning approvals." },
//     { city: "Jenkinsshire", crime_type: "Fraud", crime_report: "A fraudulent insurance claim was found after an investigation by authorities." },
//     { city: "North Frida", crime_type: "Drug possession", crime_report: "A person was arrested for possessing a large quantity of illegal drugs." },
//     { city: "Arecibo", crime_type: "Arson", crime_report: "A fire was intentionally set in a building, causing major damage to nearby property." }
// ];

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

// const deletePersons = () => {
//     db.run(`DELETE FROM Zoo`, (err) => {
//         if (err) {
//             console.error("�� Error deleting persons:", err.message);
//         } else {
//             console.log("�� Személyek törlésére sikeresen megtörtént.");
//         }
//     })
// }

/*
  Tutorial végpontok:
  Csak a select utasításokkal fogunk foglalkozni.
  A delete és update nem lesznek bemutatva.
*/

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
    } else {
      res.json(rows);
    }
  });
});

app.post("/api/Persons", (req, res) => {
  const {query} = req.body;
  if (!query) {
    return res.status(404).json({ error: "No persons query found." });
  }
  if (!query.toLowerCase().startsWith('select')) {
    return res.status(400).json({ error: "Only SELECT queries are allowed." });
  }
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error executing persons query: ", err.message);
    } else {
      res.json(rows);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
 Kész:
 - policeDB // Ez úgyis kamu, szal nem érdekes
 - Crimes // Ezt töröljük
 - Persons // Ez a fő tábla, ez oké.
 - Zoo
 
 MA:
 - Secret_hacker_db
 - A Crimes táblát törölni kell majd, mert szerintem nem kell. De majd meglátjuk.
*/
