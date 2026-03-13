import Weather from "./components/Weather";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-secondary min-h-screen py-5 px-2">
      <div className="max-w-150 mx-auto bg-primary rounded-lg">
        <Weather />
        <Footer />
      </div>
    </div>
  );
}
