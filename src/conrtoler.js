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

export function setEventListeners() {
  const cancelBtns = document.querySelectorAll(".cancel-btn");
  const dialog = document.querySelector("dialog");

  cancelBtns.forEach((b) =>
    b.addEventListener("click", (e) => {
      dialog.close();
    })
  );
}
