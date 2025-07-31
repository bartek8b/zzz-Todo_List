import {
  filterByProject,
  filterByPriority,
  filterLate,
  filterDay,
  filterWeek,
} from "./execution.js";

import { createGrid } from "./gridCreator.js";

import { projects } from "./data.js";

const filters = {
  time: null,
  priority: null,
  project: null,
};

export function filteredDisplay() {
  let toBeDisplayed = projects;
  // projects are already sorted by name by the module execution.js when they're added or modified

  if (filters.time) {
    if (filters.time === "Late") {
      toBeDisplayed = filterLate(toBeDisplayed);
    } else if (filters.time === "Day") {
      toBeDisplayed = filterDay(toBeDisplayed);
    } else if (filters.time === "Week") {
      toBeDisplayed = filterWeek(toBeDisplayed);
    }
  }

  if (filters.priority) {
    toBeDisplayed = filterByPriority(toBeDisplayed, filters.priority);
  }

  if (filters.project) {
    toBeDisplayed = filterByProject(toBeDisplayed, filters.project);
  }

  return toBeDisplayed;
}

export function filtersListeners() {
  const timeFiltersContainer = document.querySelector(".time-list");
  const priorityFiltersContainer = document.querySelector(".priority-list");
  const projectsFiltersContainer = document.querySelector(".projects-list");

  const timeFilters = document.querySelectorAll(".time-list button");
  const priorityFilters = document.querySelectorAll(".priority-list button");
  // const projectsFilters = document.querySelectorAll(".projects-list button");

  timeFiltersContainer.addEventListener("click", (e) => {
    const filter = e.target.closest(".time-list button");
    if (!filter) return false;

    if (filter.classList.contains("filter-checked")) {
      timeFilters.forEach((f) => f.classList.remove("filter-checked"));
      filters.time = null;
    } else {
      timeFilters.forEach((f) => f.classList.remove("filter-checked"));
      filter.classList.add("filter-checked");
      filters.time = filter.textContent;
    }
    createGrid(filteredDisplay());
  });

  priorityFiltersContainer.addEventListener("click", (e) => {
    const filter = e.target.closest(".priority-list button");
    if (!filter) return false;

    if (filter.classList.contains("filter-checked")) {
      priorityFilters.forEach((f) => f.classList.remove("filter-checked"));
      filters.priority = null;
    } else {
      priorityFilters.forEach((f) => f.classList.remove("filter-checked"));
      filter.classList.add("filter-checked");
      filters.priority = filter.textContent;
    }
    createGrid(filteredDisplay());
  });

  projectsFiltersContainer.addEventListener("click", (e) => {
  const filter = e.target.closest(".projects-list button");
  if (!filter) return false;

  // Pobierz zawsze aktualne przyciski!
  const projectsFilters = document.querySelectorAll(".projects-list button");

  if (filter.classList.contains("filter-checked")) {
    // Jeśli kliknięty jest już zaznaczony, odznacz go i wyczyść filtr
    filter.classList.remove("filter-checked");
    filters.project = null;
  } else {
    // Odznacz wszystkie, zaznacz tylko kliknięty i ustaw filtr
    projectsFilters.forEach((f) => f.classList.remove("filter-checked"));
    filter.classList.add("filter-checked");
    filters.project = filter.textContent;
  }
  createGrid(filteredDisplay());
});
}
