import React, { useEffect } from "react";
import { is_in_viewport, sleep } from "./utils";

import "./css/about.css";
import "./css/properties.css";
import "./css/style.css";

export default function About(): React.ReactElement {
  useEffect((): (() => void) => {
    let done: boolean = false;
    const elements: NodeListOf<Element> = document.querySelectorAll(
      "#about_section .in_animation"
    );
    const section: Element | null = document.querySelector(
      "#about_section .photo"
    );

    const inAnimationCheck: () => Promise<void> = async (): Promise<void> => {
      if (!done && section && is_in_viewport(section as HTMLElement)) {
        for (let i of elements) {
          (i as HTMLElement).style.clipPath = "circle(50%)";
          await sleep(300);
        }
        done = true;
      }
    };

    window.addEventListener("scroll", inAnimationCheck);
    window.addEventListener("resize", inAnimationCheck);

    inAnimationCheck();

    return (): void => {
      window.removeEventListener("scroll", inAnimationCheck);
      window.removeEventListener("resize", inAnimationCheck);
    };
  }, []);

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
              problems. I enjoy taking on challenges and explore new approaches
              to create innovative solutions. I'm also curious and always on the
              lookout for new new knowledge to improve my skills.
              <br />
              <br />
              I've had the opportunity to work on many exciting projects during
              my during my studies, particularly in artificial intelligence,
              video game development and other areas of computer science{" "}
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
            <div className="photo">
              <img
                className="in_animation"
                src="photo.jpg"
                alt="Me"
                width="760px"
                height="760px"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="section_end about_end"></div>
    </>
  );
}
