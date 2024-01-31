import IconLogo from "./IconLogo";
import { HeartIcon } from "@heroicons/react/24/outline";
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
  return (
    <li className="navbar_item">
      <IconLogo />
    </li>
  );
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

export function HeartButton({ favorites }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{favorites.length}</span>
    </button>
  );
}
