import React, { FC, useState } from "react";
import axios from "axios";

interface OtherQueryData {
  fruit_name: string;
  quantity: string;
}

const OtherQueries: FC = () => {
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
      
      setTableData(prevData => 
        prevData.map(item =>
          item.fruit_name === "banana" ? {...item, quantity: "1kg"} : item
        )
      );
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
        {tableData && (
          <table>
            <thead>
              <tr>
                <td>Fruit Name</td>
                <td>Quantity</td>
                <td>Delete method</td>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => {
                return (
                  <tr key={item.id}>
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
