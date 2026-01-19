import { Router } from "./router.js";

let app = document.getElementById("app")

function PageNotFound() {
    app.innerHTML = "<h1>Error</h1>"
}

new Router()
.on("/", () => app.innerHTML = "<h1>Home</h1>")
.on("/about", () => app.innerHTML = "<h1>About</h1>")
.on("/contact", () => app.innerHTML = "<h1>Contact</h1>")
.listen(PageNotFound);
