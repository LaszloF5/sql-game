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

  /*
  1. SELECT gender
  2. AVG age + AS
  3. WHERE
  4. % operator and car_registration_number
  5. 2 table connect
  */

  // Temporary settings !!!!
 
   const [isVisibleTutorial, setIsVisibleTutorial] = useState<boolean>(false);
   const [isVisibleTask, setIsVisibleTask] = useState<boolean>(true);

  const [tutorial0, setTutorial0] = useState<boolean>(true);
  const [tutorial1, setTutorial1] = useState<boolean>(false);
  const [tutorial2, setTutorial2] = useState<boolean>(false);
  const [tutorial3, setTutorial3] = useState<boolean>(false);
  const [tutorial4, setTutorial4] = useState<boolean>(false);
  const [tutorial5, setTutorial5] = useState<boolean>(false);

  // Task

  const [task0, setTask0] = useState<boolean>(true);
  const [task1, setTask1] = useState<boolean>(false);
  const [task2, setTask2] = useState<boolean>(false);
  const [task3, setTask3] = useState<boolean>(false);
  const [task4, setTask4] = useState<boolean>(false);
  const [task5, setTask5] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    setIsVisibleTutorial(false);
    setIsVisibleTask(true);
  }

  const tutorial1Text: string = `Select lekérdezés oszlopok szerint. A SELECT * FROM Police_db -vel az összes oszlopot lekérdezzük. Próbáld ki. 
  Ha sikerült, a * helyére írd be a city -t, mivel csak a city oszlopot szeretnénk most lekérdezni. Ha a lekérdezés megegyezik a SELECT city FROM Police_db -vel akkor továbbengedjük.`;
  const tutorial2Text: string = `Select lekérdezés avg-vel kombinálva. Most az előzőhöz hasonlóan a SELECT-et kell használni, viszont kiegészítjük az AVG() -vel. A zárójelek közé azok az oszlopok kerülnek, melyeknek az átlagára vagyunk kíváncsiak. Nézzük meg az id-k átlagát ebben a lekérdezésben. Nevezzük el a megjeleníteni kívánt oszlopot id-nek. Ez az AVG() AS id vel tudod megtenni. Ha a lekérdezés megegyzik a SELECT AVG(id) AS id FROM Police_db -vel, akkor továbbengedjük.`;
  const tutorial3Text: string = `Derítsd ki, hogy található-e olyan oszlop, ahol az id nagyobb mint a te életkorod. Csak az id oszlop jelenjen meg. A SELECT id from Police_Db lekérdezésedet a WHERE id > 'A te életkorod' résszel egészítsd ki. Ha a lekérdezés megegyezik a SELECT * from Police_db WHERE id > 28`;

  // Ezt az életkoros dolgot valszeg úgy kell majd megoldani, hogy ??? ööö majd kiokoskodom.

  const tutorial4Text: string = `Listázz ki 10 bűnügyi jelentést. Csak a bűnügyi jelentések jelenjenek meg. Ennek a lekérdezésnek a megírásához már majdnem minden tudás a rendelkezésedre áll. A 10 jelentés megjelenítéséhez használd a lekérdezés végén a LIMIT 10 utasítást.
  Ha a lekérdezés megegyezik a SELECT crime_report from Police_db LIMIT 10 -el, akkor továbbengedjük.
  `;

  const tutorial5Text: string = `Keresd meg az összes olyan várost, ami Lake szóval kezdődik. Ehhez segítségedre lesz a LIKE 'Lake%' operátor. 
  Ha a lekérdezés megegyezik a SELECT city FROM Police_db WHERE city LIKE 'Lake%' -el, akkor továbbengedjük.
  `;

  const task1Text: string = `Első lekérdezés`;
  const task2Text: string = `Második lekérdezés`;
  const task3Text: string = `Harmadik lekérdezés`;
  const task4Text: string = `Negyedik lekérdezés`;
  const solutionText: string = `Visit`;

  const getTutorialQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/PoliceDB", {
        tutorialQuery,
      });
      console.log("Server Response:", response.data);
      if (response.status === 200) {
        console.log("Check your dev tools for more details. (ctlr + shift + i");
      }
      setTutorialResult(response.data);
      console.log("Response status: ", response.status);
      if (tutorialQuery === `SELECT city FROM Police_db`) {
        console.log('Go to tutorial 2.');
        setTutorial0(false);
        setTutorial1(true);
      }
      if (tutorialQuery === `SELECT AVG(id) AS id FROM Police_db`) {
        console.log('Go to tutorial 3.');
        setTutorial1(false);
        setTutorial2(true);
      }
      if (tutorialQuery === `SELECT * from Police_db WHERE id > 28`) {
        console.log('Go to tutorial 4.');
        setTutorial2(false);
        setTutorial3(true);
      }
      if (tutorialQuery === `SELECT crime_report from Police_db LIMIT 10`) {
        console.log('Go to tutorial 5.');
        setTutorial3(false);
        setTutorial4(true);
      }
      if (tutorialQuery === `SELECT city FROM Police_db WHERE city LIKE 'Lake%'`) {
        console.log('Go to the real task.');
        setTutorial5(true);
      }

    } catch (error) {
      if (error.response) {
        console.error("Hiba történt:", error.response.data.error);
        alert(error.response.data.error);
      }
    }
  };

  // Persons queries

  const getMyQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/Persons", {
        query,
      });
      console.log("Server Response:", response.data);
      if (response.status === 200) {
        console.log("Check your dev tools for more details. (ctlr + shift + i");
      }
      setResult(response.data);
      console.log("Response status: ", response.status);
      console.log(response.data);
      if (query === `SELECT * FROM Persons WHERE gender = 'male'`) {
        console.log('Go to the second witness testimony.');
        setTask0(false);
        setTask1(true);
      }
      if (query === `SELECT AVG(age) AS age FROM Persons`) {
        console.log('Go to the third witness testimony.');
        setTask1(false);
        setTask2(true);
      }
      if (query === `SELECT AVG(annual_income) as annual_income from Persons`) {
        console.log('Go to the fourth witness testimony.');
        setTask2(false);
        setTask3(true);
      }
      if (query === `SELECT car_type from Persons JOIN zoo ON Persons.id = Zoo.person_id WHERE car_type LIKE '%Taurus' AND Zoo.ticket_type = 'vip'`) {
        console.log('Go to the verification query.');
        setTask3(false);
        setTask4(true);
      }
      if (query === `SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE Persons.age > 48 AND Persons.gender = 'male' AND Persons.annual_income < 490280 AND Persons.car_type LIKE '%Taurus' AND Zoo.ticket_type = 'vip'`) {
        console.log('GGWP.');
        setTask4(false);
        setTask5(true);
      }

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
        {isVisibleTutorial && <div className="tutorialDiv">
          {tutorial0 && <form className='tutorial-form' onSubmit={getTutorialQuery}>
            <label className='tutorial-form_label' htmlFor="tutorial-query-id">{tutorial1Text}</label>
            <input
            className='tutorial-form_input'
              type="text"
              id="tutorial-query-id"
              value={tutorialQuery}
              placeholder="Write your solution..."
              onChange={(e) => setTutorialQuery(e.target.value)}
            />
            <button className='tutorial-form_button' type="submit">Submit</button>
          </form>}

          {error && <p className="error">{error}</p>}
          {tutorial1 && (
            <div>
              <p>Tutorial 1 kész.</p>
              <form className='tutorial-form' onSubmit={getTutorialQuery}>
                <label className='tutorial-form_label' htmlFor="tutorial-query-id">{tutorial2Text}</label>
                <input
                className='tutorial-form_input'
                  type="text"
                  id="tutorial-query-id"
                  value={tutorialQuery}
                  placeholder="Write your solution..."
                  onChange={(e) => setTutorialQuery(e.target.value)}
                />
                <button className='tutorial-form_button' type="submit">Submit</button>
              </form>
            </div>
          )}
          {tutorial2 && (
            <div>
              <p>Tutorial 2 kész.</p>
              <form className='tutorial-form' onSubmit={getTutorialQuery}>
                <label className='tutorial-form_label' htmlFor="tutorial-query-id">{tutorial3Text}</label>
                <input
                className='tutorial-form_input'
                  type="text"
                  id="tutorial-query-id"
                  value={tutorialQuery}
                  placeholder="Write your solution..."
                  onChange={(e) => setTutorialQuery(e.target.value)}
                />
                <button className='tutorial-form_button' type="submit">Submit</button>
              </form>
            </div>
          )}
          {tutorial3 && (
            <div>
              <p>Tutorial 3 kész.</p>
              <form className='tutorial-form' onSubmit={getTutorialQuery}>
                <label className='tutorial-form_label' htmlFor="tutorial-query-id">{tutorial4Text}</label>
                <input
                className='tutorial-form_input'
                  type="text"
                  id="tutorial-query-id"
                  value={tutorialQuery}
                  placeholder="Write your solution..."
                  onChange={(e) => setTutorialQuery(e.target.value)}
                />
                <button className='tutorial-form_button' type="submit">Submit</button>
              </form>
            </div>
          )}
          {tutorial4 && (
            <div>
              <p>Tutorial 4 kész.</p>
              <form className='tutorial-form' onSubmit={getTutorialQuery}>
                <label className='tutorial-form_label' htmlFor="tutorial-query-id">{tutorial5Text}</label>
                <input
                className='tutorial-form_input'
                  type="text"
                  id="tutorial-query-id"
                  value={tutorialQuery}
                  placeholder="Write your solution..."
                  onChange={(e) => setTutorialQuery(e.target.value)}
                />
                <button className='tutorial-form_button' type="submit">Submit</button>
              </form>
            </div>
          )}
          {tutorial5 && (
            <div>
              <p>Tutorial 5 kész.</p>
              <p>Sikeresen teljesítetted a tutorialt, nézzük a feladatot.</p>
              <button onClick={toggleVisibility}>Tovább a feladathoz.</button>
            </div>
          )}

          {tutorialResult.length > 0 && (
            <table className='tutorial-table'>
              <thead className='tutorial-table_thead'>
                <tr className='tutorial-table_tr'>
                  {tutorialResult[0]?.id !== undefined && <th className='tutorial-table_th'>ID</th>}
                  {tutorialResult[0]?.crime_type !== undefined && (
                    <th className='tutorial-table_th'>Crime Type</th>
                  )}
                  {tutorialResult[0]?.city !== undefined && <th className='tutorial-table_th'>City</th>}
                  {tutorialResult[0]?.crime_report !== undefined && (
                    <th className='tutorial-table_th'>Crime Report</th>
                  )}
                </tr>
              </thead>
              <tbody className='tutorial-table_tbody'>
                {tutorialResult.map((item, index) => (
                  <tr className='tutorial-table_tr' key={index}>
                    {item?.id !== undefined && <td>{item.id}</td>}
                    {item?.crime_type !== undefined && (
                      <td className='tutorial-table_td'>{item.crime_type}</td>
                    )}
                    {item?.city !== undefined && <td className='tutorial-table_td'>{item.city}</td>}
                    {item?.crime_report !== undefined && (
                      <td className='tutorial-table_td'>{item.crime_report}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>}
        { isVisibleTask && <div className="main-div">
         {task0 && <form className='task-form' action="#" method="post" onSubmit={getMyQuery}>
            <label className='task-form_label' htmlFor="query-id">{task1Text}</label>
            <input
            className='task-form_input'
              type="text"
              id="query-id"
              name="query"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='task-form_button' type="submit">Submit</button>
          </form>}
         {task1 && <form className='task-form' action="#" method="post" onSubmit={getMyQuery}>
            <label className='task-form_label' htmlFor="query-id">{task2Text}</label>
            <input
            className='task-form_input'
              type="text"
              id="query-id"
              name="query"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='task-form_button' type="submit">Submit</button>
          </form>}
         {task2 && <form className='task-form' action="#" method="post" onSubmit={getMyQuery}>
            <label className='task-form_label' htmlFor="query-id">{task3Text}</label>
            <input
            className='task-form_input'
              type="text"
              id="query-id"
              name="query"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='task-form_button' type="submit">Submit</button>
          </form>}
         {task3 && <form className='task-form' action="#" method="post" onSubmit={getMyQuery}>
            <label className='task-form_label' htmlFor="query-id">{task4Text}</label>
            <input
            className='task-form_input'
              type="text"
              id="query-id"
              name="query"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='task-form_button' type="submit">Submit</button>
          </form>}
         {task4 && <form className='task-form' action="#" method="post" onSubmit={getMyQuery}>
            <label className='task-form_label' htmlFor="query-id">{solutionText}</label>
            <input
            className='task-form_input'
              type="text"
              id="query-id"
              name="query"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='task-form_button' type="submit">Submit</button>
          </form>}
         {task5 && <p>GGWP</p>}
          {error && <p className="error">{error}</p>}
          {result.length > 0 && (
            <table className='task-table'>
              <thead className='task-table_thead'>
                <tr className='task-table_tr'>
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
                  {result[0]?.hair_color !== undefined && <td className='task-table_td'>hair color</td>}
                  {result[0]?.car_type !== undefined && <td className='task-table_td'>car type</td>}
                  {result[0]?.bike_type !== undefined && <td className='task-table_td'>bike type</td>}
                  {result[0]?.car_registration_number !== undefined && (
                    <td className='task-table_td'>car registration number</td>
                  )}
                  {result[0]?.motorbike_registration_number !== undefined && (
                    <td className='task-table_td'>motorbike registration number</td>
                  )}
                  {result[0]?.annual_income !== undefined && (
                    <td className='task-table_td'>annual income</td>
                  )}
                </tr>
              </thead>

              <tbody className='task-table_tbody'>
                {result.map((item, index) => {
                  return (
                    <tr className='task-table_tr' key={index}>
                      {item.id !== undefined && <td className='task-table_td'>{item.id}</td>}
                      {item.name !== undefined && <td className='task-table_td'>{item.name}</td>}
                      {item.age !== undefined && <td className='task-table_td'>{item.age}</td>}
                      {item.ssn !== undefined && <td className='task-table_td'>{item.ssn}</td>}
                      {item.gender !== undefined && <td className='task-table_td'>{item.gender}</td>}
                      {item.email !== undefined && <td className='task-table_td'>{item.email}</td>}
                      {item.phone !== undefined && <td className='task-table_td'>{item.phone}</td>}
                      {item.address !== undefined && <td className='task-table_td'>{item.address}</td>}
                      {item.city !== undefined && <td className='task-table_td'>{item.city}</td>}
                      {item.eye_color !== undefined && (
                        <td className='task-table_td'>{item.eye_color}</td>
                      )}
                      {item.hair_color !== undefined && (
                        <td className='task-table_td'>{item.hair_color}</td>
                      )}
                      {item.car_type !== undefined && <td className='task-table_td'>{item.car_type}</td>}
                      {item.bike_type !== undefined && (
                        <td className='task-table_td'>{item.bike_type}</td>
                      )}
                      {item.car_registration_number !== undefined && (
                        <td className='task-table_td'>{item.car_registration_number}</td>
                      )}
                      {item.motorbike_registration_number !== undefined && (
                        <td className='task-table_td'>{item.motorbike_registration_number}</td>
                      )}
                      {item.annual_income !== undefined && (
                        <td className='task-table_td'>{item.annual_income}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>}
      </main>
    </div>
  );
}

export default App;

/*
  A teszt tábla kész van, a hívás is hozzá.
  SessionStorage-be fogom szerintem menteni az adatokat, és valamilyen pont logika alapján fogom renderelni az aktuális feladatokat, és ha a megfelelő query-t írja be a felhasználó, akkor tovább fogom léptetni.

  Csinálni kell 1 kis note részt, ahova a felhasználó feltudja jegyezni magának a kis adatokat, hogy a végső lekérdezésbe betudja írni az adatokat. Pl.: avg(age), income stb.
*/
