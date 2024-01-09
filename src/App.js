import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./SurevyForm/Landings/Landing";
import Main from "./SurevyForm/FormComponents/Main";
import "./App.css"
import Greetings from "./SurevyForm/GreetingsComponents/Greetings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/greetings" element={<Greetings/>} />
      </Routes>
    </Router>
  );
}

export default App;
