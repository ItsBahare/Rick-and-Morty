import { HeartIcon } from "@heroicons/react/24/outline";
function Navbar() {
  return (
    <div className="navbar-center">
      <div className="navbar">
        <ul className="navbar_list">
          <li className="navbar_item">logo</li>
          <li className="navbar_item">
            <input
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
