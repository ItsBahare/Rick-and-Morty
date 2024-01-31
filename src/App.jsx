import { useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Character from "./components/Character";
import Navbar, { HeartButton, InputSearch } from "./components/Navbar";
import Loading from "./components/Loading";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [allCharacter, setAllCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);

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
  const handleFavorites = (cha) => {
    setFavorites((prev) => [...prev, cha]);
  };

  const isAddedToFavorite = favorites.map((i) => i.id).includes(selectedId);

  return (
    <div>
      <Toaster />
      <Navbar>
        <InputSearch search={search} setSearch={setSearch} />
        <HeartButton favorites={favorites} />
      </Navbar>
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
        <Character
          selectedId={selectedId}
          handleFavorites={handleFavorites}
          isAddedToFavorite={isAddedToFavorite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="list">{children}</div>;
}
