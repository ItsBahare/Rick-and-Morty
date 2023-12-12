import { EyeIcon } from "@heroicons/react/24/solid";
import { allCharacters } from "../../data/data";
function CategoryList() {
  return (
    <div className="category-list">
      {allCharacters.map((a) => (
        <CategoryItem key={a.id} a={a} />
      ))}
    </div>
  );
}

export default CategoryList;

function CategoryItem({ a }) {
  return (
    <>
      <div className="category_item" key={a.id}>
        <div className="category_item__dox">
          <div className="category_item__box-details">
            <img src={a.image} alt={a.id} />
            <h3 className="name">
              <span>{a.gender === "Male" ? "🧑🏻" : "👩🏻"}</span>
              <span>{a.name}</span>
            </h3>
            <div className=" list-item__info info">
              <span>{a.status === "Dead" ? "🔴" : "🟢"}</span>
              <span>{a.status}-</span>
              <span>{a.species}</span>
            </div>
            <p>
              <EyeIcon className="icon eye" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
