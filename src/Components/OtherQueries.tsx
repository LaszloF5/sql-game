import React, { FC, useState } from "react";
import axios from "axios";

interface OtherQueryData {
  fruit_name: string;
  quantity: string;
}

interface visibleState {
  isVisibleOtherTask: boolean;
  setIsVisibleOtherTask: React.Dispatch<React.SetStateAction<Boolean>>;
  setIsVisibleTutorial: React.Dispatch<React.SetStateAction<Boolean>>;
}

const OtherQueries: FC<visibleState> = ({
  isVisibleOtherTask,
  setIsVisibleOtherTask,
  setIsVisibleTutorial,
}) => {
  const goToTheStart = () => {
    setIsVisibleOtherTask(false);
    setIsVisibleTutorial(true);
  };

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

  const otherTask0Text: string = `The INSERT INTO command allows us to insert data into a table. After the command, we need to specify the name of the table where we want to insert the data – in this case, the Session table. \n
Next, we list the columns where we want to insert data in parentheses: (fruit_name, quantity). Since each inserted value must belong to a specific column, the order of the specified columns is important. \n
After the VALUES keyword, we must provide the corresponding values in the same order as the columns were specified. String-type values should always be enclosed in quotation marks, which is why 'apple' and '1kg' are in quotes. \n
Task: Now try to construct this SQL statement on your own!`;

  const otherTask1Text: string = `Similar to the previous example, we will now insert another record into the Session table. \n
Task: Insert the following data into the table: \n
  fruit_name: 'banana' \n 
  quantity: '2kg' \n
  Use the INSERT INTO command in the correct format!`;

  const otherTask2Text: string = `The SQL DELETE command allows us to delete a specific record from a table. After the command, we need to specify the name of the table from which we want to delete data – in this case, the Session table. \n
Then, using the WHERE keyword, we define the condition for deleting a specific row. The condition id = 1 means that we will delete the first record in the table (with id 1), which contains the data 'apple' and '1kg'.\n
It's important to note that without the WHERE condition, the entire table would be deleted, so always ensure that you specify the deletion conditions precisely! \n
Now, let's go through it step by step: \n 
DELETE FROM Session \n
This is how we start the command. After the DELETE keyword, we need to specify the table from which we want to delete data. Since the task involves the Session table, this is what we need to write. \n
WHERE id = 1 \n
After specifying the table, we use the WHERE keyword to set the deletion condition. The expression id = 1 means that we want to delete the record where the id column has the value 1. This ensures that only the specific record, with id = 1, is deleted. \n
Now try to construct the SQL statement on your own in the next task:\n
Delete the record from the Session table where the fruit is 'apple', the quantity is '1kg', and the id is 1.`;

  const otherTask3Text: string = `This task demonstrates how to update a table's data using the SQL UPDATE command. The UPDATE command is used when we want to modify an existing record.\n
Now, let's go step by step through the SQL statement structure:\n
UPDATE Session\n
The UPDATE command is followed by the name of the table. In this case, we want to update the Session table.\n
SET quantity = '1kg'\n
The SET keyword specifies which column we want to update. Since we need to update the quantity column, we provide the new value, '1kg', here.\n
WHERE fruit_name = 'banana'\n
The WHERE keyword is used to define the update condition. Since the task requires updating the record where fruit_name is 'banana', we specify fruit_name = 'banana' here.\n
Using the SQL UPDATE command, we can modify an existing record. Now, update the quantity of the banana entry in the Session table. The fruit_name should be 'banana', and the new quantity should be '1kg'.`;

  const otherTask4Text: string = `Now, let's refresh our knowledge of the DELETE statement. \n
Your task is to delete the banana fruit from the Session table, where the id is 2. \n
Use the DELETE command to remove the record!`;

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
      setOtherQuery("");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      {isVisibleOtherTask && (
        <div>
          <h2>Other Queries</h2>
          <main className="otherQueries-container">
            <button
              className="other-form_button"
              type="button"
              onClick={getElements}
            >
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
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
            {otherTask5 && (
              <>
                <p>
                  You have successfully completed the sqlite UPDATE, INSERT INTO
                  and DELETE statements. Congratulations!
                </p>
                <button
                  className="other-form_button"
                  type="button"
                  onClick={goToTheStart}
                >
                  Go to the home page
                </button>
              </>
            )}
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
      )}
    </>
  );
};

export default OtherQueries;
