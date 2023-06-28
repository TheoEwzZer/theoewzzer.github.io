import React from "react";
import About from "./about";
import Contact from "./contact";
import Home from "./home";
import Skills from "./skills";

function App(): React.ReactElement {
  return (
    <>
      <Home />
      <About />
      <Skills />
      <Contact />
    </>
  );
}

export default App;
