import { renderUI } from "./ui.js";

// Ensure list is always an array
let stored = localStorage.getItem("transactions");
export const list = Array.isArray(JSON.parse(stored || "[]")) ? JSON.parse(stored || "[]") : [];

// Save to localStorage
export function saveData() {
  localStorage.setItem("transactions", JSON.stringify(list));
}

// Add a transaction
export function addTransaction() {
  const text = document.getElementById("text").value.trim();
  const amountValue = document.getElementById("amount").value.trim();
  const category = document.getElementById("category").value;

  if (!text || !amountValue) {
    alert("Please enter description and amount");
    return;
  }

  const amount = Number(amountValue);
  if (isNaN(amount)) {
    alert("Amount must be a number");
    return;
  }

  const newTransaction = { id: Date.now(), text, amount, category };
  list.push(newTransaction); // ✅ always mutate array
  saveData();

  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";

  renderUI();
}

// Remove a transaction
export function removeTransaction(id) {
  const index = list.findIndex(t => t.id === id);
  if (index > -1) list.splice(index, 1);
  saveData();
  renderUI();
}

// Filter transactions
export function getFilteredList(search, category) {
  return list.filter(t => {
    const matchesText = t.text.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || t.category === category;
    return matchesText && matchesCategory;
  });
}
