import { useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Character from "./components/Character";
import Navbar from "./components/Navbar";

function App() {
  const [allCharacter, setAllCharacter] = useState(allCharacters);

  return (
    <div>
      <Navbar />
      <Main>
        <CategoryList allCharacter={allCharacter} />
        <Character />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="list">{children}</div>;
}
