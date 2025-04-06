import React, { FC, useState } from "react";
import axios from "axios";

interface PoliceData {
  id: number;
  crime_type: string;
  city: string;
  crime_report: string;
}

interface TutorialSelectProps {
  firstPartStory: boolean;
  setFirstPartStory: React.Dispatch<React.SetStateAction<boolean>>;
  setSecondPartStory: React.Dispatch<React.SetStateAction<boolean>>;
  tutorial0: boolean;
  tutorial1: boolean;
  tutorial2: boolean;
  tutorial3: boolean;
  tutorial4: boolean;
  tutorial5: boolean;
  setTutorial0: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorial1: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorial2: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorial3: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorial4: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorial5: React.Dispatch<React.SetStateAction<boolean>>;
  setTask0: React.Dispatch<React.SetStateAction<boolean>>;
  importantRules: string;
  showMe: boolean;
  isVisibleTutorial: boolean;
  setIsVisibleTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisibleTask: React.Dispatch<React.SetStateAction<boolean>>;
  tutorialResult: PoliceData[];
  setTutorialResult: React.Dispatch<React.SetStateAction<PoliceData[]>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  percentage: number;
  setPercentage: React.Dispatch<React.SetStateAction<number>>;
}

const TutorialSelectComponent: FC<TutorialSelectProps> = ({
  firstPartStory,
  setFirstPartStory,
  setSecondPartStory,
  tutorial0,
  tutorial1,
  tutorial2,
  tutorial3,
  tutorial4,
  tutorial5,
  setTutorial0,
  setTutorial1,
  setTutorial2,
  setTutorial3,
  setTutorial4,
  setTutorial5,
  setTask0,
  importantRules,
  showMe,
  isVisibleTutorial,
  setIsVisibleTutorial,
  setIsVisibleTask,
  error,
  setError,
  percentage,
  setPercentage,
}) => {
  // % circle

  const [activeTutorial, setActiveTutorial] = useState<number>(0);

  const toggleTutorial = (tutorialNumber: number) => {
    setActiveTutorial(tutorialNumber);
  };

  // Ezt a setActiveTutorial-t még át kell gondolni.

  const toggleVisibility = (): void => {
    setActiveTutorial(10);
    setPercentage(0);
    setIsVisibleTutorial(false);
    setFirstPartStory(false);
    setSecondPartStory(true);
  };

  const introStory: string = `Welcome, detective! \n The city’s greatest mystery has remained unsolved for five years: \n a mysterious criminal that even the best investigators haven’t been able to catch. \n But now, a new opportunity has arisen.

The police database is at your disposal to help you narrow down the list of suspects and ultimately uncover the criminal’s identity. SQLite commands will guide you in identifying the wanted individual.

Are you ready for the challenge?`;

  const startFunction = () => {
    setFirstPartStory(false);
    setIsVisibleTutorial(true);
    setTutorial0(true);
  };

  const [tutorialQuery, setTutorialQuery] = useState<string>("");
  const [tutorialResult, setTutorialResult] = useState<PoliceData[]>([]);
  const successTutorialText: string = `You have successfully completed the tutorial. \n Now, let's take a look at the real task.`;

  const tutorial1Solution: string = `SELECT city FROM Police_db`;
  const tutorial2Solution: string = `SELECT AVG(id) AS id FROM Police_db`;
  const tutorial3Solution: string = `SELECT id FROM Police_db WHERE id > 50`;
  const tutorial4Solution: string = `SELECT crime_report FROM Police_db LIMIT 10`;
  const tutorial5Solution: string = `SELECT city FROM Police_db WHERE city LIKE 'Lake%'`;

  const tutorial1Text: string =
    "SELECT query by columns. \n Using the query SELECT * FROM Police_db, we can display all columns. \n Try this query! \n If it works, modify it so that only the city column is displayed instead of all (*).";

  const tutorial2Text: string =
    "SELECT query combined with the AVG() function. \n Similar to the previous one, we still use SELECT, but now we add the AVG() function. \n Inside the parentheses, you need to write the name of the column whose average value you want to calculate. \n Now, we will calculate the average of the id column. \n You can name the result column using the AS id statement.";

  const tutorial3Text: string =
    "Check if there is a record where the id is greater than 50. \n Only the values of the id column should be displayed. \n Extend the query SELECT id FROM Police_db with the condition WHERE id > 50.";

  const tutorial4Text: string =
    "List 10 crime reports. \n Only crime reports should be displayed. \n You already have almost all the necessary knowledge to write this query! \n To display 10 reports, add the LIMIT 10 statement at the end of the query.";

  const tutorial5Text: string =
    "Find all cities (we only need the city column) whose names start with 'Lake'. \n To do this, use the LIKE 'Lake%' operator in the WHERE clause.";

  const getTutorialQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (
      tutorialQuery.trim() === `SELECT * FROM Police_db` ||
      tutorialQuery.trim() === `SELECT city FROM Police_db` ||
      tutorialQuery.trim() === `SELECT AVG(id) AS id FROM Police_db` ||
      tutorialQuery.trim() === `SELECT id FROM Police_db WHERE id > 50` ||
      tutorialQuery.trim() === `SELECT crime_report FROM Police_db LIMIT 10` ||
      tutorialQuery.trim().replace(/"/g, "'") ===
        `SELECT city FROM Police_db WHERE city LIKE 'Lake%'`
    ) {
      console.log("");
    } else {
      alert("The query does not match the expected format.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/PoliceDB", {
        tutorialQuery,
      });
      console.log("Server Response:", response.data.error);

      if (response.data.error) {
        console.log(
          "Check your dev tools for more details. (ctrl + shift + i)"
        );
        alert(`Error: ${response.data.error}`);
        return;
      }

      setTutorialResult(response.data);
      console.log("Response status: ", response.status);

      if (tutorialQuery.trim() === `SELECT city FROM Police_db` && tutorial0) {
        setPercentage(20);
        console.log("Go to tutorial 2.");
        setTutorial0(false);
        setTutorial1(true);
      }
      if (
        tutorialQuery.trim() === `SELECT AVG(id) AS id FROM Police_db` &&
        tutorial1
      ) {
        setPercentage(40);
        console.log("Go to tutorial 3.");
        setTutorial1(false);
        setTutorial2(true);
      }
      if (
        tutorialQuery.trim() === `SELECT id FROM Police_db WHERE id > 50` &&
        tutorial2
      ) {
        setPercentage(60);
        console.log("Go to tutorial 4.");
        setTutorial2(false);
        setTutorial3(true);
      }
      if (
        tutorialQuery.trim() ===
          `SELECT crime_report FROM Police_db LIMIT 10` &&
        tutorial3
      ) {
        setPercentage(80);
        console.log("Go to tutorial 5.");
        setTutorial3(false);
        setTutorial4(true);
      }
      if (
        tutorialQuery.trim().replace(/"/g, "'") ===
          `SELECT city FROM Police_db WHERE city LIKE 'Lake%'` &&
        tutorial4
      ) {
        setPercentage(100);
        console.log("Go to the real task.");
        setTutorial4(false);
        setTutorial5(true);
      }
      setTutorialQuery("");
    } catch (error) {
      if (error.response) {
        console.error("Hiba történt:", error.response.data.error);
        alert(`Network Error: ${error.response.data.error}`);
      } else {
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      {firstPartStory && (
        <>
          <p className="story">{introStory}</p>
          <button className="showMe-btn" onClick={startFunction}>
            Let's dive in!
          </button>
        </>
      )}
      {isVisibleTutorial && (
        <div className="tutorialDiv">
          {firstPartStory ? (
            ""
          ) : (
            <div className="circle-container">
              <div className={`circle circle-${percentage}`}>
                <div className="inner-circle">{percentage}%</div>
              </div>
            </div>
          )}
          {tutorial0 && (
            <form className="tutorial-form" onSubmit={getTutorialQuery}>
              <label
                className="tutorial-form_label"
                htmlFor="tutorial-query-id"
              >
                <p className="text-style rules">{importantRules}</p>
                <p className="text-style">{tutorial1Text}</p>
                <button
                  className="showMe-btn"
                  type="button"
                  onClick={() => toggleTutorial(1)}
                >
                  {showMe}
                </button>
                {activeTutorial === 1 && (
                  <pre className="text-style">{tutorial1Solution}</pre>
                )}
              </label>
              <input
                autoFocus
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
              <p>Tutorial part 1 is done.</p>
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
                  {activeTutorial === 2 && (
                    <pre className="text-style">{tutorial2Solution}</pre>
                  )}
                </label>
                <input
                  autoFocus
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
              <p>Tutorial part 2 is done.</p>
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
                  {activeTutorial === 3 && (
                    <pre className="text-style">{tutorial3Solution}</pre>
                  )}
                </label>
                <input
                  autoFocus
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
              <p>Tutorial part 3 is done.</p>
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
                  {activeTutorial === 4 && (
                    <pre className="text-style">{tutorial4Solution}</pre>
                  )}
                </label>
                <input
                  autoFocus
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
              <p>Tutorial part 4 is done.</p>
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
                  {activeTutorial === 5 && (
                    <pre className="text-style">{tutorial5Solution}</pre>
                  )}
                </label>
                <input
                  autoFocus
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
              <p>Tutorial part 5 is done.</p>
              <p className="text-style">{successTutorialText}</p>
              <button
                className="tutorial-form_button"
                onClick={toggleVisibility}
              >
                Go to task
              </button>
            </div>
          )}
          {tutorialResult.length > 0 && (
            <div className="table-container">
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorialSelectComponent;
