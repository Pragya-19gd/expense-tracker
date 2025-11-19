export function saveData() {
  localStorage.setItem("transactions", JSON.stringify(list));
}
