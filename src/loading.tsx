import React from "react";
import "./css/properties.css";
import "./css/style.css";

export default function Loading(): React.ReactElement {
  React.useEffect((): void => {
    const loading: HTMLElement | null =
      document.querySelector("#loading_screen");
    if (loading) {
      loading.style.display = "none";
    }
  }, []);

  return <div id="loading_screen"></div>;
}
