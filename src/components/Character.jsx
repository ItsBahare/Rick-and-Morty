import { useEffect, useState } from "react";
// import { episodes } from "../../data/data";
import Loading from "../components/Loading.jsx";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";

function Character({ selectedId, handleFavorites, isAddedToFavorite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episode, setEpisode] = useState([]);
  const [sortBy, setSortBy] = useState(true);

  let sortEpisodes;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`,
        );
        setCharacter(data);
        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`,
        );
        setEpisode([episodeData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading) return <Loading />;

  if (!character || !selectedId)
    return (
      <div style={{ marginTop: "2.5rem", color: " var(--slate-300)" }}>
        Please select your Character.
      </div>
    );

  if (sortBy) {
    sortEpisodes = [...episode].sort(
      (a, b) => new Date(a.created) - new Date(b.created),
    );
  } else {
    sortEpisodes = [...episode].sort(
      (a, b) => new Date(b.created) - new Date(a.created),
    );
  }

  return (
    <div>
      <CharacterInfo
        character={character}
        handleFavorites={handleFavorites}
        isAddedToFavorite={isAddedToFavorite}
      />
      <div className="episodes">
        <div className="list-of-epi">
          <h2>List Of Episodes:</h2>
          <button onClick={() => setSortBy((is) => !is)}>
            <ArrowUpCircleIcon
              className="arrow-icon"
              style={{ rotate: sortBy ? "0deg" : "180deg" }}
            />
          </button>
        </div>
        <div style={{ height: "18rem", overflowY: "auto" }}>
          {sortEpisodes.map((n, index) => (
            <Episodes key={n.id} n={n} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Character;

function CharacterInfo({ character, isAddedToFavorite, handleFavorites }) {
  return (
    <div className="character-box">
      <div className="character-box_img">
        <img src={character.image} alt={character.id} />
      </div>
      <div className="character-box_details">
        <h3 className="name">
          <span>{character.gender === "Male" ? "🧑🏻" : "👩🏻"}</span>
          <span>{character.name}</span>
        </h3>
        <div className="status info">
          <span>{character.status === "Dead" ? "🔴" : "🟢"}</span>
          <span>{character.status}-</span>
          <span>{character.species}</span>
          <p className="status-location">Last known location:</p>
          <h4>{character.location.name}</h4>
          <div className="action">
            {isAddedToFavorite ? (
              <p>Already Added To Favorites ✅</p>
            ) : (
              <button
                className="favorite info"
                onClick={() => handleFavorites(character)}
              >
                <strong>add to your favorite</strong>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Episodes({ n, index }) {
  return (
    <div className="list-of-epi">
      <div className="epi-detail">
        <span>{String(index + 1).padStart(2, "0")} - </span>
        <span>{n.episode} : </span>
        <span>
          <strong>{n.name}</strong>
        </span>
      </div>
      <div className="epi-detail_date">
        <span className="badge-data">
          <strong>{n.air_date}</strong>
        </span>
      </div>
    </div>
  );
}
