import { retrieveStorage, ensureDefaultProject } from "./execution";
import { createGrid } from "./gridCreator.js";
import { projects } from "./data.js";

export function init() {
  retrieveStorage();
  ensureDefaultProject();
  createGrid(projects);
}
