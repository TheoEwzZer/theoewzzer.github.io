import React from "react";
import "./css/other_projects.css";
import "./css/projects.css";
import "./css/properties.css";
import "./css/style.css";
import read_json, { is_in_viewport, is_safari, sleep } from "./utils";

interface IProjects {
  projects: Project[];
}

interface Project {
  date: string;
  type: string;
  title: string;
  description: string;
  tags: Tag[];
  links: string[];
  image: string;
  categories: string[];
}

interface Tag {
  name: string;
  url: string;
}

function Projects(): React.ReactElement {
  const [data, setData] = React.useState<IProjects | null>(null);

  let sort_by: string = "Date";
  let done: Boolean[] = [];
  let elements: NodeListOf<HTMLElement> = document.querySelectorAll(
    "#projects_section .in_animation"
  );

  const in_animation_check: () => Promise<void> = async (): Promise<void> => {
    for (let i: number = 0; i < elements.length; i++)
      if (!done[i] && is_in_viewport(elements[i])) {
        if (elements[i].classList.contains("other_project")) {
          await sleep(100);
        }
        elements[i].style.opacity = "1";
        elements[i].style.transform = "translateY(0)";
        done[i] = true;
        await sleep(300);
      }
  };

  window.addEventListener("scroll", (): void => {
    in_animation_check();
  });

  window.addEventListener("resize", (): void => {
    in_animation_check();
  });

  React.useEffect((): void => {
    const fetchData: () => void = (): void => {
      read_json("/jsons/projects.json", (data: IProjects): void => {
        setData(data);
      });
    };
    fetchData();
  }, []);

  const add_project: (
    project: Project,
    inverted: boolean,
    featured: boolean
  ) => void = (
    project: Project,
    inverted: boolean,
    featured: boolean
  ): void => {
    if (data) {
      let tags: string = "";
      let project_date: any = project.date;
      if (project.date.length > 4) {
        project_date = new Date(project.date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
        });
        project_date =
          project_date.charAt(0).toUpperCase() + project_date.slice(1);
      }

      const projectsContent: HTMLElement | null = document.querySelector(
        "#projects_section .projects_content"
      );

      const otherProjectsContent: HTMLElement | null = document.querySelector(
        "#projects_section .other_projects_content"
      );

      if (featured) {
        for (let tag of project.tags)
          tags += `<a href="${tag.url}" target="_blank">${tag.name}</a>`;

        if (window.innerWidth > 780 && projectsContent) {
          projectsContent.innerHTML +=
            `
					<div class="in_animation project ${inverted ? "inverted" : ""}">
						<div class="project_text">
							<div class="type">
								<span>${project_date}</span>
								<span>•</span>
								<span>${project.type}</span>
							</div>
							<a class="project_title" href="${project.links[0]}" target="_blank">${
              project.title
            }</a>
							<div class="text"><p>${project.description}</p></div>
							<div class="tags">` +
            tags +
            `</div>
							<div class="links">` +
            (project.links[1] === "none"
              ? ""
              : `
								<a class="github" href="${project.links[1]}" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31"><g><path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"/></g></svg>
									<span class="bubble">Voir le code</span>
								</a>
								`) +
            (project.links[2] === "none"
              ? ""
              : `
								<a class="test" href="${project.links[2]}" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.09 18.64"><g><path d="M14.55 7.52 4.62 1.78A2.08 2.08 0 0 0 1.5 3.58V15.05a2.08 2.08 0 0 0 3.12 1.8l9.93-5.73A2.08 2.08 0 0 0 14.55 7.52Z"/></g></svg>
									<span class="bubble">Tester le programme</span>
								</a>
								`) +
            `
							</div>
						</div>
						<div class="project_view">
							<a ${is_safari() ? 'class="safari_fix"' : ""} href="${
              project.links[0]
            }" target="_blank">
								<img src="${
                  project.image
                }" alt="${project.title.toLowerCase()} image" width="1440px" height="810px"/>
								` +
            `
							</a>
						</div>
					</div>`;
        } else if (projectsContent) {
          projectsContent.innerHTML +=
            `
					<div class="in_animation project ${
            is_safari() ? "safari_fix" : ""
          }" style="background-image: url(${project.image});">
						<div class="project_text"">
							<div class="type">
								<span>${project.type}</span>
								<span>•</span>
								<span>${project_date}</span>
							</div>
							<a class="project_title" href="${project.links[0]}" target="_blank">${
              project.title
            }</a>
							<div class="text"><p>${project.description}</p></div>
							<div class="tags">` +
            tags +
            `</div>
							<div class="links">` +
            (project.links[1] === "none"
              ? ""
              : `
								<a class="github" href="${project.links[1]}" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31"><g><path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"/></g></svg>
									<span class="bubble">Voir le code</span>
								</a>
								`) +
            (project.links[2] === "none"
              ? ""
              : `
								<a class="test" href="${project.links[2]}" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.09 18.64"><g><path d="M14.55 7.52 4.62 1.78A2.08 2.08 0 0 0 1.5 3.58V15.05a2.08 2.08 0 0 0 3.12 1.8l9.93-5.73A2.08 2.08 0 0 0 14.55 7.52Z"/></g></svg>
									<span class="bubble">Tester le programme</span>
								</a>
								`) +
            `
							</div>
						</div>
					</div>`;
        }
      } else if (otherProjectsContent) {
        for (let tag of project.tags) tags += `<span>${tag.name}</span>`;

        otherProjectsContent.innerHTML +=
          `
				<div class="in_animation other_project">
					<div class="other_project_content">
						<div class="header">
							<div class="logos">
              <div class="other_project_text">
                <div class="other_type">
                  <span>${project_date}</span>
                  <span>•</span>
                  <span>${project.type}</span>
                </div>
              </div>
								<div class="links">
									` +
          (project.links[1] === "none"
            ? ""
            : `
									<a class="github" href="${project.links[1]}" aria-label="github" target="_blank">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31"><g><path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"/></g></svg>
									</a>
									`) +
          (project.links[2] === "none"
            ? ""
            : `
									<a class="test" href="${project.links[2]}" aria-label="test" target="_blank">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.09 18.64"><g><path d="M14.55 7.52 4.62 1.78A2.08 2.08 0 0 0 1.5 3.58V15.05a2.08 2.08 0 0 0 3.12 1.8l9.93-5.73A2.08 2.08 0 0 0 14.55 7.52Z"/></g></svg>
									</a>
									`) +
          `
								</div>
							</div>
							<a href="${project.links[0]}" target="_blank" class="project_title">${project.title}</a>
							<p class="text">${project.description}</p>
						</div>
						<div class="tags">` +
          tags +
          `</div>
					</div>
				</div>`;
      }
    }
  };

  const generate: (data: IProjects) => void = (data: IProjects): void => {
    if (data) {
      const projectsContent: HTMLElement | null = document.querySelector(
        "#projects_section .projects_content"
      );
      if (projectsContent) {
        projectsContent.innerHTML = "";
      }
      const otherProjectsContent: HTMLElement | null = document.querySelector(
        "#projects_section .other_projects_content"
      );
      if (otherProjectsContent) {
        otherProjectsContent.innerHTML = "";
      }
      let inverted: boolean = true;
      let i: number = 0;

      data.projects.sort((a: any, b: any): number => {
        let aDate: Date = new Date(a.date);
        let bDate: Date = new Date(b.date);
        if (a.date.length === 4) {
          aDate = new Date(`${a.date}-06-01`);
        } else {
          aDate = new Date(`${a.date}-01`);
        }
        if (b.date.length === 4) {
          bDate = new Date(`${b.date}-06-01`);
        } else {
          bDate = new Date(`${b.date}-01`);
        }
        return Number(bDate) - Number(aDate);
      });

      for (let project of data.projects) {
        let featured;

        if (sort_by === "Date") {
          featured = i < 10 && project.image !== "none";
        } else {
          featured =
            Array.isArray(project.categories) &&
            project.categories.includes(sort_by);
        }

        if (featured) {
          inverted = !inverted;
        }

        add_project(project, inverted, featured);
        i++;
      }
      done = [];
      elements = document.querySelectorAll("#projects_section .in_animation");

      for (let i: number = 0; i < elements.length; i++) {
        done.push(false);
      }

      in_animation_check();
    }
  };

  let prev_width: number = window.innerWidth;
  if (data) {
    generate(data);
  }

  window.addEventListener("resize", (): void => {
    if (
      (prev_width >= 780 && window.innerWidth <= 780) ||
      (prev_width <= 780 && window.innerWidth >= 780)
    ) {
      if (data) {
        generate(data);
      }
      prev_width = window.innerWidth;
    }
  });

  document
    .querySelectorAll("#projects_section .sort_choices .choice")
    .forEach((el: Element): void => {
      el.addEventListener("click", (): void => {
        sort_by = el.innerHTML;
        if (data) {
          generate(data);
        }

        document
          .querySelectorAll("#projects_section .sort_choices .choice")
          .forEach((el: Element): void => {
            el.classList.remove("selected");
          });

        el.classList.add("selected");
      });
    });

  return (
    <>
      <a href="#projects" id="projects">
        {" "}
      </a>
      <section className="section" id="projects_section">
        <div className="content leaning">
          <span className="section_title">Quelques-uns de mes projets</span>
          <div className="sort_choices">
            <span className="label">Trier par</span>
            <div className="choice selected">Date</div>
            <div className="choice">Personnel</div>
            <div className="choice">École</div>
            <div className="choice">DevOps</div>
            <div className="choice">IA</div>
            <div className="choice">Jeux</div>
            <div className="choice">Simulations</div>
            <div className="choice">Web</div>
          </div>
          <div className="projects_content"></div>
          <div className="other_projects_content"></div>
        </div>
      </section>
      <div className="section_end projects_end"></div>
    </>
  );
}

export default Projects;
