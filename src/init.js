import { retrieveStorage, ensureDefaultProject } from "./execution.js";
import { createProjectsList } from "./projectsListCreator.js";
import { createGrid } from "./gridCreator.js";
import { projects } from "./data.js";
import { setEventListeners } from "./controller.js";
import { loadDemoContent } from "./demo.js";

export function init() {
  retrieveStorage();
  loadDemoContent();
  ensureDefaultProject();
  createProjectsList(projects);
  createGrid(projects);
  setEventListeners();
}
