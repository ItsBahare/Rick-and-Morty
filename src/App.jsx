import "./App.css";
import CategoryList from "./components/CategoryList";
import Character from "./components/Character";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="list">
        <CategoryList />
        <Character />
      </div>
    </div>
  );
}

export default App;
