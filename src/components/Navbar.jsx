import Logo from "../components/Logo";
import { HeartIcon } from "@heroicons/react/24/outline";
function Navbar({ search, setSearch }) {
  return (
    <div className="navbar-center">
      <div className="navbar">
        <ul className="navbar_list">
          <li className="navbar_item">
            <Logo />
            {/* logo */}
          </li>
          <li className="navbar_item">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="input input-search"
              placeholder="search ..."
            />
          </li>
          <button className="heart">
            <HeartIcon className="icon" />
            <span className="badge">4</span>
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
