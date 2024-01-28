import { useEffect, useState } from "react";
// import { allCharacters } from "../data/data";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Character from "./components/Character";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [allCharacter, setAllCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${search}`,
        );
        setAllCharacter(data.results.slice(0, 6));
      } catch (err) {
        setAllCharacter([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [search]);

  const handleEyeClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <Toaster />
      <Navbar search={search} setSearch={setSearch} />
      <Main>
        {isLoading ? (
          <Loading />
        ) : (
          <CategoryList
            allCharacter={allCharacter}
            handleEyeClick={handleEyeClick}
            selectedId={selectedId}
          />
        )}
        <Character selectedId={selectedId} />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="list">{children}</div>;
}
