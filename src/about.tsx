import React from "react";
import "./css/about.css";
import "./css/properties.css";
import "./css/style.css";

function About(): React.ReactElement {
  return (
    <>
      <a href="#about" id="about">
        {" "}
      </a>
      <section className="section" id="about_section">
        <div className="content">
          <span className="section_title">Qui suis-je ?</span>
          <div className="about_content">
            <p className="p_1">
              Je suis un étudiant en informatique passionné par le
              développement. Actuellement, je suis étudiant à Epitech depuis
              2022 où j'ai pu acquérir des compétences solides en programmation
              en langage C et en gestion de projets.
              <br />
              <br />
              Au cours de mes études, j'ai développé une passion pour la
              résolution de problèmes complexes. J'aime relever des défis et
              explorer de nouvelles approches pour créer des solutions
              innovantes. Je suis également curieux et toujours en quête de
              nouvelles connaissances pour améliorer mes compétences.
              <br />
              <br />
              J'ai eu l'occasion de réaliser de nombreux projets passionnants au
              cours de mes études, notamment en intelligence artificielle, dans
              le développement de jeux vidéo et dans d'autres domaines de
              l'informatique{" "}
              <i>
                (Veuillez consulter ma partie{" "}
                <a className="link" href="#projects">
                  projet
                </a>{" "}
                sur ce site pour plus de détails)
              </i>
              . <br />
              <br />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
