import React from "react";
import About from "./about";
import Contact from "./contact";
import Experience from "./experience";
import Footer from "./footer";
import Header from "./header";
import Home from "./home";
import LCP from "./lcp";
import Loading from "./loading";
import Projects from "./projects";
import Safari from "./safari";
import Skills from "./skills";

function App(): React.ReactElement {
  return (
    <>
      <Loading />
      <Safari />
      <LCP />
      <Header />
      <Home />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
