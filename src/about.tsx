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
          <span className="section_title">Who am I?</span>
          <div className="about_content">
            <p className="p_1">
              I'm a computer science student with a passion for development. I
              have been a student at Epitech since 2022, where I acquired solid
              skills in programming and project management.
              <br />
              <br />
              During my studies, I developed a passion for solving complex
              solving complex problems. I enjoy taking on challenges and explore
              new approaches to create innovative solutions. innovative
              solutions. I'm also curious and always on the lookout for new new
              knowledge to improve my skills.
              <br />
              <br />
              I've had the opportunity to work on many exciting projects during
              my during my studies, particularly in artificial intelligence,
              video game game development and other areas of computer science.
              computer science{" "}
              <i>
                (see the{" "}
                <a className="link" href="#projects">
                  project
                </a>{" "}
                part of the site)
              </i>
              . <br />
              <br />
            </p>
          </div>
        </div>
      </section>
      <div className="section_end about_end"></div>
    </>
  );
}

export default About;
