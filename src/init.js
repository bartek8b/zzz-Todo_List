import { retrieveStorage, ensureDefaultProject } from "./execution.js";
import { createProjectsList } from "./projectsListCreator.js";
import { createGrid } from "./gridCreator.js";
import { projects } from "./data.js";
import { setEventListeners } from "./controller.js";

export function init() {
  retrieveStorage();
  ensureDefaultProject();
  createProjectsList(projects);
  createGrid(projects);
  setEventListeners();
}
