import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      <NavBar />
      <main className="mx-auto max-w-5xl p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/genres" element={<GenresPages />} /> */}
        </Routes>
      </main>
     <footer>
  <Footer />
</footer>
    </BrowserRouter>
  );
}

export default App;
