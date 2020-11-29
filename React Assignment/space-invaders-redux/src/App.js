import "./App.css";
import { Provider } from "react-redux";
// import store from "./redux/store";
import Game from "./components/gameContainer";

function App() {
  return (
    <Provider>
      <div className="App">
        <Game />
      </div>
    </Provider>
  );
}

export default App;
