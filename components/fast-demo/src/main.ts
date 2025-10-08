import "./style.css";
import "./app-shell";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app element not found");
}

app.innerHTML = "<app-shell></app-shell>";
