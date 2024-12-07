import { checkInitialRoute,renderRoute } from "./router";
import "./app.css"

document.addEventListener("DOMContentLoaded", () => {
    const currentroute = checkInitialRoute();
    renderRoute(currentroute)
    
});
window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    renderRoute(path)
})





