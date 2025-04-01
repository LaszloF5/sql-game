import React, { FC, useState } from "react";
import axios from "axios";

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

interface SelectTaskProps {
  isVisibleTask: boolean;
  setIsVisibleTask: React.Dispatch<React.SetStateAction<Boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  showMe: string;
  isVisibleOtherTask: boolean;
  setIsVisibleOtherTask: React.Dispatch<React.SetStateAction<Boolean>>;
}

const SelectTaskComponent: FC<SelectTaskProps> = ({
  isVisibleTask,
  setIsVisibleTask,
  error,
  setError,
  showMe,
  isVisibleOtherTask,
  setIsVisibleOtherTask,
}) => {

  const toggleVisibilityOtherQ = (): void => {
    setIsVisibleTask(false);
    setIsVisibleOtherTask(true);
  };
  
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<PersonsData[]>([]);

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
  "Első lekérdezés \n Az első tanú egy férfit látott, de az arcát nem tudta megnézni közelebbről. Viszont határozottan állította, hogy a neme férfi. Ez szerencsére már egy kiindulópont. \n Keresd meg és listázd ki az összes férfit a Persons táblából, az összes oszlop megjelenítésével.";  

const task2Text: string = 
  "Második lekérdezés \n A második tanú észrevette, hogy a férfi mozgása lassú volt, a szakálla és haja pedig ősz. Ez arra utal, hogy az átlagnál idősebb lehetett. \n Derítsd ki a Persons táblában szereplő emberek átlagéletkorát! Az eredményt az age oszlopnév alatt jelenítsd meg a táblázatban.";  

const task3Text: string = 
  "Harmadik lekérdezés \n A harmadik tanú azt mondta, hogy a férfi rosszul öltözött volt, ami arra utal, hogy az átlagnál alacsonyabb jövedelemmel rendelkezik. \n Határozd meg a Persons táblában lévő emberek átlagkeresetét! Az eredménynek csak az átlagkeresetet kell tartalmaznia, az oszlopnév pedig annual_income legyen.";  

const task4Text: string = 
  "Negyedik lekérdezés \n A negyedik tanú nem látta az autó márkáját, csak a típusát: Taurus. A jármű a helyszíntől nem messze parkolt, ahova az idős férfi sietve szállt be. A tanú azt is észrevette, hogy a karján zöld karszalag volt, amelyet az állatkert VIP-jegyet vásárló látogatói kapnak. \n Derítsd ki, kik rendelkeznek Taurus típusú autóval és kik vásároltak VIP jegyet az állatkertben! \n Segítségképpen itt van egy részleges lekérdezés, amelyet neked kell befejezned: \n SELECT car_type FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE";  

const task5Text: string = 
  "Ötödik lekérdezés \n Most kombinálnod kell az eddig összegyűjtött adatokat és lekérdezési feltételeket. \n Keresd meg azokat a személyeket, akik megfelelnek a következő kritériumoknak: férfiak, idősebbek az átlagnál, alacsonyabb keresetűek, Taurus típusú autót vezetnek és VIP jegyet vásároltak az állatkertben. \n Mivel a két tábla oszlopai különböznek, a WHERE feltételben elég az oszlopneveket megadni (például age), nem kell eléjük írni a táblanevet (például Persons.age). \n Folytasd az alábbi lekérdezést: \n SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.Person_id WHERE";  


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
    <div>
      {isVisibleTask && (
        <div className="main-div">
          <div className="notes-container">
            <label htmlFor="notes">Írd ide a jegyzeteidet:</label>
            {isVisibleTask && (
              <textarea
                id="notes"
                cols="10"
                rows="10"
                placeholder="ex.: age = 20"
              ></textarea>
            )}
          </div>
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
            <><p>
              Gratulálok! Sikeresen megoldottad a feladatot. Remélem sikerült
              elsajátítani az SQLite SELECT utasítás alapjait!
            </p>
            <button onClick={toggleVisibilityOtherQ}>Fedezd fel az sqlite többi utasítását is!</button>
            </>
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
                        <td className="task-table_td">{item.age.toFixed()}</td>
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
    </div>
  );
};

export default SelectTaskComponent;
