import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import { createInferTypeNode } from "typescript";
import TutorialSelectComponent from "./Components/TutorialSelectComponent.tsx";
import SelectTaskComponent from "./Components/SelectTaskComponent.tsx";
import DataBaseStructure from "./Components/DataBaseStructure.tsx";
import OtherQueries from "./Components/OtherQueries.tsx";

function App() {
  const location = useLocation();

  const [firstPartStory, setFirstPartStory] = useState<boolean>(true);

  const [secondPartStory, setSecondPartStory] = useState<boolean>(false);

  // TutorialSelectComponent booleans:

  const [tutorial0, setTutorial0] = useState<boolean>(false);
  const [tutorial1, setTutorial1] = useState<boolean>(false);
  const [tutorial2, setTutorial2] = useState<boolean>(false);
  const [tutorial3, setTutorial3] = useState<boolean>(false);
  const [tutorial4, setTutorial4] = useState<boolean>(false);
  const [tutorial5, setTutorial5] = useState<boolean>(false);

  // SelectTaskComponent booleans:
  const [task0, setTask0] = useState<boolean>(false);
  const [task1, setTask1] = useState<boolean>(false);
  const [task2, setTask2] = useState<boolean>(false);
  const [task3, setTask3] = useState<boolean>(false);
  const [task4, setTask4] = useState<boolean>(false);
  const [task5, setTask5] = useState<boolean>(false);

  // OtherQueries booleans:

  const [otherTask0, setOtherTask0] = useState<boolean>(false);
  const [otherTask1, setOtherTask1] = useState<boolean>(false);
  const [otherTask2, setOtherTask2] = useState<boolean>(false);
  const [otherTask3, setOtherTask3] = useState<boolean>(false);
  const [otherTask4, setOtherTask4] = useState<boolean>(false);
  const [otherTask5, setOtherTask5] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const showMe: string = "Show me the answer!";

  const importantRules: string = `
  Please pay attention to the following rules: \n
  Although SQL is not case-sensitive, there is a convention that SQL keywords (e.g., SELECT, INSERT, DELETE, FROM, WHERE, JOIN, etc.) are written in uppercase. \n 
  Please close attention to table names and column names - including casing (uppercase, lowercase) and spaces. \n
  In the database structure menu, you'll find all the necessary information about the database, the tables and the types of each column. \n
  For TEXT columns, always put the values in single (' ') or double (" ") quotes. \n
  If you write keywords in lowercase or break any of the rules above during the tasks, you'll receive an error message.
`;

  const [isVisibleTutorial, setIsVisibleTutorial] = useState<boolean>(true);
  const [isVisibleTask, setIsVisibleTask] = useState<boolean>(false);
  const [isVisibleOtherTask, setIsVisibleOtherTask] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <div className="App">
      <header className="App-header">
        <nav className="header-nav">
          <h1 className="header-nav_h1">Learn SQLite</h1>
          <Link className="header-nav_link" to="/">
            {location.pathname === "/" ? "Home" : "Back to the task"}
          </Link>
          <Link className="header-nav_link" to="/db-structure">
            Database structure
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/db-structure" element={<DataBaseStructure />} />
        </Routes>
        {location.pathname !== "/db-structure" && (
          <>
            <TutorialSelectComponent
              firstPartStory={firstPartStory}
              setFirstPartStory={setFirstPartStory}
              setSecondPartStory={setSecondPartStory}
              tutorial0={tutorial0}
              tutorial1={tutorial1}
              tutorial2={tutorial2}
              tutorial3={tutorial3}
              tutorial4={tutorial4}
              tutorial5={tutorial5}
              setTutorial0={setTutorial0}
              setTutorial1={setTutorial1}
              setTutorial2={setTutorial2}
              setTutorial3={setTutorial3}
              setTutorial4={setTutorial4}
              setTutorial5={setTutorial5}
              setTask0={setTask0}
              importantRules={importantRules}
              showMe={showMe}
              isVisibleTutorial={isVisibleTutorial}
              setIsVisibleTutorial={setIsVisibleTutorial}
              setIsVisibleTask={setIsVisibleTask}
              setError={setError}
              percentage={percentage}
              setPercentage={setPercentage}
            />
            <SelectTaskComponent
              secondPartStory={secondPartStory}
              setSecondPartStory={setSecondPartStory}
              task0={task0}
              task1={task1}
              task2={task2}
              task3={task3}
              task4={task4}
              task5={task5}
              setTask0={setTask0}
              setTask1={setTask1}
              setTask2={setTask2}
              setTask3={setTask3}
              setTask4={setTask4}
              setTask5={setTask5}
              importantRules={importantRules}
              isVisibleTask={isVisibleTask}
              setIsVisibleTask={setIsVisibleTask}
              error={error}
              setError={setError}
              showMe={showMe}
              isVisibleOtherTask={isVisibleOtherTask}
              setIsVisibleOtherTask={setIsVisibleOtherTask}
              percentage={percentage}
              setPercentage={setPercentage}
              setOtherTask0={setOtherTask0}
            />
            <OtherQueries
              setFirstPartStory={setFirstPartStory}
              otherTask0={otherTask0}
              otherTask1={otherTask1}
              otherTask2={otherTask2}
              otherTask3={otherTask3}
              otherTask4={otherTask4}
              otherTask5={otherTask5}
              setOtherTask0={setOtherTask0}
              setOtherTask1={setOtherTask1}
              setOtherTask2={setOtherTask2}
              setOtherTask3={setOtherTask3}
              setOtherTask4={setOtherTask4}
              setOtherTask5={setOtherTask5}
              setTutorial0={setTutorial0}
              setTutorial5={setTutorial5}
              setTask5={setTask5}
              importantRules={importantRules}
              isVisibleOtherTask={isVisibleOtherTask}
              setIsVisibleOtherTask={setIsVisibleOtherTask}
              setIsVisibleTutorial={setIsVisibleTutorial}
              percentage={percentage}
              setPercentage={setPercentage}
            />
          </>
        )}
      </main>
    </div>
  );
}
export default App;

/*
TODO: 
- átnézni, mennyire érthető az egész,
git commit -m 'DB Structure tables, and responsive design, favicon, full story (Intro, and main task) gh-pages.'
*/
