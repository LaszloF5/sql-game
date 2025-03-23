import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface PoliceData {
  id: number;
  crime_type: string;
  city: string;
  crime_report: string;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<PoliceData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 1. A tutorial, és a 4 query.

  const isCorrect: boolean[] = [false, false, false, false, false];

  const getMyQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.post("http://localhost:5000/api/PoliceDB", {
        query,
      });
      setResult(response.data);
      console.log(response.data[0]);
    } catch {
      setError("Failed to fetch data");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn SQLite</h1>
      </header>
      <main>
        <form onSubmit={getMyQuery}>
          <label htmlFor="query-id">Write your SQLite query here:</label>
          <input
            type="text"
            id="query-id"
            value={query}
            placeholder="Enter your query"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        {error && <p className="error">{error}</p>}

        {result.length > 0 && (
          <table>
            <thead>
              <tr>
                {result[0]?.id !== undefined && <th>ID</th>}
                {result[0]?.crime_type !== undefined && <th>Crime Type</th>}
                {result[0]?.city !== undefined && <th>City</th>}
                {result[0]?.crime_report !== undefined && <th>Crime Report</th>}
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => (
                <tr key={index}>
                  {item?.id !== undefined && <td>{item.id}</td>}
                  {item?.crime_type !== undefined && <td>{item.crime_type}</td>}
                  {item?.city !== undefined && <td>{item.city}</td>}
                  {item?.crime_report !== undefined && <td>{item.crime_report}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default App;

/*
  A teszt tábla kész van, a hívás is hozzá.
  SessionStorage-be fogom szerintem menteni az adatokat, és valamilyen pont logika alapján fogom renderelni az aktuális feladatokat, és ha a megfelelő query-t írja be a felhasználó, akkor tovább fogom léptetni.
*/
