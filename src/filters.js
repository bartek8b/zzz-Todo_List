import {
  filterByProject,
  filterByPriority,
  filterLate,
  filterDay,
  filterWeek,
} from "./execution.js";

import { projects } from "./data.js";

const filters = {
  project: null,
  priority: null,
  time: null,
};

function filteredDisplay() {
  let toBeDisplayed = projects;

  if (filters.project) {
    toBeDisplayed = filterByProject(filters.project);
  }

  if (filters.priority) {
    toBeDisplayed = filterByPriority(toBeDisplayed, filters.priority);
  }

  if (filters.time) {
    if (filters.time === "Late") {
      toBeDisplayed = filterLate(toBeDisplayed);
    } else if (filters.time === "Day") {
      toBeDisplayed = filterDay(toBeDisplayed);
    } else if (filters.time === "Week") {
      toBeDisplayed = filterWeek(toBeDisplayed);
    }
  }

  return toBeDisplayed;
}
