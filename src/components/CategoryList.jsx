import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CategoryList({ allCharacter, handleEyeClick, selectedId }) {
  return (
    <>
      <div className="category-list">
        {allCharacter.map((a) => (
          <CategoryItem
            key={a.id}
            a={a}
            handleEyeClick={handleEyeClick}
            selectedId={selectedId}
          >
            <button onClick={() => handleEyeClick(a.id)}>
              {selectedId === a.id ? (
                <EyeSlashIcon className="icon eye" />
              ) : (
                <EyeIcon className="icon eye" />
              )}
            </button>
          </CategoryItem>
        ))}
      </div>
    </>
  );
}

export default CategoryList;

export function CategoryItem({ a, children }) {
  return (
    <>
      <div className="category_item">
        <div className="category_item__list">
          <img src={a.image} alt={a.id} />
          <Name a={a} />
          <StatusCharacter a={a} />
          {children}
        </div>
      </div>
    </>
  );
}
function Name({ a }) {
  return (
    <h3 className="name">
      <span>{a.gender === "Male" ? "🧑🏻" : "👩🏻"}</span>
      <span>{a.name}</span>
    </h3>
  );
}
function StatusCharacter({ a }) {
  return (
    <div className=" list-item__info info">
      <span>{a.status === "Dead" ? "🔴" : "🟢"}</span>
      <span>{a.status}-</span>
      <span>{a.species}</span>
    </div>
  );
}
