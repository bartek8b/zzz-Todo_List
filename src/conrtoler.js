import { retrieveStorage, ensureDefaultProject } from "./execution.js";
import { createGrid } from "./gridCreator.js";
import { createProjectsList } from "./projectsListCreator.js";
import { projects } from "./data.js";

export function init() {
  retrieveStorage();
  ensureDefaultProject();
  createProjectsList(projects);
  createGrid(projects);
  setEventListeners();
}

function setEventListeners() {
  const cancelBtns = document.querySelectorAll(".cancel-btn");
  const dialog = document.querySelector("dialog");
  const modalNewProject = document.querySelector(".modal-new-project");
  const createNewProjectBtn = document.querySelector(".create-project-btn");

  cancelBtns.forEach((b) =>
    b.addEventListener("click", (e) => {
      dialog.close();
    })
  );

  createNewProjectBtn.addEventListener("click", (e) => {
    modalNewProject.showModal();
  });
}
