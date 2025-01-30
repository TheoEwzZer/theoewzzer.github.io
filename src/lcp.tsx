import React from "react";
import "./css/properties.css";
import "./css/style.css";

export default function Lcp(): React.ReactElement {
  React.useEffect((): void => {
    window.onload = (): void => {
      setTimeout((): void => {
        const lcpElement = document.querySelector("#lcp") as HTMLElement | null;
        if (lcpElement) {
          lcpElement.style.display = "none";
        }
      }, 100);
    };
  }, []);

  return (
    <div id="lcp">
      <p>LCP</p>
    </div>
  );
}
