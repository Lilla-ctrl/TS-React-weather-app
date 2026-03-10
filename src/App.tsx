import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather />
        <footer>
          Coded by Lilla,{" "}
          <a
            href="https://github.com/Lilla-ctrl/react-weather-app"
            target="_blank"
            rel="noreferrer"
          >
            open-source code
          </a>{" "}
          on GitHub.
        </footer>
      </div>
    </div>
  );
}
