import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface PoliceData {
  id: number;
  crime_type: string;
  city: string;
  crime_report: string;
}

interface PersonsData {
  id: number;
  name: string;
  age: number;
  ssn: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  eye_color: string;
  hair_color: string;
  car_type: string;
  bike_type: string;
  car_registration_number: string;
  motorbike_registration_number: string;
  annual_income: number;
}

function App() {
  const [tutorialQuery, setTutorialQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<PoliceData[]>([]);
  const [tutorialResult, setTutorialResult] = useState<PersonsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 1. A tutorial, és a 4 query.

  const isCorrect: boolean[] = [false, false, false, false, false];

  const getTutorialQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/PoliceDB", {
        tutorialQuery,
      });
      setTutorialResult(response.data);
      console.log("Response status: ", response.status);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getMyQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/Persons', {
        query
      });
      setResult(response.data);
      console.log("Response status: ", response.status);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn SQLite</h1>
      </header>
      <main>
        <div className="tutorialDiv">
          <form onSubmit={getTutorialQuery}>
            <label htmlFor="tutorial-query-id">Write your SQLite query here:</label>
            <input
              type="text"
              id="tutorial-query-id"
              value={tutorialQuery}
              placeholder="Enter your query"
              onChange={(e) => setTutorialQuery(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>

          {error && <p className="error">{error}</p>}

          {tutorialResult.length > 0 && (
            <table>
              <thead>
                <tr>
                  {tutorialResult[0]?.id !== undefined && <th>ID</th>}
                  {tutorialResult[0]?.crime_type !== undefined && <th>Crime Type</th>}
                  {tutorialResult[0]?.city !== undefined && <th>City</th>}
                  {tutorialResult[0]?.crime_report !== undefined && (
                    <th>Crime Report</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {tutorialResult.map((item, index) => (
                  <tr key={index}>
                    {item?.id !== undefined && <td>{item.id}</td>}
                    {item?.crime_type !== undefined && (
                      <td>{item.crime_type}</td>
                    )}
                    {item?.city !== undefined && <td>{item.city}</td>}
                    {item?.crime_report !== undefined && (
                      <td>{item.crime_report}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="main-div">
          <form action="#" method="post" onSubmit={getMyQuery}>
            <label htmlFor="query-id">Write your query here:</label>
            <input type="text" id="query-id" name="query" placeholder='Enter your query' value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;

/*
  A teszt tábla kész van, a hívás is hozzá.
  SessionStorage-be fogom szerintem menteni az adatokat, és valamilyen pont logika alapján fogom renderelni az aktuális feladatokat, és ha a megfelelő query-t írja be a felhasználó, akkor tovább fogom léptetni.
*/
