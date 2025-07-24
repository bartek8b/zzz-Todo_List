import { createProject, spotItem, deleteProject } from "./execution.js";
import { createProjectsList } from "./projectsListCreator.js";
import { projects } from "./data.js";

const createNewProjectBtn = document.querySelector(".create-project-btn");
const modalNewProject = document.querySelector(".modal-new-project");
const cancelNewProjectBtn = document.querySelector("#cancel-new-project-btn");
const confirmNewProject = document.querySelector("#confirm-new-project");
const projectNameInput = document.querySelector("#project-name-input");
const alertEmptyName = document.querySelector(".alert-empty-name");
const btnOkEmptyName = document.querySelector(".ok-btn-empty-name");
const alertProjectExists = document.querySelector(".alert-project-exist");
const btnOkProjectExists = document.querySelector(".ok-btn-project-exists");

export function setEventListeners() {
  appendProjectIntoList()
  deleteProjectFromList();
}

function appendProjectIntoList() {
  createNewProjectBtn.addEventListener("click", (e) => {
    modalNewProject.showModal();
  });

  cancelNewProjectBtn.addEventListener("click", (e) => {
    modalNewProject.close();
    projectNameInput.value = "";
  });

  confirmNewProject.addEventListener("click", (e) => {
    e.preventDefault();
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

function deleteProjectFromList() {
  const projectsList = document.querySelector(".projects-list");
  projectsList.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-project-btn");
    if (!btn) {
      return;
    }
    const toBeDeleted = spotItem(projects, "id", btn.dataset.id);
    deleteProject(toBeDeleted.name);
    createProjectsList(projects);
  });
}
