import "./modern-normalize.css";
import "./style.css";


console.log("----- TEST -----")
import { createTodo, createProject,deleteProject } from "./execution.js";
import { projects } from "./data.js";

createTodo("Default", "title", "description", "2025-11-21", 1);
createProject("Another Project");
deleteProject("Another Project");

console.log(projects);