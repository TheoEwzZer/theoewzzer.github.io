import React from "react";
import About from "./about";
import Contact from "./contact";
import Home from "./home";
import Skills from "./skills";
import Footer from "./footer";
import Projects from "./projects";
import Header from "./header";
import LCP from "./lcp";
import Safari from "./safari";
import Loading from "./loading";
import Experience from "./experience";

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
