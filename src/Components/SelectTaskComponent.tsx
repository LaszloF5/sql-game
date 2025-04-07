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
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  secondPartStory: boolean;
  setSecondPartStory: React.Dispatch<React.SetStateAction<boolean>>;
  task0: boolean;
  task1: boolean;
  task2: boolean;
  task3: boolean;
  task4: boolean;
  task5: boolean;
  setTask0: React.Dispatch<React.SetStateAction<Boolean>>;
  setTask1: React.Dispatch<React.SetStateAction<Boolean>>;
  setTask2: React.Dispatch<React.SetStateAction<Boolean>>;
  setTask3: React.Dispatch<React.SetStateAction<Boolean>>;
  setTask4: React.Dispatch<React.SetStateAction<Boolean>>;
  setTask5: React.Dispatch<React.SetStateAction<Boolean>>;
  errorText: string | null;
  setErrorText: React.Dispatch<React.SetStateAction<string | null>>;
  importantRules: string;
  isVisibleTask: boolean;
  setIsVisibleTask: React.Dispatch<React.SetStateAction<Boolean>>;
  showMe: string;
  setIsVisibleOtherTask: React.Dispatch<React.SetStateAction<Boolean>>;
  setOtherTask0: React.Dispatch<React.SetStateAction<boolean>>;
  percentage: number;
  setPercentage: React.Dispatch<React.SetStateAction<number>>;
}

const SelectTaskComponent: FC<SelectTaskProps> = ({
  isDisabled,
  setIsDisabled,
  secondPartStory,
  setSecondPartStory,
  task0,
  task1,
  task2,
  task3,
  task4,
  task5,
  setTask0,
  setTask1,
  setTask2,
  setTask3,
  setTask4,
  setTask5,
  errorText,
  setErrorText,
  importantRules,
  isVisibleTask,
  setIsVisibleTask,
  showMe,
  setIsVisibleOtherTask,
  setOtherTask0,
  percentage,
  setPercentage,
}) => {
  const continueStory: string = `After going through the police database, something didn't add up. The data you were working with seemed to be fake. \n
“Wait a minute… something's not right. The city's police force is the most corrupt institution. The data has been tampered with,” came the message. \n
Fortunately, a hacker who saw through the system shared the real witness testimonies with you, revealing the true identity of the criminal. \n
You're now just a few steps away from exposing the criminal who's been evading the authorities for years.`;

  const endOfTheStory: string = `Well done, detective! \n
You uncovered the one behind the crime — something no one has solved for years. \n
The city can finally breathe easy. Justice has been served. \n
Case closed.`;

  const continueGame = () => {
    setSecondPartStory(false);
    setTask0(true);
    setIsVisibleTask(true);
  };

  const clearSession = async () => {
    try {
      const response = await axios.delete("https://sql-game-sd9w.onrender.com/api/session", {
        data: { formattedQuery: "del" },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (!navigator.onLine) {
        const msg =
          "No internet connection. Please check your network settings.";
        setErrorText(msg);
        alert(msg);
        return;
      }
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const serverMsg =
            error.response.data?.error || "An error occurred on the server.";
          console.error("Server responded with an error: ", serverMsg);
          setErrorText(serverMsg);
          alert(serverMsg);
        } else if (error.request) {
          console.error("No response received from server.");
          setErrorText(
            "No response received from server. Please try again later."
          );
          alert("No response received from server. Please try again later.");
        } else {
          console.error("An error occurred:", error.message);
          setErrorText("An error occurred. Please try again later.");
          alert("An error occurred.");
        }
      }
    }
  };

  const toggleVisibilityOtherQ = (): void => {
    setPercentage(0);
    clearSession();
    setIsVisibleTask(false);
    setIsVisibleOtherTask(true);
    setOtherTask0(true);
  };

  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<PersonsData[]>([]);
  const successText: string = `Congratulations! You have successfully completed the task. \n
  I hope you have mastered the basics of the SQLite SELECT statement!`;

  const [activeTask, setActiveTask] = useState<number>(0);

  const toggleTask = (taskNumber: number) => {
    setActiveTask(taskNumber);
  };

  const task1Solution: string = `SELECT * FROM Persons WHERE gender = 'male'`;
  const task2Solution: string = `SELECT AVG(age) AS age FROM Persons`;
  const task3Solution: string = `SELECT AVG(annual_income) AS annual_income FROM Persons`;
  const task4Solution: string = `SELECT car_type FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE car_type LIKE '%Taurus' AND ticket_type = 'vip'`;
  const task5Solution: string = `SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE gender = 'male' AND age > 49 AND annual_income < 490281 AND car_type LIKE '%Taurus' AND ticket_type = 'vip'`;

  const task1Text: string =
    "First Query \n The first witness saw a man, but he couldn't get a closer look at his face. However, he was certain that the person's gender was male. Fortunately, this gives us a starting point. \n Find and list all men from the Persons table, displaying all columns.";

  const task2Text: string =
    "Second Query \n The second witness noticed that the man's movements were slow, and he had gray hair and a beard. This suggests that he was older than average. \n Determine the average age of the people in the Persons table! Display the result under the column name age in the table.";

  const task3Text: string =
    "Third Query \n The third witness stated that the man was poorly dressed, which suggests that he had a lower-than-average income. \n Determine the average income of the people in the Persons table! The result should only include the average income, and the column name should be annual_income.";

  const task4Text: string =
    "Fourth Query \n The fourth witness did not see the car's brand, only its model: Taurus. The vehicle was parked not far from the scene, where the elderly man hurriedly got in. The witness also noticed that he was wearing a green wristband, which is given to visitors who purchase a vip ticket at the zoo. \n Find out who owns a Taurus model car and has purchased a vip ticket at the zoo!  \n Since the columns in the two tables are different, it's enough to refer to the columns in the WHERE clause without prefixing them with the table name (e.g., use age instead of Persons.age). \n In this case, you'll need to use the % operator before the text, because the car type contains both the brand and the model — with the model being the second part. \n The car type is searched first, and the ticket type comes second in the WHERE clause. \n As a hint, here is a partial query that you need to complete: \n SELECT car_type FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE ";

  const task5Text: string =
    "Fifth Query \n Now you need to combine the collected data and query conditions. \n Find the individuals who meet the following criteria (Write in this order after the where clause): male, older than 49, have an income lower than 490281, drive a Taurus model car, and have purchased a vip ticket at the zoo. \n Since the columns in the two tables are different, it's enough to refer to the columns in the WHERE clause without prefixing them with the table name (e.g., use age instead of Persons.age). \n Continue the following query \n SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE";

  const getMyQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsDisabled(true);
    e.preventDefault();
    setErrorText(null);
    const normalizedQuery = query.trim().replace(/"/g, "'");
    if (
      normalizedQuery === `SELECT * FROM Persons WHERE gender = 'male'` ||
      normalizedQuery === `SELECT AVG(age) AS age FROM Persons` ||
      normalizedQuery ===
        `SELECT AVG(annual_income) AS annual_income FROM Persons` ||
      normalizedQuery ===
        `SELECT car_type FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE car_type LIKE '%Taurus' AND ticket_type = 'vip'` ||
      normalizedQuery ===
        `SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE gender = 'male' AND age > 49 AND annual_income < 490281 AND car_type LIKE '%Taurus' AND ticket_type = 'vip'`
    ) {
      try {
        const response = await axios.post("https://sql-game-sd9w.onrender.com/api/Persons", {
          query,
        });
        if (
          normalizedQuery === `SELECT * FROM Persons WHERE gender = 'male'` &&
          task0
        ) {
          setResult(response.data)
          setPercentage(20);
          setTask0(false);
          setTask1(true);
        }
        if (
          normalizedQuery === `SELECT AVG(age) AS age FROM Persons` &&
          task1
        ) {
          setResult(response.data)
          setPercentage(40);
          setTask1(false);
          setTask2(true);
        }
        if (
          normalizedQuery ===
          `SELECT AVG(annual_income) AS annual_income FROM Persons` &&
          task2
        ) {
          setResult(response.data)
          setPercentage(60);
          setTask2(false);
          setTask3(true);
        }
        if (
          normalizedQuery ===
          `SELECT car_type FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE car_type LIKE '%Taurus' AND ticket_type = 'vip'` &&
          task3
        ) {
          setResult(response.data)
          setPercentage(80);
          setTask3(false);
          setTask4(true);
        }
        if (
          normalizedQuery ===
          `SELECT * FROM Persons JOIN Zoo ON Persons.id = Zoo.person_id WHERE gender = 'male' AND age > 49 AND annual_income < 490281 AND car_type LIKE '%Taurus' AND ticket_type = 'vip'` &&
          task4
        ) {
          setResult(response.data)
          setPercentage(100);
          setTask4(false);
          setTask5(true);
        }
        setQuery("");
      }
       catch (error) {
        if (!navigator.onLine) {
          const msg =
            "No internet connection. Please check your network settings.";
          setErrorText(msg);
          alert(msg);
          return;
        }
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const serverMsg =
              error.response.data?.error || "An error occurred on the server.";
            console.error("Server responded with an error: ", serverMsg);
            setErrorText(serverMsg);
            alert(serverMsg);
          } else if (error.request) {
            console.error("No response received from server.");
            setErrorText(
              "No response received from server. Please try again later."
            );
            alert("No response received from server. Please try again later.");
          } else {
            console.error("An error occurred:", error.message);
            setErrorText("An error occurred. Please try again later.");
            alert("An error occurred.");
          }
        }
      } finally {
        setIsDisabled(false);
      }
    } else {
      alert("The query does not match the expected format.");
      return;
    }
  };

  return (
    <div>
      {secondPartStory && (
        <>
          <p className="story">{continueStory}</p>
          <button className="showMe-btn" onClick={continueGame}>
            Let's check the database!
          </button>
        </>
      )}
      {isVisibleTask && (
        <div className="main-div">
          {errorText?.length > 0 && <p className="error">Error: {errorText}</p>}
          <div className="circle-container">
            <div className={`circle circle-${percentage}`}>
              <div className="inner-circle">{percentage}%</div>
            </div>
          </div>
          {task0 && (
            <form
              className="task-form"
              action="#"
              method="post"
              onSubmit={getMyQuery}
            >
              <label className="task-form_label" htmlFor="query-id">
                <p className="text-style rules">{importantRules}</p>
                <p className="text-style">{task1Text}</p>
                <button
                  className="showMe-btn"
                  type="button"
                  onClick={() => toggleTask(1)}
                >
                  {showMe}
                </button>
                {activeTask === 1 && (
                  <pre className="text-style">{task1Solution}</pre>
                )}
              </label>
              <input
                autoFocus
                className="task-form_input"
                type="text"
                id="query-id"
                name="query"
                placeholder="Enter your query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={`task-form_button ${isDisabled ? "disabled" : ""}`}
                type="submit"
              >
                {isDisabled ? "Loading..." : "Submit"}
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
                {activeTask === 2 && (
                  <pre className="text-style">{task2Solution}</pre>
                )}
              </label>
              <input
                autoFocus
                className="task-form_input"
                type="text"
                id="query-id"
                name="query"
                placeholder="Enter your query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={`task-form_button ${isDisabled ? "disabled" : ""}`}
                type="submit"
              >
                {isDisabled ? "Loading..." : "Submit"}
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
                {activeTask === 3 && (
                  <pre className="text-style">{task3Solution}</pre>
                )}
              </label>
              <input
                autoFocus
                className="task-form_input"
                type="text"
                id="query-id"
                name="query"
                placeholder="Enter your query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={`task-form_button ${isDisabled ? "disabled" : ""}`}
                type="submit"
              >
                {isDisabled ? "Loading..." : "Submit"}
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
                {activeTask === 4 && (
                  <pre className="text-style">{task4Solution}</pre>
                )}
              </label>
              <input
                autoFocus
                className="task-form_input"
                type="text"
                id="query-id"
                name="query"
                placeholder="Enter your query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={`task-form_button ${isDisabled ? "disabled" : ""}`}
                type="submit"
              >
                {isDisabled ? "Loading..." : "Submit"}
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
                {activeTask === 5 && (
                  <pre className="text-style">{task5Solution}</pre>
                )}
              </label>
              <input
                autoFocus
                className="task-form_input"
                type="text"
                id="query-id"
                name="query"
                placeholder="Enter your query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={`task-form_button ${isDisabled ? "disabled" : ""}`}
                type="submit"
              >
                {isDisabled ? "Loading..." : "Submit"}
              </button>
            </form>
          )}
          {task5 && (
            <>
              <p className="story">{endOfTheStory}</p>
              <p className="text-style">{successText}</p>
              <button
                className="task-form_button"
                onClick={toggleVisibilityOtherQ}
              >
                Discover other sqlite commands!{" "}
              </button>
            </>
          )}
          {result.length > 0 && (
            <div className="table-container">
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectTaskComponent;
