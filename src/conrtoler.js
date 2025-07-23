import { retrieveStorage, ensureDefaultProject } from "./execution.js";
import { createGrid } from "./gridCreator.js";
import { createProjectsList } from "./projectsListCreator.js";
import { projects } from "./data.js";

export function init() {
  retrieveStorage();
  ensureDefaultProject();
  createProjectsList(projects);
  createGrid(projects);
}

export function setEventListeners() {
  
}
