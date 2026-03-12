import "./App.css";
import Weather from "./components/Weather";

export default function App() {
  return (
    <div className="bg-secondary py-5">
      <div className="max-w-150 mx-auto bg-primary rounded-lg">
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
