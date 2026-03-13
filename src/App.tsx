import Weather from "./components/Weather";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="bg-secondary min-h-screen py-5 px-2">
      <div className="max-w-150 mx-auto bg-primary rounded-lg">
        <Toaster />
        <Weather />
        <Footer />
      </div>
    </div>
  );
}
