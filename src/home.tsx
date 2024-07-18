import React from "react";
import "./css/home.css";
import "./css/properties.css";
import "./css/style.css";

import Particles from "./Particles";
import { is_in_viewport, sleep } from "./utils";

export default function Home(): React.ReactElement {
  const birthdate = new Date(2004, 11, 15);
  const age: number = Math.floor(
    (Date.now() - birthdate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  const home_in_animations: () => void = (): void => {
    let done: boolean = false;
    let elements: NodeListOf<HTMLElement> = document.querySelectorAll(
      "#home_section .in_animation"
    );
    let section: HTMLElement | null = document.querySelector("#home_section");

    const in_animation_check: () => Promise<void> = async (): Promise<void> => {
      if (!done && is_in_viewport(section)) {
        for (let i of elements) {
          i.style.opacity = "1";
          i.style.transform = "translateY(0)";
          await sleep(300);
        }

        done = true;
      }
    };

    window.addEventListener("scroll", (): void => {
      in_animation_check();
    });

    window.addEventListener("resize", (): void => {
      in_animation_check();
    });

    in_animation_check();
  };

  const home_events: () => void = (): void => {
    const content: HTMLElement | null = document.querySelector("#home_section .content");
    if (content) {
      const rect: DOMRect = content.getBoundingClientRect();
      const section: HTMLElement | null = document.querySelector("#home_section");
      if (section) {
        section.style.minHeight = rect.height + 90 + "px";
      }
    }
  };

  React.useEffect((): void => {
    home_in_animations();
    home_events();
  }, []);

  return (
    <>
      <a
        href="#home"
        id="home"
      >
        {" "}
      </a>
      <section
        className="section"
        id="home_section"
      >
        <div id="particles">
          <Particles />
        </div>
        <div className="content">
          <span className="hi in_animation">Hi, my name is</span>
          <h1 className="name in_animation">Théo Fabiano.</h1>
          <p className="bio in_animation">
            I'm an {age}-year-old French student at the{" "}
            <a
              className="link"
              href="https://www.epitech.eu/"
              target="_blank"
              rel="noreferrer"
            >
              Epitech Technology
            </a>{" "}
            computer school.
          </p>
          <div className="home_buttons">
            <div className="home_button in_animation">
              <a
                className="button"
                href="#about"
              >
                <p>Get Started</p>
                <svg
                  className="button_arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 17.69 17.39"
                >
                  <g>
                    <path
                      className="path_1"
                      d="M8.9 12.4 L8.9 12.4"
                    />
                    <path
                      className="path_2"
                      d="M16.2 5 8.9 12.4 1.5 5"
                    />
                  </g>
                </svg>
              </a>
            </div>
            <div className="home_button in_animation">
              <a
                className="button"
                href="CV.pdf"
                download="CV_Theo_Fabiano.pdf"
              >
                <p>Download Curriculum Vitae</p>
                <svg
                  className="button_arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 17.69 17.39"
                >
                  <g>
                    <path
                      className="path_1"
                      d="M8.9 12.4 L8.9 12.4"
                    />
                    <path
                      className="path_2"
                      d="M16.2 5 8.9 12.4 1.5 5"
                    />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
