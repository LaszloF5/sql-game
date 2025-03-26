import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { createInferTypeNode } from "typescript";

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
    } catch (error) {
      if (error.response) {
        console.error("Hiba történt:", error.response.data.error);
        alert(error.response.data.error);
      }
    }
  };

  const getMyQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/Persons", {
        query,
      });
      setResult(response.data);
      console.log("Response status: ", response.status);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn SQLite</h1>
      </header>
      <main>
        <div className="tutorialDiv">
          <form onSubmit={getTutorialQuery}>
            <label htmlFor="tutorial-query-id">
              Write your SQLite query here:
            </label>
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
                  {tutorialResult[0]?.crime_type !== undefined && (
                    <th>Crime Type</th>
                  )}
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
            <input
              type="text"
              id="query-id"
              name="query"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          {error && <p className="error">{error}</p>}
          {result.length > 0 && (
            <table>
              <thead>
                <tr>
                  {result[0]?.id !== undefined && <td>id</td>}
                  {result[0]?.name !== undefined && <td>name</td>}
                  {result[0]?.age !== undefined && <td>age</td>}
                  {result[0]?.ssn !== undefined && <td>ssn</td>}
                  {result[0]?.gender !== undefined && <td>gender</td>}
                  {result[0]?.email !== undefined && <td>email</td>}
                  {result[0]?.phone !== undefined && <td>phone</td>}
                  {result[0]?.address !== undefined && <td>address</td>}
                  {result[0]?.city !== undefined && <td>city</td>}
                  {result[0]?.eye_color !== undefined && <td>eye color</td>}
                  {result[0]?.hair_color !== undefined && <td>hair color</td>}
                  {result[0]?.car_type !== undefined && <td>car type</td>}
                  {result[0]?.bike_type !== undefined && <td>bike type</td>}
                  {result[0]?.car_registration_number !== undefined && (
                    <td>car registration number</td>
                  )}
                  {result[0]?.motorbike_registration_number !== undefined && (
                    <td>motorbike registration number</td>
                  )}
                  {result[0]?.annual_income !== undefined && (
                    <td>annual income</td>
                  )}
                </tr>
              </thead>

              <tbody>
                {result.map((item, index) => {
                  return (
                    <tr key={index}>
                      {item.id !== undefined && <td>{item.id}</td>}
                      {item.name !== undefined && <td>{item.name}</td>}
                      {item.age !== undefined && <td>{item.age}</td>}
                      {item.ssn !== undefined && <td>{item.ssn}</td>}
                      {item.gender !== undefined && <td>{item.gender}</td>}
                      {item.email !== undefined && <td>{item.email}</td>}
                      {item.phone !== undefined && <td>{item.phone}</td>}
                      {item.address !== undefined && <td>{item.address}</td>}
                      {item.city !== undefined && <td>{item.city}</td>}
                      {item.eye_color !== undefined && (
                        <td>{item.eye_color}</td>
                      )}
                      {item.hair_color !== undefined && (
                        <td>{item.hair_color}</td>
                      )}
                      {item.car_type !== undefined && <td>{item.car_type}</td>}
                      {item.bike_type !== undefined && (
                        <td>{item.bike_type}</td>
                      )}
                      {item.car_registration_number !== undefined && (
                        <td>{item.car_registration_number}</td>
                      )}
                      {item.motorbike_registration_number !== undefined && (
                        <td>{item.motorbike_registration_number}</td>
                      )}
                      {item.annual_income !== undefined && (
                        <td>{item.annual_income}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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
