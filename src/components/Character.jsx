import { character, episodes } from "../../data/data";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

function Character() {
  return (
    <div>
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
            <button className="favorite info">
              <strong>Add to Favorite</strong>
            </button>
          </div>
        </div>
      </div>

      <div className="list-of-epis">
        <div className="list-of-epi">
          <h2 className="title-epi">List Of Episodes:</h2>
          <button>
            <ArrowDownCircleIcon className="arrow-icon" />
          </button>
        </div>
        <div>
          {episodes.map((n, index) => (
            <Episodes key={n.id} n={n} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Character;

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
