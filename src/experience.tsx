import React from "react";
import "./css/experience.css";
import "./css/properties.css";
import "./css/style.css";
import read_json, { is_in_viewport, is_safari, sleep } from "./utils";

interface Data {
  experience: Job[];
}

interface Job {
  start_date: string;
  end_date: string;
  type: string;
  status: string;
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

export default function Experience(): React.ReactElement {
  const [data, setData] = React.useState<Data | null>(null);

  const current_date: Date = new Date();
  let done: boolean[] = [];
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

  const formatDate: (date: string) => string = (date: string): string => {
    let formattedDate: string = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  const generateTags: (
    tags: {
      url: string;
      name: string;
    }[]
  ) => string = (tags: { url: string; name: string }[]): string => {
    return tags
      .map(
        (tag: { url: string; name: string }): string =>
          `<a href="${tag.url}" target="_blank">${tag.name}</a>`
      )
      .join("");
  };

  const generateJobHTML: (
    job: Job,
    job_date: string,
    tags: string,
    inverted: boolean
  ) => string = (
    job: Job,
    job_date: string,
    tags: string,
    inverted: boolean
  ): string => {
    return `
      <div class="in_animation job ${inverted ? "inverted" : ""}">
        <div class="job_text">
          <div class="type">
            <span>${job_date}</span>
            <span>•</span>
            <span>${job.status}</span>
          </div>
          <a class="job_title" href="${job.link}" target="_blank">${
      job.type
    } at ${job.title}</a>
          <div class="text"><p>${job.description}</p></div>
          <div class="tags">${tags}</div>
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
  };

  const generateMobileJobHTML: (
    job: Job,
    job_date: string,
    tags: string
  ) => string = (job: Job, job_date: string, tags: string): string => {
    return `
      <div class="in_animation job ${
        is_safari() ? "safari_fix" : ""
      }" style="background-image: url(${job.image});">
        <div class="job_text">
          <div class="type">
            <span>${job.status}</span>
            <span>•</span>
            <span>${job_date}</span>
          </div>
          <a class="job_title" href="${job.link}" target="_blank">${
      job.type
    } at ${job.title}</a>
          <div class="text"><p>${job.description}</p></div>
          <div class="tags">${tags}</div>
        </div>
      </div>`;
  };

  const add_job: (job: Job, inverted: boolean) => void = (
    job: Job,
    inverted: boolean
  ): void => {
    if (data) {
      const job_start_date: string = formatDate(job.start_date);
      const job_end_date: string = formatDate(job.end_date);
      let job_date: string = `From ${job_start_date} to ${job_end_date}`;

      if (new Date(job.end_date) > current_date) {
        job_date = `Since ${job_start_date}`;
      }

      const tags: string = generateTags(job.tags);

      if (window.innerWidth > 780 && experienceContent) {
        experienceContent.innerHTML += generateJobHTML(
          job,
          job_date,
          tags,
          inverted
        );
      } else if (experienceContent) {
        experienceContent.innerHTML += generateMobileJobHTML(
          job,
          job_date,
          tags
        );
      }
    }
  };

  const generate: (data: Data) => void = (data: Data): void => {
    if (data && experienceContent) {
      experienceContent.innerHTML = "";
      let inverted: boolean = data.experience.length % 2 === 0;

      data.experience.sort((a: Job, b: Job): number => {
        let aDate: Date = new Date(a.end_date);
        let bDate: Date = new Date(b.end_date);
        if (
          new Date(a.end_date) > current_date &&
          new Date(b.end_date) > current_date
        ) {
          aDate = new Date(a.start_date);
          bDate = new Date(b.start_date);
          return Number(bDate) - Number(aDate);
        }
        return Number(bDate) - Number(aDate);
      });

      for (let job of data.experience) {
        inverted = !inverted;
        add_job(job, inverted);
      }

      elements = document.querySelectorAll("#experience_section .in_animation");

      done = Array(elements.length).fill(false);

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
          <span className="section_title">Where I've Worked</span>
          <div className="experience_content"></div>
        </div>
      </section>
      <div className="section_end experience_end"></div>
    </>
  );
}
