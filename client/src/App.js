import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Builds from "./pages/Builds";
import Other from "./pages/Other";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/builds" element={<Builds />} />
            <Route path="/other" element={<Other />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
