import { list, removeTransaction, getFilteredList } from "./transaction.js";

const categoryIcons = { 
  Food: "🍔", Shopping: "🛍️", Travel: "✈️", Bills: "📄", Salary: "💰", Other: "🔖" 
};

export function renderUI() {
  const listEl = document.getElementById("list");
  const searchInput = document.getElementById("search").value.toLowerCase();
  const categoryFilter = document.getElementById("filterCategory").value || "all";

  const filteredList = Array.isArray(getFilteredList(searchInput, categoryFilter))
    ? getFilteredList(searchInput, categoryFilter)
    : [];

  // --- Calculate totals ---
  let income = 0, expense = 0;
  filteredList.forEach(t => {
    if (t.amount > 0) income += t.amount;
    else expense += Math.abs(t.amount); // ✅ take absolute value
  });

  const balance = income - expense;

  document.getElementById("balance").textContent = `₹${balance}`;
  document.getElementById("money-plus").textContent = `+₹${income}`;
  document.getElementById("money-minus").textContent = `-₹${expense}`;

  // --- Render transaction list ---
  listEl.innerHTML = "";
  filteredList.forEach(t => {
    const li = document.createElement("li");
    li.className = t.amount < 0 ? "minus glass" : "plus glass";
    li.innerHTML = `
      <span class="icon">${categoryIcons[t.category] || "🔖"}</span>
      <span class="text">${t.text} <small>${t.category}</small></span>
      <span class="amount">₹${t.amount}</span>
      <button class="delete-btn" data-id="${t.id}">×</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => removeTransaction(t.id));
    listEl.appendChild(li);
  });
}
