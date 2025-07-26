import {
  createProject,
  spotItem,
  deleteProject,
  editProject,
  createTodo,
} from "./execution.js";
import { createProjectsList } from "./projectsListCreator.js";
import { createGrid } from "./gridCreator.js";
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
  appendTodoIntoGrid();
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
      return false;
    }

    if (createProject(trimmedValue)) {
      createProjectsList(projects);
      createGrid(projects);
      projectNameInput.value = "";
      modalNewProject.close();
    } else {
      alertProjectExists.showModal();
      projectNameInput.value = "";
      return false;
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
      return false;
    }
    const toBeDeleted = spotItem(projects, "id", projectIdToDelete);
    if (!toBeDeleted) {
      modalDelete.close();
      return false;
    }
    deleteProject(toBeDeleted.name);
    createProjectsList(projects);
    createGrid(projects);

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
      return false;
    }
    editProject(toBeEdited.name, editedNameInput.value);
    projectToEdit = null; //temp clear
    modalEditProject.close();
    createProjectsList(projects);
    createGrid(projects);
  });

  cancelEditedProject.addEventListener("click", (e) => {
    projectToEdit = null; //temp clear
    modalEditProject.close();
  });
}

function appendTodoIntoGrid() {
  const newTodoBtn = document.querySelector(".create-todo-btn");
  const modalNewTodo = document.querySelector(".modal-new-todo");
  const cancelBtn = document.querySelector("#cancel-new-todo-btn");
  const confirmBtn = document.querySelector("#confirm-new-todo-btn");
  const projectName = document.querySelector("#todo-project-input");
  const title = document.querySelector("#todo-title-input");
  const description = document.querySelector("#todo-description-input");
  const dueDate = document.querySelector("#todo-duedate-input");
  const alertEmptyFields = document.querySelector(".alert-empty-fields");
  const okBtnEmptyFields = document.querySelector(".ok-btn-empty-fields");
  const alertTodoExists = document.querySelector(".alert-todo-exists");
  const okBtnTodoExists = document.querySelector(".ok-btn-todo-exists");

  function clearForm() {
    title.value = "";
    description.value = "";
    dueDate.value = "";
    const lowRadio = document.querySelector(
      'input[name="priority"][value="low"]'
    );
    if (lowRadio) {
      lowRadio.checked = true;
    }
  }

  newTodoBtn.addEventListener("click", (e) => {
    setProjectOptions();
    modalNewTodo.showModal();
  });

  cancelBtn.addEventListener("click", (e) => {
    modalNewTodo.close();
    clearForm();
  });

  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const priority = document.querySelector('input[name="priority"]:checked');
    function priorityByNumber(priority) {
      if (!priority) {
        return 1;
      }
      switch (priority.value.toLowerCase()) {
        case "low":
          return 1;
        case "medium":
          return 2;
        case "high":
          return 3;
        default:
          console.error("Wrong priority:", priority);
          return 1;
      }
    }
    if (!projectName.value || !title.value.trim() || !dueDate.value) {
      alertEmptyFields.showModal();
      return false;
    }
    if (
      createTodo(
        projectName.value,
        title.value,
        description.value,
        dueDate.value,
        priorityByNumber(priority)
      )
    ) {
      createProjectsList(projects);
      createGrid(projects);
      clearForm();
      modalNewTodo.close();
    } else {
      alertTodoExists.showModal();
    }
  });

  okBtnEmptyFields.addEventListener("click", (e) => {
    alertEmptyFields.close();
  });

  okBtnTodoExists.addEventListener("click", (e) => {
    alertTodoExists.close();
  });
}

function setProjectOptions() {
  const optionsContainer = document.querySelector("#todo-project-input");
  optionsContainer.innerHTML = "";
  let pushHTML = "";
  for (const p of projects) {
    pushHTML += `<option value="${p.name}">${p.name}</option>`;
  }
  optionsContainer.innerHTML = pushHTML;
}

// TODOS ON CARDDS

function deleteTodoBtn() {}

function editTodoBtn() {}

function updateChecked() {}
