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
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("FAVORITES")) || [],
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${search}`,
          { signal },
        );
        setAllCharacter(data.results.slice(0, 6));
      } catch (err) {
        if (!axios.isCancel()) {
          setAllCharacter([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [search]);

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorites));
  }, [favorites]);

  const handleEyeClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleFavorites = (cha) => {
    setFavorites((prev) => [...prev, cha]);
  };
  const handleDeleteFavorite = (id) => {
    setFavorites(favorites.filter((i) => i.id !== id));
  };
  const isAddedToFavorite = favorites.map((i) => i.id).includes(selectedId);

  return (
    <div>
      <Toaster />
      <Navbar>
        <InputSearch search={search} setSearch={setSearch} />
        <HeartButton
          favorites={favorites}
          handleDeleteFavorite={handleDeleteFavorite}
        />
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
