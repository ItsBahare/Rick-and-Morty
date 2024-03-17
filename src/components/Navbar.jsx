import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { CategoryItem } from "./CategoryList";
function Navbar({ children }) {
  return (
    <div className="navbar-center">
      <div className="navbar">
        <ul className="navbar_list">
          <Logo />
          {children}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

export function Logo() {
  return <li className="navbar_item">Logo</li>;
}

export function InputSearch({ search, setSearch }) {
  return (
    <li className="navbar_item">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="input input-search"
        placeholder="search ..."
      />
    </li>
  );
}

export function HeartButton({ favorites, handleDeleteFavorite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List of Favorites">
        {favorites.map((a) => (
          <>
            <CategoryItem a={a} key={a.id}>
              <button
                className="icon eye"
                onClick={() => handleDeleteFavorite(a.id)}
              >
                <TrashIcon />
              </button>
            </CategoryItem>
          </>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}
