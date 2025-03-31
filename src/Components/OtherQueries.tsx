import React, { FC, useState } from "react";
import axios from "axios";

interface OtherQueryData {
  fruit_name: string;
  quantity: string;
}

const OtherQueries: FC = () => {

  const [otherTask0, setOtherTask0] = useState<boolean>(true);
  const [otherTask1, setOtherTask1] = useState<boolean>(false);
  const [otherTask2, setOtherTask2] = useState<boolean>(false);
  const [otherTask3, setOtherTask3] = useState<boolean>(false);
  const [otherTask4, setOtherTask4] = useState<boolean>(false);

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
  const otherTask2Text: string = ``;
  const otherTask3Text: string = ``;
  const otherTask4Text: string = ``;

  const [otherQuery, setOtherQuery] = useState<string>("");
  const [tableData, setTableData] = useState<OtherQueryData | string>("");

  // GET

  const getElements = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // DELETE

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

      setTableData((prevData) =>
        prevData.map((item) =>
          item.fruit_name === "banana" ? { ...item, quantity: "1kg" } : item
        )
      );
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
    const expectedQuery = "DELETE FROM Session WHERE id = 1";
    if (otherQuery.trim() !== expectedQuery) {
      alert("The query does not match the expected format.");
      return;
    }
    const query = "DELETE FROM Session WHERE id = 1";
    try {
      const response = axios.delete("http://localhost:5000/api/session", {
        data: { otherQuery: query },
      });
      setTableData(prevTableData => {
        prevTableData.filter((item) => {return (
          item.id !== 1
        )})
      })
      alert('Item deleted successfully.');
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Other Queries</h2>
      <main className="otherQueries-container">
        <button onClick={getElements}>Get my elements</button>
        <form action="#" method="post" onSubmit={handleSubmit}>
          <label htmlFor="test">Test query</label>
          <input
            type="text"
            id="test"
            name="otherQuery"
            value={otherQuery}
            onChange={(e) => setOtherQuery(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <form action="#" method="post" onSubmit={updateItem}>
          <label htmlFor="test">Update banana</label>
          <input
            type="text"
            id="test"
            name="otherQuery"
            value={otherQuery}
            onChange={(e) => setOtherQuery(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <form action="#" method="post" onSubmit={handleDelete}>
          <label htmlFor="test">Delete queries</label>
          <input
            type="text"
            id="test"
            name="otherQuery"
            value={otherQuery}
            onChange={(e) => setOtherQuery(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {tableData && (
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Fruit Name</td>
                <td>Quantity</td>
                <td>Delete method</td>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fruit_name}</td>
                    <td>{item.quantity}</td>
                    <td>
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
