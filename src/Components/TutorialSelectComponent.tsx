import React, { FC, useState } from "react";
import axios from "axios";

interface PoliceData {
  id: number;
  crime_type: string;
  city: string;
  crime_report: string;
}

interface TutorialSelectProps {
  showMe: boolean;
  isVisibleTutorial: boolean;
  setIsVisibleTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisibleTask: React.Dispatch<React.SetStateAction<boolean>>;
  tutorialResult: PoliceData[];
  setTutorialResult: React.Dispatch<React.SetStateAction<PoliceData[]>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const TutorialSelectComponent: FC<TutorialSelectProps> = ({
  showMe,
  isVisibleTutorial,
  setIsVisibleTutorial,
  setIsVisibleTask,
  error,
  setError,
}) => {
  const [activeTutorial, setActiveTutorial] = useState<number>(0);

  const toggleTutorial = (tutorialNumber: number) => {
    setActiveTutorial(tutorialNumber);
  };

  const toggleVisibility = (): void => {
    setIsVisibleTutorial(false);
    setIsVisibleTask(true);
  };

  const [tutorialQuery, setTutorialQuery] = useState<string>("");
  const [tutorialResult, setTutorialResult] = useState<PoliceData[]>([]);

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

  const tutorial1Text: string =
    "SELECT lekérdezés oszlopok szerint. \n A SELECT * FROM Police_db lekérdezéssel az összes oszlopot megjeleníthetjük. \n Próbáld ki ezt a lekérdezést! \n Ha sikerült, módosítsd úgy, hogy csak a city oszlopot jelenítsd meg az összes  (*) helyett.";

  const tutorial2Text: string =
    "SELECT lekérdezés AVG() függvénnyel kombinálva. \n Az előzőhöz hasonlóan most is a SELECT-et használjuk, de kiegészítjük az AVG() függvénnyel. \n A zárójelek közé annak az oszlopnak a nevét kell írnod, amelynek az átlagértékét szeretnéd kiszámolni. \n Most az id oszlop átlagát számoljuk ki. \n Az eredményoszlop nevét az AS id utasítással tudod megadni.";

  const tutorial3Text: string =
    "Ellenőrizd, hogy található-e olyan rekord, ahol az id nagyobb, mint 50. \n Csak az id oszlop értékei jelenjenek meg. \n A SELECT id FROM Police_db lekérdezést egészítsd ki a WHERE id > 50 feltétellel.";

  const tutorial4Text: string =
    "Listázz ki 10 bűnügyi jelentést. \n Csak a bűnügyi jelentések jelenjenek meg. \n Ennek a lekérdezésnek a megírásához már majdnem minden szükséges tudásod megvan! \n A 10 jelentés megjelenítéséhez a lekérdezés végére írd hozzá a LIMIT 10 utasítást.";

  const tutorial5Text: string =
    "Keresd meg az összes olyan várost, amelynek neve Lake szóval kezdődik. \n Ehhez a LIKE 'Lake%' operátort kell használnod a WHERE után.";

  const getTutorialQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
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
        alert(`Network Error: ${error.response.data.error}`);
      } else {
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred.");
      }
    }
  };

  return (
    <div>
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
                      <td className="tutorial-table_td">{item.crime_report}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorialSelectComponent;
