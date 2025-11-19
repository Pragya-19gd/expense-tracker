import { addTransaction, list } from "./transaction.js";
import { renderUI } from "./ui.js";

document.getElementById("add-btn").addEventListener("click", addTransaction);
document.getElementById("search").addEventListener("input", renderUI);
document.getElementById("filterCategory").addEventListener("change", renderUI);

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark")?"dark":"light");
});

if(localStorage.getItem("theme")==="dark") document.body.classList.add("dark");

window.addEventListener("DOMContentLoaded", ()=> {
  renderUI();
});
