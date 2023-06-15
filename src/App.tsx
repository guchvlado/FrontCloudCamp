import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
import { CreatePage } from "./pages/CreatePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
