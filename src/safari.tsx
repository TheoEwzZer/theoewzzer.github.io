import React from "react";
import "./css/properties.css";
import "./css/style.css";
import { is_safari } from "./utils";

export default function Safari(): React.ReactElement {
  React.useEffect((): void => {
    const safari_warning: HTMLElement | null =
      document.querySelector("#safari_warning");
    const skills_section: HTMLElement | null = document.querySelector(
      "#skills_section .box"
    );
    if (safari_warning && !is_safari()) {
      safari_warning.style.display = "none";
    } else if (skills_section) {
      skills_section.classList.add("safari_fix");
    }
  }, []);

  return (
    <div id="safari_warning">
      <p>
        You are using Safari. This site is not optimized for this browser.
        Please use another browser such as Chrome or Firefox.
      </p>
    </div>
  );
}
