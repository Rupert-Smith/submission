import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Invest } from "./pages/Invest";
import { Review } from "./pages/Review";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import "./styles/global.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
        <Routes>
          <Route path="/invest" element={<Invest />} />
        </Routes>
        <Routes>
          <Route path="/review" element={<Review />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
