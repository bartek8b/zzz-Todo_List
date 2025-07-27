import {
  createProject,
  spotItem,
  deleteProject,
  editProject,
  createTodo,
  editTodo,
  deleteTodo,
  setStorage,
} from "./execution.js";
import { createProjectsList } from "./projectsListCreator.js";
import { createGrid } from "./gridCreator.js";
import { projects } from "./data.js";

const alertEmptyName = document.querySelector(".alert-empty-name");
const btnOkEmptyName = document.querySelector(".ok-btn-empty-name");
const alertProjectExists = document.querySelector(".alert-project-exist");
const btnOkProjectExists = document.querySelector(".ok-btn-project-exists");
const projectsList = document.querySelector(".projects-list");

btnOkEmptyName.addEventListener("click", () => alertEmptyName.close());

export function setEventListeners() {
  appendProjectIntoList();
  deleteProjectFromList();
  changeProjectName();
  appendTodoIntoGrid();
  editTodoBtn();
  deleteTodoBtn();
  updateChecked();
}

// PROJECTS

function appendProjectIntoList() {
  const modalNewProject = document.querySelector(".modal-new-project");
  const createNewProjectBtn = document.querySelector(".create-project-btn");
  const cancelNewProjectBtn = document.querySelector("#cancel-new-project-btn");
  const confirmNewProject = document.querySelector("#confirm-new-project");
  const projectNameInput = document.querySelector("#project-name-input");

  createNewProjectBtn.addEventListener("click", () => {
    modalNewProject.showModal();
  });

  cancelNewProjectBtn.addEventListener("click", () => {
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
    if (!btn) return;
    projectIdToDelete = btn.dataset.id;
    modalDelete.showModal();
  });

  confirmBtn.addEventListener("click", () => {
    if (!projectIdToDelete) return false;
    const toBeDeleted = spotItem(projects, "id", projectIdToDelete);
    if (!toBeDeleted) {
      modalDelete.close();
      return false;
    }
    deleteProject(toBeDeleted.name);
    createProjectsList(projects);
    createGrid(projects);
    projectIdToDelete = null;
    modalDelete.close();
  });

  cancelBtn.addEventListener("click", () => {
    projectIdToDelete = null;
    modalDelete.close();
  });
}

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
    if (!btn) return;
    projectToEdit = btn.dataset.id;
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
    projectToEdit = null;
    modalEditProject.close();
    createProjectsList(projects);
    createGrid(projects);
  });

  cancelEditedProject.addEventListener("click", () => {
    projectToEdit = null;
    modalEditProject.close();
  });
}

// TODOS

let isEditingTodo = false;
let todoToEdit = null;

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
    if (lowRadio) lowRadio.checked = true;
    projectName.value = "info-for-user";
    isEditingTodo = false;
    todoToEdit = null;
  }

  newTodoBtn.addEventListener("click", () => {
    setProjectOptions();
    clearForm();
    modalNewTodo.showModal();
  });

  cancelBtn.addEventListener("click", () => {
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
          return 1;
      }
    }
    // CHECK IF REQUIRED DATA IS ENTERED
    if (
      projectName.value === "info-for-user" ||
      !title.value.trim() ||
      !dueDate.value
    ) {
      alertEmptyFields.showModal();
      return false;
    }

    // FOR EDITING, TRIGGERED BY EDIT BTN ON TODO CARD
    if (isEditingTodo && todoToEdit) {
      const success = editTodo(
        todoToEdit.projectName,
        projectName.value,
        todoToEdit.title,
        title.value,
        description.value,
        dueDate.value,
        priorityByNumber(priority)
      );
      if (success) {
        createProjectsList(projects);
        createGrid(projects);
        clearForm();
        modalNewTodo.close();
      } else {
        alertTodoExists.showModal();
      }
    }
    // FOR CREATING NEW TODO, TRIGGERED BY + TODO BTN
    else {
      const success = createTodo(
        projectName.value,
        title.value,
        description.value,
        dueDate.value,
        priorityByNumber(priority)
      );
      if (success) {
        createProjectsList(projects);
        createGrid(projects);
        clearForm();
        modalNewTodo.close();
      } else {
        alertTodoExists.showModal();
      }
    }
  });

  okBtnEmptyFields.addEventListener("click", () => {
    alertEmptyFields.close();
  });

  okBtnTodoExists.addEventListener("click", () => {
    alertTodoExists.close();
  });

  window.openEditTodoModal = function (todo, projectName) {
    setProjectOptions();

    const projectNameInput = document.querySelector("#todo-project-input");
    const titleInput = document.querySelector("#todo-title-input");
    const descriptionInput = document.querySelector("#todo-description-input");
    const dueDateInput = document.querySelector("#todo-duedate-input");

    projectNameInput.value = projectName;
    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueDateInput.value = todo.dueDate;

    // SWITCH PRIORITY FROM INT.(OBJECT PROP.) TO WORD (SET INPUT)
    const priorities = {
      1: "low",
      2: "medium",
      3: "high",
    };
    if (todo.priority) {
      const radio = document.querySelector(
        `input[name="priority"][value="${priorities[todo.priority]}"]`
      );
      if (radio) radio.checked = true;
    }

    isEditingTodo = true;
    todoToEdit = { ...todo, projectName };
    modalNewTodo.showModal();
  };
}

function setProjectOptions() {
  const optionsContainer = document.querySelector("#todo-project-input");
  optionsContainer.innerHTML = "";
  let pushHTML = `<option value="info-for-user" selected disabled>---select project---</option>`;
  for (const p of projects) {
    pushHTML += `<option value="${p.name}">${p.name}</option>`;
  }
  optionsContainer.innerHTML = pushHTML;
}

// TODOS ON CARDS

function editTodoBtn() {
  const gridContainer = document.querySelector(".grid-container");

  if (!gridContainer) return false;
  gridContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".edit-todo-btn");
    if (!btn) return false;
    for (const p of projects) {
      const todoToEdit = p.todos.find((t) => t.id === btn.dataset.id);
      if (todoToEdit) {
        window.openEditTodoModal(todoToEdit, p.name);
        return true;
      }
    }
  });
}

function deleteTodoBtn() {
  const gridContainer = document.querySelector(".grid-container");
  const confirmModal = document.querySelector(".modal-delete-todo");
  const confirmBtn = document.querySelector("#confirm-delete-todo");
  const cancelBtn = document.querySelector("#cancel-delete-todo");
  let btn;

  gridContainer.addEventListener("click", (e) => {
    if (!gridContainer) return;
    btn = e.target.closest(".delete-todo-btn");
    if (!btn) return false;

    confirmModal.showModal();
  });

  cancelBtn.addEventListener("click", (e) => {
    btn = null;
    confirmModal.close();
  });

  confirmBtn.addEventListener("click", (e) => {
    for (const p of projects) {
      const todoToDelete = p.todos.find((t) => t.id === btn.dataset.id);
      if (todoToDelete) {
        deleteTodo(p.name, todoToDelete.title);
        createGrid(projects);
        confirmModal.close();
        return true;
      }
    }
  });
}

function updateChecked() {
  const gridContainer = document.querySelector(".grid-container");

  gridContainer.addEventListener("click", (e) => {
    const checkbox = e.target.closest('input[type="checkbox"]');

    if (!checkbox) return false;

    let todo = null;
    for (const p of projects) {
      todo = p.todos.find((t) => t.id === checkbox.dataset.id);
      if (todo) break;
    }

    if (!todo) return false;

    todo.checked = checkbox.checked;
    setStorage(projects);
    return true;
  });
}

// FILTERS

const arrayToDisplay = [];

function sortTodos(){
  arrayToDisplay.length = 0;
  for(const p of projects){
    for(const t of p.todos){
      arrayToDisplay.push(t);
    }
  }
  arrayToDisplay.sort((a, b) => a.title.localeCompare(b.title));
}

function filteredGrid(){


  


}
