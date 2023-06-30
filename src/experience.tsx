import React from "react";
import "./css/experience.css";
import "./css/properties.css";
import "./css/style.css";
import read_json, { is_in_viewport, is_safari, sleep } from "./utils";

interface Data {
  experience: Job[];
}

interface Job {
  date: number;
  type: string;
  link: string;
  title: string;
  description: string;
  image: string;
  tags: Tag[];
}

interface Tag {
  name: string;
  url: string;
}

function Experience(): React.ReactElement {
  const [data, setData] = React.useState<Data | null>(null);

  let done: Boolean[] = [];
  let elements: NodeListOf<HTMLElement> = document.querySelectorAll(
    "#experience_section .in_animation"
  );

  const experienceContent: HTMLElement | null = document.querySelector(
    "#experience_section .experience_content"
  );

  const in_animation_check: () => Promise<void> = async (): Promise<void> => {
    for (let i: number = 0; i < elements.length; i++)
      if (!done[i] && is_in_viewport(elements[i])) {
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
      read_json("/jsons/experience.json", (data: Data): void => {
        setData(data);
      });
    };
    fetchData();
  }, []);

  const add_job: (job: Job, inverted: boolean) => void = (
    job: Job,
    inverted: boolean
  ): void => {
    if (data) {
      let tags: string = "";

      for (let tag of job.tags)
        tags += `<a href="${tag.url}" target="_blank">${tag.name}</a>`;

      if (window.innerWidth > 780 && experienceContent) {
        experienceContent.innerHTML +=
          `
      <div class="in_animation job ${inverted ? "inverted" : ""}">
        <div class="job_text">
          <div class="type">
            <span>${job.date}</span>
            <span>•</span>
            <span>${job.type}</span>
          </div>
          <a class="job_title" href="${job.link}" target="_blank">${
            job.title
          }</a>
          <div class="text"><p>${job.description}</p></div>
          <div class="tags">` +
          tags +
          `</div>
        </div>
        <div class="job_view">
          <a ${is_safari() ? 'class="safari_fix"' : ""} href="${
            job.link
          }" target="_blank">
            <img src="${
              job.image
            }" alt="${job.title.toLowerCase()} image" width="1440px" height="810px"/>
          </a>
        </div>
      </div>`;
      } else if (experienceContent) {
        experienceContent.innerHTML +=
          `
				<div class="in_animation job ${
          is_safari() ? "safari_fix" : ""
        }" style="background-image: url(${job.image});">
					<div class="job_text"">
						<div class="type">
							<span>${job.type}</span>
							<span>•</span>
							<span>${job.date}</span>
						</div>
						<a class="job_title" href="${job.link}" target="_blank">${job.title}</a>
						<div class="text"><p>${job.description}</p></div>
						<div class="tags">` +
          tags +
          `</div>
					</div>
				</div>`;
      }
    }
  };

  const generate: (data: Data) => void = (data: Data): void => {
    if (data && experienceContent) {
      experienceContent.innerHTML = "";
      let inverted: boolean = data.experience.length % 2 === 0;

      data.experience.sort((a: Job, b: Job): number => {
        return b.date - a.date;
      });

      for (let job of data.experience) {
        inverted = !inverted;
        add_job(job, inverted);
      }

      done = [];
      elements = document.querySelectorAll("#experience_section .in_animation");

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

  return (
    <>
      <a href="#experience" id="experience">
        {" "}
      </a>
      <section className="section" id="experience_section">
        <div className="content leaning">
          <span className="section_title">Où j'ai travaillé</span>
          <div className="experience_content"></div>
        </div>
      </section>
      <div className="section_end experience_end"></div>
    </>
  );
}

export default Experience;
