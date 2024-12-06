import { checkInitialRoute,setAnchorElements,renderRoute } from "./router";


document.addEventListener("DOMContentLoaded", () => {
    const currentroute = checkInitialRoute();
    renderRoute(currentroute)
    // rootDiv!.innerHTML = routes[currentroute] || `<h1>404 - Page Not Found</h1>`;
    setAnchorElements();
});
window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    renderRoute(path)
})





