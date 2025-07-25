import {
  createProject,
  spotItem,
  deleteProject,
  editProject,
} from "./execution.js";
import { createProjectsList } from "./projectsListCreator.js";
import { projects } from "./data.js";

const alertEmptyName = document.querySelector(".alert-empty-name");
const btnOkEmptyName = document.querySelector(".ok-btn-empty-name");
const alertProjectExists = document.querySelector(".alert-project-exist");
const btnOkProjectExists = document.querySelector(".ok-btn-project-exists");
const projectsList = document.querySelector(".projects-list");

const todosToDisplay = [];

btnOkEmptyName.addEventListener("click", () => alertEmptyName.close());

export function setEventListeners() {
  appendProjectIntoList();
  deleteProjectFromList();
  changeProjectName();
}

//PROJECTS
function appendProjectIntoList() {
  const modalNewProject = document.querySelector(".modal-new-project");
  const createNewProjectBtn = document.querySelector(".create-project-btn");
  const cancelNewProjectBtn = document.querySelector("#cancel-new-project-btn");
  const confirmNewProject = document.querySelector("#confirm-new-project");
  const projectNameInput = document.querySelector("#project-name-input");

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

  btnOkProjectExists.addEventListener("click", () =>
    alertProjectExists.close()
  );
}

function deleteProjectFromList() {
  const modalDelete = document.querySelector(".modal-delete-project");
  const confirmBtn = document.querySelector("#confirm-delete-project");
  const cancelBtn = document.querySelector("#cancel-delete-project");

  let projectIdToDelete = null;

  projectsList.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-project-btn");
    if (!btn) {
      return;
    }
    projectIdToDelete = btn.dataset.id; //temp var.
    modalDelete.showModal();
  });
  confirmBtn.addEventListener("click", (e) => {
    if (!projectIdToDelete) {
      return;
    }
    const toBeDeleted = spotItem(projects, "id", projectIdToDelete);
    if (!toBeDeleted) {
      modalDelete.close();
      return;
    }
    deleteProject(toBeDeleted.name);
    createProjectsList(projects);

    //CREATE GRID (filtered and sorted?) TO BE TRIGGERED?

    projectIdToDelete = null; //temp clear
    modalDelete.close();
  });

  cancelBtn.addEventListener("click", (e) => {
    projectIdToDelete = null; //clear temp
    modalDelete.close();
  });
}

// TODOS

function changeProjectName() {
  const editedNameInput = document.querySelector("#edited-name-input");
  const modalEditProject = document.querySelector(".modal-edit-project");
  const confirmEditedProject = document.querySelector(
    "#confirm-edited-project-btn"
  );
  const cancelEditedProject = document.querySelector(
    "#cancel-edited-project-btn"
  );

  let projectToEdit = null;

  projectsList.addEventListener("click", (e) => {
    const btn = e.target.closest(".edit-project-btn");
    if (!btn) {
      return;
    }
    projectToEdit = btn.dataset.id; //temp var.
    const toBeEdited = spotItem(projects, "id", projectToEdit);
    editedNameInput.value = toBeEdited.name;
    modalEditProject.showModal();
  });

  confirmEditedProject.addEventListener("click", (e) => {
    e.preventDefault();
    const toBeEdited = spotItem(projects, "id", projectToEdit);
    if (!editedNameInput.value.trim()) {
      alertEmptyName.showModal();
      return;
    }
    editProject(toBeEdited.name, editedNameInput.value);
    projectToEdit = null; //temp clear
    modalEditProject.close();
    createProjectsList(projects);
  });

  cancelEditedProject.addEventListener("click", (e) => {
    projectToEdit = null; //temp clear
    modalEditProject.close();
  });
}

function appendTodoIntoGrid(){
  
  createTodo(projectName, title, description, dueDate, priority);
  createGrid(arrayToDisplay);
}
