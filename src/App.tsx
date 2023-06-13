import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
