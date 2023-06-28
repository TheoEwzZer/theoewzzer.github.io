import React from "react";
import About from "./about";
import Contact from "./contact";
import Home from "./home";

function App(): React.ReactElement {
  return (
    <>
      <Home />
      <About />
      <Contact />
    </>
  );
}

export default App;
