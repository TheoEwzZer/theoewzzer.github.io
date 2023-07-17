import React from "react";
import "./css/properties.css";
import "./css/style.css";
import "./css/footer.css";
import packageJson from "../package.json";

export default function Footer(): React.ReactElement {
  const [currentYear, setCurrentYear] = React.useState<number>(0);
  const version: string = packageJson.version;

  React.useEffect((): void => {
    const date: Date = new Date();
    setCurrentYear(date.getFullYear());
  }, []);

  return (
    <>
      <a href="#footer" id="footer">
        {" "}
      </a>
      <footer className="section" id="footer_section">
        <div className="content">
          <div className="footer_content">
            <a
              className="footer_licence"
              href="https://github.com/TheoEwzZer/theoewzzer.github.io/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                Version {version} © {currentYear} Théo Fabiano
              </span>
              <img
                src="/shapes/license.svg"
                alt="license"
                width="20px"
                height="20px"
              />
              <span>MIT license</span>
            </a>
            <a
              className=""
              href="https://github.com/TheoEwzZer/theoewzzer.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              <span>See the repository on GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31">
                <g>
                  <path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19" />
                </g>
              </svg>
            </a>
          </div>
          <div className="footer_content">
            <p>
              Inspired by Angel Uriot's Portfolio using only TypeScript, CSS and
              React. Thank you for reading to the end, I hope you enjoyed this
              site.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
