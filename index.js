import { Router } from "./router.js";

let app = document.getElementById("app");

let router = new Router()
.on("/", () => app.innerHTML = "<h1>Home</h1>")
.on("/about", () => app.innerHTML = "<h1>About</h1>")
.on("/contact", () => app.innerHTML = "<h1>Contact</h1>")
.listen({ autoFire: true });
