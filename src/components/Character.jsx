import { character } from "../../data/data";
function Character() {
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
          <button className="favorite info">
            <strong>Add to Favorite</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Character;
