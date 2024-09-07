import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import CallPage from "./components/CallPage/CallPage";
import NoMatch from "./components/NoMatch/NoMatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<CallPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
