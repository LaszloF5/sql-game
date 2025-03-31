import React, { FC, useState } from "react";
import axios from "axios";

interface OtherQueryData {
  fruit_name: string;
  quantity: string;
}

const OtherQueries: FC = () => {
  const [visibleAnswer, setVisibleAnswer] = useState<number>(0);

  const otherShowMe = "Show me the answer!";

  const handleVisibleAnswer = (otherTaskNumber: number) => {
    setVisibleAnswer(otherTaskNumber);
  };

  const [otherTask0, setOtherTask0] = useState<boolean>(true);
  const [otherTask1, setOtherTask1] = useState<boolean>(false);
  const [otherTask2, setOtherTask2] = useState<boolean>(false);
  const [otherTask3, setOtherTask3] = useState<boolean>(false);
  const [otherTask4, setOtherTask4] = useState<boolean>(false);
  const [otherTask5, setOtherTask5] = useState<boolean>(false);

  const otherTask0Solution: string = `INSERT INTO Session (fruit_name, quantity) VALUES ('apple', '1kg')`;
  const otherTask1Solution: string = `INSERT INTO Session (fruit_name, quantity) VALUES ('banana', '2kg')`;
  const otherTask2Solution: string = `DELETE FROM Session WHERE id = 1`;
  const otherTask3Solution: string = `UPDATE Session SET quantity = '1kg' WHERE fruit_name = 'banana'`;
  const otherTask4Solution: string = `DELETE FROM Session WHERE id = 2`;

  const otherTask0Text: string = `Az INSERT INTO parancs segítségével adatokat tudunk beszúrni egy táblába. A parancs után meg kell adni annak a táblának a nevét, amelybe az adatokat szeretnénk beszúrni – jelen esetben ez a Session tábla. \n
Ezután zárójelek között felsoroljuk, hogy mely oszlopokba szeretnénk adatokat beszúrni: (fruit_name, quantity). Mivel minden beszúrt értéknek egy adott oszlophoz kell tartoznia, a megadott oszlopok sorrendje fontos. \n
A VALUES kulcsszó után meg kell adni az oszlopokhoz tartozó értékeket ugyanabban a sorrendben, ahogyan az oszlopokat megadtuk. A szöveges (STRING) típusú értékeket mindig idézőjelek közé kell tenni, ezért szerepel az 'apple' és az '1kg' idézőjelekben. \n
Feladat: Most próbáld meg saját magad összeállítani ezt az SQL utasítást!`;
  const otherTask1Text: string = `Az előző feladat példájához hasonlóan most egy újabb rekordot fogunk beszúrni a Session táblába. \n Feladat: Illeszd be a következő adatokat a táblába: \n
  fruit_name: 'banana' \n 
  quantity: '2kg' \n
  Használd az INSERT INTO parancsot a megfelelő formátumban! `;
  const otherTask2Text: string = `Az SQL DELETE parancs segítségével egy adott rekordot törölhetünk egy táblából. A parancs után meg kell adni annak a táblának a nevét, amelyből az adatokat szeretnénk törölni – jelen esetben a Session tábla. \n
  Ezután a WHERE kulcsszóval megadjuk a feltételt, hogy melyik sort töröljük. Az id = 1 azt jelenti, hogy a tábla első rekordját (amelynek az id-je 1) töröljük, tehát az 'apple' és '1kg' adatokat tartalmazó sort.\n
  Fontos, hogy a WHERE feltétel nélkül az egész tábla törlődne, így mindig ügyelj arra, hogy pontosan megadd a törlés feltételeit! \n
  Most lépésről lépésre végigmegyünk rajta: \n 
  DELETE FROM Session \n
  Itt kezdjük az utasítást. A DELETE parancsot követően meg kell adni, hogy melyik táblából szeretnénk törölni. Mivel a feladatban a Session tábla a cél, ezt kell megírnunk. \n
  WHERE id = 1 \n
  Miután megadtuk a táblát, következik a WHERE kulcsszó. Ezzel meghatározzuk a törlés feltételét. A WHERE után az id = 1 kifejezés azt jelenti, hogy az id oszlopban lévő 1-es értékkel rendelkező rekordot szeretnénk törölni. Ez fogja biztosítani, hogy csak az adott rekord, az id = 1-hez tartozó sor kerül törlésre. \n
  Most próbáld meg saját magad összeállítani az SQL utasítást a következő feladatban:\n
  Töröld a Session táblából az 'apple' nevű gyümölcsöt, amelynek mennyisége '1kg' és az id-je 1.`;
  const otherTask3Text: string = `Ez a feladat azt mutatja be, hogy hogyan frissítsük egy tábla adatát az SQL UPDATE parancs segítségével. Az UPDATE parancsot akkor használjuk, amikor egy meglévő rekordot szeretnénk módosítani.\n
  Most lépésről lépésre végigmegyünk rajta, hogy mit, mi után kell írni az SQL utasításban:\n
  UPDATE Session\n
  Az UPDATE parancsot a tábla nevével folytatjuk. Mi most a Session táblát szeretnénk frissíteni.\n
  SET quantity = '1kg'\n
  A SET kulcsszó segítségével adhatjuk meg, hogy melyik oszlopot szeretnénk módosítani. Mivel most a quantity oszlopot kell módosítani, az új értéket, a '1kg'-ot itt kell megadnunk.\n
  WHERE id = 2\n
  A WHERE kulcsszó segítségével tudjuk meghatározni a módosítás feltételét. Mivel a feladatban azt kérik, hogy a 2-es id-jű rekordot módosítsuk, itt kell megadni, hogy az id = 2 legyen.\n
  Az SQL UPDATE parancs segítségével egy meglévő rekordot tudunk módosítani. Most a Session táblában a banana nevű gyümölcs mennyiségét kell frissítenünk. Az id-ja 2, és az új mennyiség 1kg lesz.`;
  const otherTask4Text: string = `Most pedig frissítsük fel a DELETE utasítás használatát. \n
  A feladatod, hogy töröld a Session táblából a banana nevű gyümölcsöt, melynek id-je 2. \n
  Használj DELETE parancsot a rekord eltávolításához!`;

  const [otherQuery, setOtherQuery] = useState<string>("");
  const [tableData, setTableData] = useState<OtherQueryData | string>("");

  // GET

  const getElements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/session");
      setTableData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  //POST, new item

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otherQuery.trim().length === 0) {
      alert("Please enter a query");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/session", {
        otherQuery,
      });
      console.log(response.data);
      setTableData([...tableData, response.data.newRecord]);
      if (otherQuery.includes("apple")) {
        setOtherTask0(false);
        setOtherTask1(true);
      } else if (otherQuery.includes("banana")) {
        setOtherTask1(false);
        setOtherTask2(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // DELETE (Ezt később törölni fogjuk, csak nem akarok mindig delete query-ket írni.);

  const deleteItem = async (i: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/session/${i}`
      );
      console.log(response.data);
      setTableData(tableData.filter((item) => item.id !== i));
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // UPDATE item

  const updateItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otherQuery.trim().length === 0) {
      alert("Please enter a query");
      return;
    }
    const expectedQuery = `UPDATE Session SET quantity = '1kg' WHERE fruit_name = 'banana'`;
    if (otherQuery.trim() !== expectedQuery) {
      alert("The query does not match the expected format.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/api/session", {
        otherQuery,
      });
      console.log(response.data);
      getElements();
      setOtherTask3(false);
      setOtherTask4(true);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // DELETE QUERY

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otherQuery.trim().length === 0) {
      alert("Please enter a query");
      return;
    }
    let query: string;

    const possibleQuery1 = "DELETE FROM Session WHERE id = 1";
    const possibleQuery2 = "DELETE FROM Session WHERE id = 2";

    if (otherQuery === possibleQuery1) {
      query = possibleQuery1;
    } else if (otherQuery === possibleQuery2) {
      query = possibleQuery2;
    } else {
      alert("The query does not match the expected format.");
      return;
    }

    try {
      const response = await axios.delete("http://localhost:5000/api/session", {
        data: { otherQuery: query },
      });
      setTableData((prevTableData) => {
        prevTableData.filter((item) => {
          return item.id !== parseInt(query.split("=")[1]);
        });
      });
      alert("Item deleted successfully.");
      if (otherQuery.includes(1)) {
        setOtherTask2(false);
        setOtherTask3(true);
      } else if (otherQuery.includes(2)) {
        setOtherTask4(false);
        setOtherTask5(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Other Queries</h2>
      <main className="otherQueries-container">
        <button type="button" onClick={getElements}>
          Get my elements
        </button>
        {otherTask0 && (
          <form
            className="other-form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <label className="other-form_label" htmlFor="test">
              <p className="text-style">{otherTask0Text}</p>
              <button
                className="showMe-btn"
                type="button"
                onClick={() => handleVisibleAnswer(1)}
              >
                {otherShowMe}
              </button>
              {visibleAnswer === 1 && <pre>{otherTask0Solution}</pre>}
            </label>
            <input
              className="other-form_input"
              type="text"
              id="test"
              name="otherQuery"
              value={otherQuery}
              onChange={(e) => setOtherQuery(e.target.value)}
            />
            <button className="other-form_button" type="submit">
              Submit
            </button>
          </form>
        )}
        {otherTask1 && (
          <form
            className="other-form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <label className="other-form_label" htmlFor="test">
              <p className="text-style">{otherTask1Text}</p>
              <button
                className="showMe-btn"
                type="button"
                onClick={() => handleVisibleAnswer(2)}
              >
                {otherShowMe}
              </button>
              {visibleAnswer === 2 && <pre>{otherTask1Solution}</pre>}
            </label>
            <input
              className="other-form_input"
              type="text"
              id="test"
              name="otherQuery"
              value={otherQuery}
              onChange={(e) => setOtherQuery(e.target.value)}
            />
            <button className="other-form_button" type="submit">
              Submit
            </button>
          </form>
        )}
        {otherTask2 && (
          <form
            className="other-form"
            action="#"
            method="post"
            onSubmit={handleDelete}
          >
            <label className="other-form_label" htmlFor="test">
              <p className="text-style">{otherTask2Text}</p>
              <button
                className="showMe-btn"
                type="button"
                onClick={() => handleVisibleAnswer(2)}
              >
                {otherShowMe}
              </button>
              {visibleAnswer === 2 && <pre>{otherTask2Solution}</pre>}
            </label>
            <input
              className="other-form_input"
              type="text"
              id="test"
              name="otherQuery"
              value={otherQuery}
              onChange={(e) => setOtherQuery(e.target.value)}
            />
            <button className="other-form_button" type="submit">
              Submit
            </button>
          </form>
        )}
        {otherTask3 && (
          <form
            className="other-form"
            action="#"
            method="post"
            onSubmit={updateItem}
          >
            <label className="other-form_label" htmlFor="test">
              <p className="text-style">{otherTask3Text}</p>
              <button
                className="showMe-btn"
                type="button"
                onClick={() => handleVisibleAnswer(3)}
              >
                {otherShowMe}
              </button>
              {visibleAnswer === 3 && <pre>{otherTask3Solution}</pre>}
            </label>
            <input
              className="other-form_input"
              type="text"
              id="test"
              name="otherQuery"
              value={otherQuery}
              onChange={(e) => setOtherQuery(e.target.value)}
            />
            <button className="other-form_button" type="submit">
              Submit
            </button>
          </form>
        )}
        {otherTask4 && (
          <form
            className="other-form"
            action="#"
            method="post"
            onSubmit={handleDelete}
          >
            <label className="other-form_label" htmlFor="test">
              <p className="text-style">{otherTask4Text}</p>
              <button
                className="showMe-btn"
                type="button"
                onClick={() => handleVisibleAnswer(4)}
              >
                {otherShowMe}
              </button>
              {visibleAnswer === 4 && <pre>{otherTask4Solution}</pre>}
            </label>
            <input
              className="other-form_input"
              type="text"
              id="test"
              name="otherQuery"
              value={otherQuery}
              onChange={(e) => setOtherQuery(e.target.value)}
            />
            <button className="other-form_button" type="submit">
              Submit
            </button>
          </form>
        )}
        {otherTask5 && <h2>GGWP</h2>}
        {tableData && (
          <table className="other-table">
            <thead className="other-table_thead">
              <tr className="other-table_tr">
                <td className="other-table_td">ID</td>
                <td className="other-table_td">Fruit Name</td>
                <td className="other-table_td">Quantity</td>
                <td className="other-table_td">Delete method</td>
              </tr>
            </thead>
            <tbody className="other-table_tbody">
              {tableData.map((item) => {
                return (
                  <tr className="other-table_tr" key={item.id}>
                    <td className="other-table_td">{item.id}</td>
                    <td className="other-table_td">{item.fruit_name}</td>
                    <td className="other-table_td">{item.quantity}</td>
                    <td className="other-table_td">
                      <button onClick={() => deleteItem(item.id)}>
                        Delete item
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default OtherQueries;
