import "./modern-normalize.css";
import "./style.css";

import { retrieveStorage } from "./execution.js";
import {createGrid} from "./gridCreator.js"
import { projects } from "./data.js";

window.onload = function(){
    retrieveStorage();
    createGrid(projects);

};
