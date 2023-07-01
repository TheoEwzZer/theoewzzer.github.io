import React from "react";
import "./css/contact.css";
import "./css/properties.css";
import "./css/style.css";

function Contact(): React.ReactElement {
  const LinkedIn = {
    "--size": "150px",
  } as React.CSSProperties;
  const github = {
    "--size": "115px",
  } as React.CSSProperties;
  const mail = {
    "--size": "220px",
  } as React.CSSProperties;

  return (
    <>
      <a href="#contact" id="contact">
        {" "}
      </a>
      <section className="section" id="contact_section">
        <div className="content leaning">
          <span className="section_title">How to contact me?</span>
          <div className="contact_content">
            <div className="social_line">
              <a
                className="social_link"
                href="https://www.linkedin.com/in/theo-fabiano/"
                target="_blank"
                style={LinkedIn}
                rel="noreferrer"
              >
                <img
                  src="/shapes/contact/Linkedin.svg"
                  alt="linkedin"
                  width="50px"
                  height="50px"
                />
                <div className="social_text">
                  <span>in/Théo-Fabiano</span>
                </div>
              </a>
            </div>
            <div className="social_line">
              <a
                className="social_link"
                href="https://github.com/TheoEwzZer"
                target="_blank"
                style={github}
                rel="noreferrer"
              >
                <img
                  src="/shapes/contact/GitHub.svg"
                  alt="github"
                  width="50px"
                  height="50px"
                />
                <div className="social_text">
                  <span>TheoEwzZer</span>
                </div>
              </a>
            </div>
            <div className="social_line">
              <a
                className="social_link"
                href="mailto: theo.fabiano@epitech.eu"
                target="_blank"
                style={mail}
                rel="noreferrer"
              >
                <img
                  src="/shapes/contact/Mail.svg"
                  alt="mail"
                  width="50px"
                  height="50px"
                />
                <div className="social_text">
                  <span>theo.fabiano@epitech.eu</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
