import React from "react";
import About from "./about";
import Contact from "./contact";
import Home from "./home";
import Skills from "./skills";
import Footer from "./footer";
import Projects from "./projects";

function App(): React.ReactElement {
  return (
    <>
      <Home />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
