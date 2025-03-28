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
  const showMe: string = "Show me the answer!";

  // Temporary settings !!!!

  const [isVisibleTutorial, setIsVisibleTutorial] = useState<boolean>(false);
  const [isVisibleTask, setIsVisibleTask] = useState<boolean>(true);

  /****** Tutorial section settings, and datas. ******/

  const [activeTutorial, setActiveTutorial] = useState<number>(0);

  const toggleTutorial = (tutorialNumber: number) => {
    setActiveTutorial(tutorialNumber);
  };

  const toggleVisibility = (): void => {
    setIsVisibleTutorial(false);
    setIsVisibleTask(true);
  };

  const [tutorial0, setTutorial0] = useState<boolean>(true);
  const [tutorial1, setTutorial1] = useState<boolean>(false);
  const [tutorial2, setTutorial2] = useState<boolean>(false);
  const [tutorial3, setTutorial3] = useState<boolean>(false);
  const [tutorial4, setTutorial4] = useState<boolean>(false);
  const [tutorial5, setTutorial5] = useState<boolean>(false);

  const tutorial1Solution: string = `SELECT city FROM Police_db`;
  const tutorial2Solution: string = `SELECT AVG(id) AS id FROM Police_db`;
  const tutorial3Solution: string = `SELECT id FROM Police_db WHERE id > 50`;
  const tutorial4Solution: string = `SELECT crime_report from Police_db LIMIT 10`;
  const tutorial5Solution: string = `SELECT city FROM Police_db WHERE city LIKE 'Lake%'`;

  const tutorial1Text: string = `Select lekérdezés oszlopok szerint. \n A SELECT * FROM Police_db -vel az összes oszlopot lekérdezzük. Próbáld ki. Ha sikerült, a * helyére írd be a city -t, mivel csak a city oszlopot szeretnénk most lekérdezni.`;
  const tutorial2Text: string = `Select lekérdezés avg-vel kombinálva. \n Most az előzőhöz hasonlóan a SELECT-et kell használni, viszont kiegészítjük az AVG() -vel. A zárójelek közé annak az oszlopnak a neve kerül, amelyiknek az átlagára kíváncsiak vagyunk. Nézzük meg az id-k átlagát ebben a lekérdezésben. Nevezzük el a megjeleníteni kívánt oszlopot id-nek. Ez az AVG() után AS id vel tudod megtenni.`;
  const tutorial3Text: string = `Derítsd ki, hogy található-e olyan oszlop, ahol az id nagyobb mint 50. \n Csak az id oszlop jelenjen meg. A SELECT id from Police_Db lekérdezést a WHERE id > 50 -el folytasd.`;
  const tutorial4Text: string = `Listázz ki 10 bűnügyi jelentést. \n Csak a bűnügyi jelentések jelenjenek meg. Ennek a lekérdezésnek a megírásához már majdnem minden tudás a rendelkezésedre áll. A 10 jelentés megjelenítéséhez használd a lekérdezés végén a LIMIT 10 utasítást.
  `;

  const tutorial5Text: string = `Keresd meg az összes olyan várost, ami Lake szóval kezdődik. \n Ehhez segítségedre lesz a LIKE 'Lake%' operátor, amit a WHERE után kell írnod.
  `;

  /****** Task section settings, and datas. ******/

  const [activeTask, setActiveTask] = useState<number>(0);

  const toggleTask = (taskNumber: number) => {
    setActiveTask(taskNumber);
  };

  const [task0, setTask0] = useState<boolean>(true);
  const [task1, setTask1] = useState<boolean>(false);
  const [task2, setTask2] = useState<boolean>(false);
  const [task3, setTask3] = useState<boolean>(false);
  const [task4, setTask4] = useState<boolean>(false);
  const [task5, setTask5] = useState<boolean>(false);

  const task1Solution: string = `SELECT * FROM Persons WHERE gender = 'male'`;
  const task2Solution: string = `SELECT AVG(age) AS age FROM Persons`;
  const task3Solution: string = `SELECT AVG(annual_income) AS annual_income from Persons`;
  const task4Solution: string = `SELECT car_type from Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE car_type LIKE '%Taurus' AND Zoo.ticket_type = 'vip'`;
  const task5Solution: string = `SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.Person_id WHERE gender = 'male' AND age > 49 AND annual_income < 490281 AND car_type LIKE '%Taurus' AND ticket_type = 'vip'`;

  const task1Text: string =
    "Első lekérdezés \n Az első tanú egy férfit látott, de az arcát nem tudta megnézni közelebbről. Viszont határozottan állította, hogy a neme férfi. Ez szerencsére már egy kiindulópont. \n Keresd meg az összes férfit a Persons táblában, és listázd ki az összes oszlopot.";
  const task2Text: string = `Második lekérdezés \n A második tanú is látta a férfit, viszont észrevette hogy a mozgása lassú volt, és a szakálla és haja is ősz volt. Valószínű hogy az átlagnál idősebb volt a férfi. \n Derítsd ki az összes ember átlagéletkorát a Persons táblába. Az átlagéletkort AS age ként jelenítsd meg a táblázatban.`;
  const task3Text: string = `Harmadik lekérdezés \n A harmadik tanú látta, hogy rosszul öltözött volt a férfi. Az átlagnál biztos hogy kevesebb jövedelemmel rendelkezik. \n Derítsd ki, hogy mennyi a Persons táblában lévő emberek átlagkeresete. Csak az átlagkereset oszlopot jelenítsd meg. Jegyezd fel a lekérdezés eredményét.`;
  const task4Text: string = `Negyedik lekérdezés \n A negyedik tanú nem látta az autó márkáját, csak a típusát, ami Taurus volt. A helyszíntől nem messze parkolt, amibe az idős férfi sietve szállt be. A karján zöld karszalag volt, pont olyan mint amilyet az állatkertben adnak a VIP jegyet vásárlóknak. \n Derítsd ki, hogy kiknek van Taurus típusú autójuk, és kik voltak az állatkertben, akik VIP jegyet vásároltak. Segítségedre lesz az alábbi lekérdezés, neked csak folytatnod kell: \n SELECT car_type from Persons JOIN zoo ON Persons.id = Zoo.person_id WHERE`;
  const task5Text: string = `Kombináld össze a WHERE után az előző lekérdezésben összegyűjtött adatokat és lekérdezési feltételeket. \n(Mivel a két táblában nincsenek azonos oszlopok, ezért a WHERE után NEM kell a táblák oszlopait megnevezni így: Persons.age, elég az age -oszlop) Folytasd a következő lekérdezést: \nSELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.Person_id WHERE `;

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
        console.log("Go to tutorial 2.");
        setTutorial0(false);
        setTutorial1(true);
      }
      if (tutorialQuery === `SELECT AVG(id) AS id FROM Police_db`) {
        console.log("Go to tutorial 3.");
        setTutorial1(false);
        setTutorial2(true);
      }
      if (tutorialQuery === `SELECT id FROM Police_db WHERE id > 50`) {
        console.log("Go to tutorial 4.");
        setTutorial2(false);
        setTutorial3(true);
      }
      if (tutorialQuery === `SELECT crime_report from Police_db LIMIT 10`) {
        console.log("Go to tutorial 5.");
        setTutorial3(false);
        setTutorial4(true);
      }
      if (
        tutorialQuery.replace(/"/g, "'") ===
        `SELECT city FROM Police_db WHERE city LIKE 'Lake%'`
      ) {
        console.log("Go to the real task.");
        setTutorial4(false);
        setTutorial5(true);
      }
      setTutorialQuery("");
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
      if (
        query.replace(/"/g, "'") ===
        `SELECT * FROM Persons WHERE gender = 'male'`
      ) {
        console.log("Go to the second witness testimony.");
        setTask0(false);
        setTask1(true);
      }
      if (query === `SELECT AVG(age) AS age FROM Persons`) {
        console.log("Go to the third witness testimony.");
        setTask1(false);
        setTask2(true);
      }
      if (query === `SELECT AVG(annual_income) AS annual_income from Persons`) {
        console.log("Go to the fourth witness testimony.");
        setTask2(false);
        setTask3(true);
      }
      if (
        query.replace(/"/g, "'") ===
        `SELECT car_type from Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE car_type LIKE '%Taurus' AND Zoo.ticket_type = 'vip'`
      ) {
        console.log("Go to the verification query.");
        setTask3(false);
        setTask4(true);
      }
      if (
        query.replace(/"/g, "'") ===
        `SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.Person_id WHERE gender = 'male' AND age > 49 AND annual_income < 490281 AND car_type LIKE '%Taurus' AND ticket_type = 'vip'`
      ) {
        console.log("GGWP.");
        setTask4(false);
        setTask5(true);
      }
      setQuery("");
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
        {isVisibleTutorial && (
          <div className="tutorialDiv">
            {tutorial0 && (
              <form className="tutorial-form" onSubmit={getTutorialQuery}>
                <label
                  className="tutorial-form_label"
                  htmlFor="tutorial-query-id"
                >
                  <p className="text-style">{tutorial1Text}</p>
                  <button
                    className="showMe-btn"
                    type="button"
                    onClick={() => toggleTutorial(1)}
                  >
                    {showMe}
                  </button>
                  {activeTutorial === 1 && <pre>{tutorial1Solution}</pre>}
                </label>
                <input
                  className="tutorial-form_input"
                  type="text"
                  id="tutorial-query-id"
                  value={tutorialQuery}
                  placeholder="Write your solution..."
                  onChange={(e) => setTutorialQuery(e.target.value)}
                />
                <button className="tutorial-form_button" type="submit">
                  Submit
                </button>
              </form>
            )}

            {error && <p className="error">{error}</p>}
            {tutorial1 && (
              <div>
                <p>Tutorial 1 kész.</p>
                <form className="tutorial-form" onSubmit={getTutorialQuery}>
                  <label
                    className="tutorial-form_label"
                    htmlFor="tutorial-query-id"
                  >
                    <p className="text-style">{tutorial2Text}</p>
                    <button
                      className="showMe-btn"
                      type="button"
                      onClick={() => toggleTutorial(2)}
                    >
                      {showMe}
                    </button>
                    {activeTutorial === 2 && <pre>{tutorial2Solution}</pre>}
                  </label>
                  <input
                    className="tutorial-form_input"
                    type="text"
                    id="tutorial-query-id"
                    value={tutorialQuery}
                    placeholder="Write your solution..."
                    onChange={(e) => setTutorialQuery(e.target.value)}
                  />
                  <button className="tutorial-form_button" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            )}
            {tutorial2 && (
              <div>
                <p>Tutorial 2 kész.</p>
                <form className="tutorial-form" onSubmit={getTutorialQuery}>
                  <label
                    className="tutorial-form_label"
                    htmlFor="tutorial-query-id"
                  >
                    <p className="text-style">{tutorial3Text}</p>
                    <button
                      className="showMe-btn"
                      type="button"
                      onClick={() => toggleTutorial(3)}
                    >
                      {showMe}
                    </button>
                    {activeTutorial === 3 && <pre>{tutorial3Solution}</pre>}
                  </label>
                  <input
                    className="tutorial-form_input"
                    type="text"
                    id="tutorial-query-id"
                    value={tutorialQuery}
                    placeholder="Write your solution..."
                    onChange={(e) => setTutorialQuery(e.target.value)}
                  />
                  <button className="tutorial-form_button" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            )}
            {tutorial3 && (
              <div>
                <p>Tutorial 3 kész.</p>
                <form className="tutorial-form" onSubmit={getTutorialQuery}>
                  <label
                    className="tutorial-form_label"
                    htmlFor="tutorial-query-id"
                  >
                    <p className="text-style">{tutorial4Text}</p>
                    <button
                      className="showMe-btn"
                      type="button"
                      onClick={() => toggleTutorial(4)}
                    >
                      {showMe}
                    </button>
                    {activeTutorial === 4 && <pre>{tutorial4Solution}</pre>}
                  </label>
                  <input
                    className="tutorial-form_input"
                    type="text"
                    id="tutorial-query-id"
                    value={tutorialQuery}
                    placeholder="Write your solution..."
                    onChange={(e) => setTutorialQuery(e.target.value)}
                  />
                  <button className="tutorial-form_button" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            )}
            {tutorial4 && (
              <div>
                <p>Tutorial 4 kész.</p>
                <form className="tutorial-form" onSubmit={getTutorialQuery}>
                  <label
                    className="tutorial-form_label"
                    htmlFor="tutorial-query-id"
                  >
                    <p className="text-style">{tutorial5Text}</p>
                    <button
                      className="showMe-btn"
                      type="button"
                      onClick={() => toggleTutorial(5)}
                    >
                      {showMe}
                    </button>
                    {activeTutorial === 5 && <pre>{tutorial5Solution}</pre>}
                  </label>
                  <input
                    className="tutorial-form_input"
                    type="text"
                    id="tutorial-query-id"
                    value={tutorialQuery}
                    placeholder="Write your solution..."
                    onChange={(e) => setTutorialQuery(e.target.value)}
                  />
                  <button className="tutorial-form_button" type="submit">
                    Submit
                  </button>
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
              <table className="tutorial-table">
                <thead className="tutorial-table_thead">
                  <tr className="tutorial-table_tr">
                    {tutorialResult[0]?.id !== undefined && (
                      <th className="tutorial-table_th">ID</th>
                    )}
                    {tutorialResult[0]?.crime_type !== undefined && (
                      <th className="tutorial-table_th">Crime Type</th>
                    )}
                    {tutorialResult[0]?.city !== undefined && (
                      <th className="tutorial-table_th">City</th>
                    )}
                    {tutorialResult[0]?.crime_report !== undefined && (
                      <th className="tutorial-table_th">Crime Report</th>
                    )}
                  </tr>
                </thead>
                <tbody className="tutorial-table_tbody">
                  {tutorialResult.map((item, index) => (
                    <tr className="tutorial-table_tr" key={index}>
                      {item?.id !== undefined && <td>{item.id}</td>}
                      {item?.crime_type !== undefined && (
                        <td className="tutorial-table_td">{item.crime_type}</td>
                      )}
                      {item?.city !== undefined && (
                        <td className="tutorial-table_td">{item.city}</td>
                      )}
                      {item?.crime_report !== undefined && (
                        <td className="tutorial-table_td">
                          {item.crime_report}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {isVisibleTask && (
          <div className="main-div">
            {task0 && (
              <form
                className="task-form"
                action="#"
                method="post"
                onSubmit={getMyQuery}
              >
                <label className="task-form_label" htmlFor="query-id">
                  <p className="text-style">{task1Text}</p>
                  <button
                    className="showMe-btn"
                    type="button"
                    onClick={() => toggleTask(1)}
                  >
                    {showMe}
                  </button>
                  {activeTask === 1 && <pre>{task1Solution}</pre>}
                </label>
                <input
                  className="task-form_input"
                  type="text"
                  id="query-id"
                  name="query"
                  placeholder="Enter your query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="task-form_button" type="submit">
                  Submit
                </button>
              </form>
            )}
            {task1 && (
              <form
                className="task-form"
                action="#"
                method="post"
                onSubmit={getMyQuery}
              >
                <label className="task-form_label" htmlFor="query-id">
                  <p className="text-style">{task2Text}</p>
                  <button
                    className="showMe-btn"
                    type="button"
                    onClick={() => toggleTask(2)}
                  >
                    {showMe}
                  </button>
                  {activeTask === 2 && <pre>{task2Solution}</pre>}
                </label>
                <input
                  className="task-form_input"
                  type="text"
                  id="query-id"
                  name="query"
                  placeholder="Enter your query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="task-form_button" type="submit">
                  Submit
                </button>
              </form>
            )}
            {task2 && (
              <form
                className="task-form"
                action="#"
                method="post"
                onSubmit={getMyQuery}
              >
                <label className="task-form_label" htmlFor="query-id">
                  <p className="text-style">{task3Text}</p>
                  <button
                    className="showMe-btn"
                    type="button"
                    onClick={() => toggleTask(3)}
                  >
                    {showMe}
                  </button>
                  {activeTask === 3 && <pre>{task3Solution}</pre>}
                </label>
                <input
                  className="task-form_input"
                  type="text"
                  id="query-id"
                  name="query"
                  placeholder="Enter your query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="task-form_button" type="submit">
                  Submit
                </button>
              </form>
            )}
            {task3 && (
              <form
                className="task-form"
                action="#"
                method="post"
                onSubmit={getMyQuery}
              >
                <label className="task-form_label" htmlFor="query-id">
                  <p className="text-style">{task4Text}</p>
                  <button
                    className="showMe-btn"
                    type="button"
                    onClick={() => toggleTask(4)}
                  >
                    {showMe}
                  </button>
                  {activeTask === 4 && <pre>{task4Solution}</pre>}
                </label>
                <input
                  className="task-form_input"
                  type="text"
                  id="query-id"
                  name="query"
                  placeholder="Enter your query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="task-form_button" type="submit">
                  Submit
                </button>
              </form>
            )}
            {task4 && (
              <form
                className="task-form"
                action="#"
                method="post"
                onSubmit={getMyQuery}
              >
                <label className="task-form_label" htmlFor="query-id">
                  <p className="text-style">{task5Text}</p>
                  <button
                    className="showMe-btn"
                    type="button"
                    onClick={() => toggleTask(5)}
                  >
                    {showMe}
                  </button>
                  {activeTask === 5 && <pre>{task5Solution}</pre>}
                </label>
                <input
                  className="task-form_input"
                  type="text"
                  id="query-id"
                  name="query"
                  placeholder="Enter your query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="task-form_button" type="submit">
                  Submit
                </button>
              </form>
            )}
            {task5 && (
              <p>
                Gratulálok! Sikeresen megoldottad a feladatot. Remélem sikerült
                elsajátítani az SQLite SELECT utasítás alapjait!
              </p>
            )}
            {error && <p className="error">{error}</p>}
            {result.length > 0 && (
              <table className="task-table">
                <thead className="task-table_thead">
                  <tr className="task-table_tr">
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
                    {result[0]?.hair_color !== undefined && (
                      <td className="task-table_td">hair color</td>
                    )}
                    {result[0]?.car_type !== undefined && (
                      <td className="task-table_td">car type</td>
                    )}
                    {result[0]?.bike_type !== undefined && (
                      <td className="task-table_td">bike type</td>
                    )}
                    {result[0]?.car_registration_number !== undefined && (
                      <td className="task-table_td">car registration number</td>
                    )}
                    {result[0]?.motorbike_registration_number !== undefined && (
                      <td className="task-table_td">
                        motorbike registration number
                      </td>
                    )}
                    {result[0]?.annual_income !== undefined && (
                      <td className="task-table_td">annual income</td>
                    )}
                  </tr>
                </thead>

                <tbody className="task-table_tbody">
                  {result.map((item, index) => {
                    return (
                      <tr className="task-table_tr" key={index}>
                        {item.id !== undefined && (
                          <td className="task-table_td">{item.id}</td>
                        )}
                        {item.name !== undefined && (
                          <td className="task-table_td">{item.name}</td>
                        )}
                        {item.age !== undefined && (
                          <td className="task-table_td">
                            {item.age.toFixed()}
                          </td>
                        )}
                        {item.ssn !== undefined && (
                          <td className="task-table_td">{item.ssn}</td>
                        )}
                        {item.gender !== undefined && (
                          <td className="task-table_td">{item.gender}</td>
                        )}
                        {item.email !== undefined && (
                          <td className="task-table_td">{item.email}</td>
                        )}
                        {item.phone !== undefined && (
                          <td className="task-table_td">{item.phone}</td>
                        )}
                        {item.address !== undefined && (
                          <td className="task-table_td">{item.address}</td>
                        )}
                        {item.city !== undefined && (
                          <td className="task-table_td">{item.city}</td>
                        )}
                        {item.eye_color !== undefined && (
                          <td className="task-table_td">{item.eye_color}</td>
                        )}
                        {item.hair_color !== undefined && (
                          <td className="task-table_td">{item.hair_color}</td>
                        )}
                        {item.car_type !== undefined && (
                          <td className="task-table_td">{item.car_type}</td>
                        )}
                        {item.bike_type !== undefined && (
                          <td className="task-table_td">{item.bike_type}</td>
                        )}
                        {item.car_registration_number !== undefined && (
                          <td className="task-table_td">
                            {item.car_registration_number}
                          </td>
                        )}
                        {item.motorbike_registration_number !== undefined && (
                          <td className="task-table_td">
                            {item.motorbike_registration_number}
                          </td>
                        )}
                        {item.annual_income !== undefined && (
                          <td className="task-table_td">
                            {item.annual_income.toFixed()}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

/*

  Csinálni kell 1 kis note részt, ahova a felhasználó feltudja jegyezni magának a kis adatokat, hogy a végső lekérdezésbe betudja írni az adatokat. Pl.: avg(age), income stb.
*/
