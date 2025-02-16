import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFround from "./components/NotFround";
import RandomPickly from "./components/RandomPickly";
import GuestWho from "./components/GuestWho";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/random-pickly" element={<RandomPickly />} />
        <Route path="/guest-who" element={<GuestWho />} />
        <Route path="*" element={<NotFround />} />
      </Routes>
    </Router>
  );
};

export default App;
