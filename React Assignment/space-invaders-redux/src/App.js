import "./App.css";
import { applyMiddleware } from "redux";
import { Provider } from "react-redux";
import store from "./redux/store";
import Game from "./components/gameContainer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Game />
      </div>
    </Provider>
  );
}

export default App;
