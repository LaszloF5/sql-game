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
  // Így 100% hogy tiszta lesz a Session tábla.

  const clearSession = async () => {
    try {
      const response = await axios.delete("http://localhost:5000/api/session", {
        data: { otherQuery: "del" },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Sikeres törlés:", response.data);
      return response.data;
    } catch (error) {
      console.error("Hiba a session törlésekor:", {
        status: error.response?.status,
        message: error.response?.data?.error || error.message,
      });
      throw error;
    }
  };

  const toggleVisibilityOtherQ = (): void => {
    clearSession();
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
  const task3Solution: string = `SELECT AVG(annual_income) AS annual_income FROM Persons`;
  const task4Solution: string = `SELECT car_type FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE car_type LIKE '%Taurus' AND ticket_type = 'vip'`;
  const task5Solution: string = `SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.Person_id WHERE gender = 'male' AND age > 49 AND annual_income < 490281 AND car_type LIKE '%Taurus' AND ticket_type = 'vip'`;

  const task1Text: string =
    "First Query \n The first witness saw a man, but he couldn't get a closer look at his face. However, he was certain that the person's gender was male. Fortunately, this gives us a starting point. \n Find and list all men from the Persons table, displaying all columns.";

  const task2Text: string =
    "Second Query \n The second witness noticed that the man's movements were slow, and he had gray hair and a beard. This suggests that he was older than average. \n Determine the average age of the people in the Persons table! Display the result under the column name age in the table.";

  const task3Text: string =
    "Third Query \n The third witness stated that the man was poorly dressed, which suggests that he had a lower-than-average income. \n Determine the average income of the people in the Persons table! The result should only include the average income, and the column name should be annual_income.";

  const task4Text: string =
    "Fourth Query \n The fourth witness did not see the car's brand, only its model: Taurus. The vehicle was parked not far from the scene, where the elderly man hurriedly got in. The witness also noticed that he was wearing a green wristband, which is given to visitors who purchase a VIP ticket at the zoo. \n Find out who owns a Taurus model car and who has purchased a VIP ticket at the zoo! \n As a hint, here is a partial query that you need to complete: \n SELECT car_type FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE";

  const task5Text: string =
    "Fifth Query \n Now you need to combine the collected data and query conditions. \n Find the individuals who meet the following criteria: male, older than average, lower income, drive a Taurus model car, and have purchased a VIP ticket at the zoo. \n Since the columns of the two tables differ, in the WHERE condition, it is sufficient to specify the column names (e.g., age) without prefixing them with the table name (e.g., Persons.age). \n Continue the following query: \n SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.Person_id WHERE";

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
        query.trim().replace(/"/g, "'") ===
        `SELECT * FROM Persons WHERE gender = 'male'`
      ) {
        console.log("Go to the second witness testimony.");
        setTask0(false);
        setTask1(true);
      }
      if (query.trim() === `SELECT AVG(age) AS age FROM Persons`) {
        console.log("Go to the third witness testimony.");
        setTask1(false);
        setTask2(true);
      }
      if (
        query.trim() ===
        `SELECT AVG(annual_income) AS annual_income FROM Persons`
      ) {
        console.log("Go to the fourth witness testimony.");
        setTask2(false);
        setTask3(true);
      }
      if (
        query.trim().replace(/"/g, "'") ===
        `SELECT car_type FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE car_type LIKE '%Taurus' AND ticket_type = 'vip'`
      ) {
        console.log("Go to the verification query.");
        setTask3(false);
        setTask4(true);
      }
      if (
        query.trim().replace(/"/g, "'") ===
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
            <>
              <p>
                Congratulations! You have successfully completed the task. I
                hope you have mastered the basics of the SQLite SELECT
                statement!
              </p>
              <button
                className="task-form_button"
                onClick={toggleVisibilityOtherQ}
              >
                Discover other sqlite commands!{" "}
              </button>
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
