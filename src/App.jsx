import { useEffect, useState } from "react";
// import { allCharacters } from "../data/data";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Character from "./components/Character";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

function App() {
  const [allCharacter, setAllCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setAllCharacter(data.results.slice(0, 6));
    }
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <Main>
        {isLoading ? <Loading /> : <CategoryList allCharacter={allCharacter} />}
        <Character />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="list">{children}</div>;
}
