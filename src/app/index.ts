import { checkInitialRoute,setAnchorElements,renderRoute } from "./router";


document.addEventListener("DOMContentLoaded", () => {
    const currentroute = checkInitialRoute();
    renderRoute(currentroute)
    
});
window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    renderRoute(path)
})





