import "./App.css";
import Weather from "./components/Weather";

export default function App() {
  return (
    <div className="bg-secondary">
      <div className="max-w-150 mx-auto bg-primary">
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
