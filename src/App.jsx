import { useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Character from "./components/Character";
import Navbar, { HeartButton, InputSearch } from "./components/Navbar";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import useCharacters from "./components/hooks/useCharacter";
import useLocalStorage from "./components/hooks/useLocalStorage";

function App() {
  const [search, setSearch] = useState("");
  const { isLoading, allCharacter } = useCharacters(search);

  const [selectedId, setSelectedId] = useState(null);

  const [favorites, setFavorites] = useLocalStorage("FAVORITES", []);

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
