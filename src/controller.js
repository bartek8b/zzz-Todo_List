import { createProject } from "./execution.js";
import { createProjectsList } from "./projectsListCreator.js";
import { projects } from "./data.js";

const createNewProjectBtn = document.querySelector(".create-project-btn");
const modalNewProject = document.querySelector(".modal-new-project");
const cancelNewProject = document.querySelector("#cancel-new-project");
const confirmNewProject = document.querySelector("#confirm-new-project");
const projectNameInput = document.querySelector("#project-name-input");
const alertEmptyName = document.querySelector(".alert-empty-name");
const btnOkEmptyName = document.querySelector(".ok-btn-empty-name");
const alertProjectExists = document.querySelector(".alert-project-exist");
const btnOkProjectExists = document.querySelector(".ok-btn-project-exists");

export function setEventListeners() {
  newProject();
}

function newProject() {
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
      alertEmptyName.showModal();
      projectNameInput.value = "";
      return;
    }

    if (createProject(trimmedValue)) {
      createProjectsList(projects);
      projectNameInput.value = "";
      modalNewProject.close();
    } else {
      alertProjectExists.showModal();
      projectNameInput.value = "";
    }
  });

  btnOkEmptyName.addEventListener("click", () => alertEmptyName.close());

  btnOkProjectExists.addEventListener("click", () =>
    alertProjectExists.close()
  );
}

function deleteProject() {
  
}
