import { Project, Todo, projects } from "./data";

function createProject(name) {
  if (!(name.trim().toUpperCase() === "DEFAUTLT")) {
    projects.push(new Project(name));
  } else {
    console.error("Such project already exist");
  }
}