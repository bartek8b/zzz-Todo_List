import { Project, Todo, projects } from "./data";

function createProject(name) {
  const validName = name.trim().toUpperCase();
  const projectExist = (p) => p.name === validName;

  if (!projects.some(projectExist)) {
    projects.push(new Project(validName));
  }
}
