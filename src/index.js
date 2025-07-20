import "./modern-normalize.css";
import "./style.css";

import { retrieveStorage, ensureDefaultProject } from "./execution.js";
import { createGrid } from "./gridCreator.js";
import { projects } from "./data.js";

window.onload = function () {
  retrieveStorage();
  ensureDefaultProject();
  createGrid(projects);
};

createGrid(projects);
console.log(projects);
