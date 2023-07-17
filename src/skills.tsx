import React from "react";
import "./css/properties.css";
import "./css/skills.css";
import "./css/style.css";
import read_json from "./utils.ts";

interface Skill {
  name: string;
  link: string;
  logo: string;
}

interface Category {
  name: string;
  skills: Skill[];
}

interface SkillsData {
  skills_categories: Category[];
}

export default function Skills(): React.ReactElement {
  const [data, setData] = React.useState<SkillsData | null>(null);

  const choose: (i: number, categories: any, skillsLists: any) => void = (
    i: number,
    categories: any,
    skillsLists: any
  ): void => {
    for (let j: number = 0; j < categories.length; j++) {
      categories[j].style.backgroundColor = "rgba(0, 0, 0, 0)";
      categories[j].style.cursor = "pointer";
    }

    categories[i].style.backgroundColor = "white";
    categories[i].style.cursor = "default";

    for (let j: number = 0; j < skillsLists.length; j++)
      skillsLists[j].style.display = "none";

    skillsLists[i].style.display = "grid";
  };

  React.useEffect((): void => {
    const fetchData: () => void = (): void => {
      read_json("/jsons/skills.json", (data: SkillsData): void => {
        setData(data);
      });
    };
    fetchData();
  }, []);

  React.useEffect((): void => {
    const events: () => void = (): void => {
      let categories: NodeListOf<HTMLElement> = document.querySelectorAll(
        "#skills_section .box .menu .category"
      );
      let skillsLists: NodeListOf<HTMLElement> = document.querySelectorAll(
        "#skills_section .box .box_content .skills_list"
      );

      choose(0, categories, skillsLists);

      for (let i: number = 0; i < categories.length; i++) {
        categories[i].addEventListener("click", (): void => {
          choose(i, categories, skillsLists);
        });
      }
    };

    if (data) {
      let box: HTMLElement | null = document.querySelector(
        "#skills_section .box"
      );
      if (box) {
        box.innerHTML = "";
      }

      if (window.innerWidth > 930) {
        let menu: string = "";
        let boxContent: string = "";

        for (let category of data.skills_categories) {
          menu += `<div class="category">${category.name}</div>`;

          let skills: string = "";

          for (let skill of category.skills) {
            skills += `<a class="skill" href="${skill.link}" target="_blank">
              <img src="${
                skill.logo
              }" alt="${skill.name.toLowerCase()}" width="190px" height="190px"/>
              <span>${skill.name}</span>
            </a>`;
          }

          boxContent += `<div class="skills_list">${skills}</div>`;
        }

        if (box) {
          box.innerHTML = `<div class="menu">${menu}</div><div class="box_content">${boxContent}</div>`;
        }

        events();
      } else {
        for (let category of data.skills_categories) {
          if (box) {
            box.innerHTML += `<div class="category_title">${category.name}</div>`;
          }

          let skills: string = "";

          for (let skill of category.skills) {
            skills += `<a class="skill" href="${skill.link}" target="_blank">
              <img src="${
                skill.logo
              }" alt="${skill.name.toLowerCase()}" width="190px" height="190px"/>
              <span>${skill.name}</span>
            </a>`;
          }

          if (box) {
            box.innerHTML += `<div class="box_content"><div class="skills_list">${skills}</div></div>`;
          }
        }
      }
    }
  }, [data]);

  return (
    <>
      <a href="#skills" id="skills">
        {" "}
      </a>
      <section className="section" id="skills_section">
        <div className="content leaning">
          <span className="section_title">What are my Skills?</span>
          <div className="skills_content">
            <div className="box"></div>
          </div>
        </div>
      </section>
      <div className="section_end skills_end"></div>
    </>
  );
}
