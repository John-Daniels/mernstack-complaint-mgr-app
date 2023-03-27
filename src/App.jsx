import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import BackgroundWrapper from "./components/BackgroundWrapper";
import PageNotFound from "./pages/PageNotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Student from "./pages/Student";

function App() {
  return (
    <Router>
      <BackgroundWrapper>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/student" element={<Student />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BackgroundWrapper>
    </Router>
  );
}

export default App;
