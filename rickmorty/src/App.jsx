import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentFrame from "./components/ContentFrame/ContentFrame";
import ProfileFrame from "./components/ProfileFrame/ProfileFrame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContentFrame />} />
        <Route path="/profile" element={<ProfileFrame />} />
      </Routes>
    </Router>
  );
}

export default App;
