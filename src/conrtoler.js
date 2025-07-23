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
  const dialogEmptyName = document.querySelector(".dialog-empty-name");
  const btnOkEmptyName = document.querySelector(".ok-btn-empty-name");
  const dialogProjectExists = document.querySelector(".dialog-project-exist");
  const btnOkProjectExists = document.querySelector(".ok-btn-project-exists");

  createNewProjectBtn.addEventListener("click", (e) => {
    modalNewProject.showModal();
  });

  cancelNewProject.addEventListener("click", (e) => {
    modalNewProject.close();
    projectNameInput.value = "";
  });

  confirmNewProject.addEventListener("click", (e) => {
    const trimmedValue = projectNameInput.value.trim();

    if (trimmedValue.length === 0) {
      dialogEmptyName.showModal();
      projectNameInput.value = "";
      return;
    }

    if (createProject(trimmedValue)) {
      createProjectsList(projects);
      projectNameInput.value = "";
      modalNewProject.close();
    } else {
      dialogProjectExists.showModal();
      projectNameInput.value = "";
    }
  });

  btnOkEmptyName.addEventListener("click", () => dialogEmptyName.close());

  btnOkProjectExists.addEventListener("click", () =>
    dialogProjectExists.close()
  );

  // EDIT PROJECT
}
