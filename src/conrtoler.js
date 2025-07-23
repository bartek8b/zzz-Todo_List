import {
  retrieveStorage,
  ensureDefaultProject,
  createProject,
} from "./execution.js";
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
  // NEW PROJECT
  const createNewProjectBtn = document.querySelector(".create-project-btn");
  const modalNewProject = document.querySelector(".modal-new-project");
  const cancelNewProject = document.querySelector("#cancel-new-project");
  const confirmNewProject = document.querySelector("#confirm-new-project");
  const projectNameInput = document.querySelector("#project-name-input");

  createNewProjectBtn.addEventListener("click", (e) => {
    modalNewProject.showModal();
  });

  cancelNewProject.addEventListener("click", (e) => {
    modalNewProject.close();
  });

  confirmNewProject.addEventListener("click", (e) => {
    const rawValue = projectNameInput.value;
    const trimmedValue = rawValue.trim();

    if (trimmedValue.length === 0) {
      alert("Project name cannot be empty");
      projectNameInput.value = "";
      return;
    }

    if (createProject(trimmedValue)) {
      createProjectsList(projects);
      projectNameInput.value = "";
      modalNewProject.close();
    } else {
      alert("The project already exists");
      projectNameInput.value = "";
    }
  });
}
