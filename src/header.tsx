import React from "react";
import "./css/header.css";
import "./css/menu.css";
import "./css/properties.css";
import "./css/style.css";
import { sleep } from "./utils";

function Header(): React.ReactElement {
  React.useEffect((): void => {
    const header_in_animation: () => Promise<void> =
      async (): Promise<void> => {
        let elements: NodeListOf<Element> = document.querySelectorAll(
          "#header .in_animation"
        );

        for (let i of elements) {
          i.setAttribute("style", "opacity: 1; transform: translateY(0);");
          await sleep(100);
        }
      };

    const menu_events: () => void = (): void => {
      let header_menu: Element | null =
        document.querySelector("#header_div .menu");
      let header_menu_icon: Element | null = document.querySelector(
        "#header_div .menu_icon"
      );
      let menu_div: Element | null = document.querySelector("#menu_div");
      let menu_icon: Element | null = document.querySelector(
        "#menu_div .menu_icon"
      );
      let menu_choices: NodeListOf<Element> =
        document.querySelectorAll("#menu_div .menu a");

      const menu_in: () => void = (): void => {
        if (menu_div) {
          menu_div.setAttribute(
            "style",
            "transform: translateX(0px); box-shadow: -10px 0px 30px rgba(0, 0, 0, 0.7);"
          );
        }
      };

      const menu_out: () => void = (): void => {
        if (menu_div) {
          menu_div.setAttribute(
            "style",
            "transform: translateX(clamp(0px, 100%, 400px)); box-shadow: none;"
          );
        }
      };

      const resize_events: () => void = (): void => {
        if (window.innerWidth < 900) {
          if (header_menu) {
            header_menu.setAttribute("style", "display: none;");
          }
          if (header_menu_icon) {
            header_menu_icon.setAttribute("style", "display: block;");
          }
        } else {
          if (header_menu) {
            header_menu.setAttribute("style", "display: block;");
          }
          if (header_menu_icon) {
            header_menu_icon.setAttribute("style", "display: none;");
          }
          menu_out();
        }
      };

      window.addEventListener("resize", resize_events);
      if (header_menu_icon) {
        header_menu_icon.addEventListener("click", menu_in);
      }
      if (menu_icon) {
        menu_icon.addEventListener("click", menu_out);
      }

      menu_choices.forEach((el: Element): void => {
        el.addEventListener("click", menu_out);
      });

      resize_events();
    };

    const header_events: () => void = (): void => {
      header_in_animation();

      let header_detached: boolean = false;
      let last_scroll_top: number = 0;

      const scroll_event: () => void = (): void => {
        const headerDiv: Element | null = document.querySelector("#header_div");
        const header: Element | null = document.querySelector("#header");
        const homeSectionHi: Element | null =
          document.querySelector("#home_section .hi");

        if (
          headerDiv &&
          homeSectionHi &&
          headerDiv.getBoundingClientRect().bottom <
            homeSectionHi.getBoundingClientRect().top
        ) {
          headerDiv.setAttribute(
            "style",
            "height: 100px; box-shadow: none; pointer-events: none;"
          );
          if (header) {
            header.setAttribute(
              "style",
              "background-color: rgba(16, 29, 48, 0); backdrop-filter: none; -webkit-backdrop-filter: none;"
            );
          }
          header_detached = false;
        } else {
          if (headerDiv) {
            headerDiv.setAttribute(
              "style",
              "height: 70px; box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7); pointer-events: all;"
            );
          }

          if (header) {
            if (navigator.userAgent.indexOf("Firefox") > 0) {
              header.setAttribute(
                "style",
                "backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); background-color: var(--dark_blue)"
              );
            } else {
              header.setAttribute(
                "style",
                "backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); background-color: var(--fade_dark_blue)"
              );
            }
          }
          header_detached = true;
        }
      };

      window.addEventListener("scroll", (): void => {
        scroll_event();
        let new_last_scroll_top: number =
          window.scrollY || document.documentElement.scrollTop;

        const headerDiv: Element | null = document.querySelector("#header_div");

        if (headerDiv) {
          if (new_last_scroll_top > last_scroll_top) {
            if (header_detached) {
              headerDiv.setAttribute("style", "top: -110px; box-shadow: none;");
            }
          } else {
            headerDiv.setAttribute("style", "top: 0px;");

            if (header_detached) {
              headerDiv.setAttribute(
                "style",
                "box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);"
              );
            }
          }
        }

        last_scroll_top = new_last_scroll_top <= 0 ? 0 : new_last_scroll_top;
      });

      window.addEventListener("resize", (): void => {
        scroll_event();
      });

      scroll_event();

      menu_events();
    };

    header_events();
  }, []);

  return (
    <>
      <div id="header_div">
        <header id="header">
          <nav className="nav">
            <div></div>
            <div className="menu">
              <ol>
                <li className="home in_animation">
                  <a className="not_button" href="#home">
                    Accueil
                  </a>
                </li>
                <li className="about in_animation">
                  <a className="not_button" href="#about">
                    A propos
                  </a>
                </li>
                <li className="projects in_animation">
                  <a className="not_button" href="#projects">
                    Projets
                  </a>
                </li>
                <li className="skills in_animation">
                  <a className="not_button" href="#skills">
                    Compétences
                  </a>
                </li>
                <li className="contact in_animation">
                  <a className="button" href="#contact">
                    <p>Me contacter</p>
                    <svg
                      className="button_arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 17.69 17.39"
                    >
                      <g>
                        <path className="path_1" d="M8.9 12.4 L8.9 12.4" />
                        <path className="path_2" d="M16.2 5 8.9 12.4 1.5 5" />
                      </g>
                    </svg>
                  </a>
                </li>
              </ol>
            </div>
            <svg
              className="menu_icon"
              viewBox="0 0 140 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="10" x2="130" y2="10" />
              <line x1="30" y1="50" x2="130" y2="50" />
              <line x1="50" y1="90" x2="130" y2="90" />
            </svg>
          </nav>
        </header>
      </div>
      <div id="menu_div">
        <svg
          className="menu_icon"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="10" y1="10" x2="90" y2="90" />
          <line x1="10" y1="90" x2="90" y2="10" />
        </svg>
        <div className="menu">
          <ol>
            <li className="home">
              <a className="not_button" href="#home">
                Accueil
              </a>
            </li>
            <li className="about">
              <a className="not_button" href="#about">
                A propos
              </a>
            </li>
            <li className="projects">
              <a className="not_button" href="#projects">
                Projets
              </a>
            </li>
            <li className="skills">
              <a className="not_button" href="#skills">
                Compétences
              </a>
            </li>
            <li className="contact">
              <a className="button" href="#contact">
                <p>Me contacter</p>
                <svg
                  className="button_arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 17.69 17.39"
                >
                  <g>
                    <path className="path_1" d="M8.9 12.4 L8.9 12.4" />
                    <path className="path_2" d="M16.2 5 8.9 12.4 1.5 5" />
                  </g>
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}

export default Header;
