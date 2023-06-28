import React from "react";
import "./css/home.css";
import "./css/properties.css";
import "./css/style.css";

import Particles from "./Particles";

function Home(): React.ReactElement {
  const birthdate = new Date(2004, 11, 15);
  const age: number = Math.floor(
    (Date.now() - birthdate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <section className="section" id="home_section">
      <div id="particles">
        <Particles />
      </div>
      <div className="content">
        <span className="hi">Je m'appelle</span>
        <span className="name">Théo Fabiano.</span>
        <p className="bio">
          Je suis un étudiant français de {age} ans à l'école d'informatique
          <a
            className="link"
            href="https://www.epitech.eu/"
            target="_blank"
            rel="noreferrer"
          >
            Epitech Technology
          </a>
        </p>
      </div>
    </section>
  );
}

export default Home;
