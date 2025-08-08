import { Project, Todo, projects } from "./data.js";
import { setStorage } from "./execution.js";

export function loadDemoContent() {
  // If there is already user data, do nothing
  const currentData = JSON.parse(localStorage.getItem("data"));
  if (Array.isArray(currentData) && currentData.length > 0) return;

  // Project names & their todos (all UPPERCASE for compatibility!)
  const projectNames = [
    "SPORTS",
    "BOARD GAMES",
    "TRAVEL"
  ];

  const todosByProject = {
    "BOARD GAMES": [
      { title: "PLAY CATAN", description: "Session with friends.", priority: 2 },
      { title: "ONLINE CHESS", description: "", priority: 3 },
      { title: "BOARD GAME NIGHT", description: "Trying new board games and classics.", priority: 1 }
    ],
    "SPORTS": [
      { title: "MORNING RUN", description: "", priority: 1 },
      { title: "GYM WORKOUT", description: "Strength and conditioning training for 2 hours.", priority: 2 },
      { title: "YOGA SESSION", description: "Relaxing morning yoga, stretching and breathing exercises. ".repeat(10), priority: 3 }
    ],
    "TRAVEL": [
      { title: "BIKE TRIP", description: "Route through the forest.", priority: 3 },
      { title: "PLAN BACKPACKING", description: "Prepare gear and make a travel plan.", priority: 1 },
      { title: "BOOK TICKETS", description: "Buy tickets for train or plane.", priority: 2 }
    ]
  };

  // Dates
  const today = new Date();
  const weekAhead = new Date(today);
  weekAhead.setDate(today.getDate() + 5);
  const past = new Date(today);
  past.setDate(today.getDate() - 2);

  for (const projectName of projectNames) {
    const project = new Project(projectName);
    const todoDefs = todosByProject[projectName];

    todoDefs.forEach((def, idx) => {
      let dueDate;
      if (idx === 0) dueDate = today.toISOString().split("T")[0]; // today
      else if (idx === 1) dueDate = weekAhead.toISOString().split("T")[0]; // within a week
      else dueDate = past.toISOString().split("T")[0]; // overdue

      // random checked
      const checked = Math.random() < 0.5;

      const todo = new Todo(
        def.title,
        def.description.slice(0, 180), // max description length
        dueDate,
        def.priority
      );
      todo.checked = checked;
      project.todos.push(todo);
    });

    projects.push(project);
  }

  setStorage(projects);
}