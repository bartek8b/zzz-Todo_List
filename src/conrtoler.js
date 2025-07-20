import { retrieveStorage, ensureDefaultProject } from "./execution";
import { createGrid } from "./gridCreator";
import { projects } from "./data";
// import { createTodo, editTodo, deleteProject } from "./execution";

export function init() {
  retrieveStorage();
  ensureDefaultProject();
  //   --------- TEST ----------
//   editTodo("it", "it", "web dev", "web dev", "   HELLLO to th e other side", "2025-12-31", 3);
  //   --------- TEST ---------- 
  createGrid(projects);
}
