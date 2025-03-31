import React, { useState } from "react";
import "./App.css";
import { createInferTypeNode } from "typescript";
import TutorialSelectComponent from "./Components/TutorialSelectComponent.tsx";
import SelectTaskComponent from "./Components/SelectTaskComponent.tsx";
import DataBaseStructure from "./Components/DataBaseStructure.tsx";
import OtherQueries from "./Components/OtherQueries.tsx";

function App() {
  const [error, setError] = useState<string | null>(null);
  const showMe: string = "Show me the answer!";

  const [isVisibleTutorial, setIsVisibleTutorial] = useState<boolean>(true);
  const [isVisibleTask, setIsVisibleTask] = useState<boolean>(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn SQLite</h1>
      </header>
      <main>
        <OtherQueries/>
        <DataBaseStructure/>
        <TutorialSelectComponent
          showMe={showMe}
          isVisibleTutorial={isVisibleTutorial}
          setIsVisibleTutorial={setIsVisibleTutorial}
          setIsVisibleTask={setIsVisibleTask}
          setError={setError}
        />
        <SelectTaskComponent
          isVisibleTask={isVisibleTask}
          setIsVisibleTask={setIsVisibleTask}
          error={error}
          setError={setError}
          showMe={showMe}
        />
      </main>
    </div>
  );
}
export default App;

/*
TODO: 
  - nav létrehozása,
  - feladatok sorrendbe állítása, melyik pakk melyik után jöjjön,
  - utána az egyik pakkból a másikba átléptetni a felhasználót,
  - ha végezett az egésszel, minden lenullázni, és újrakezdeni,
  - átnézni, mennyire érthető az egész,
  - az Session táblához is készíteni struktúrát,
  - az egészet lefordítani,
*/