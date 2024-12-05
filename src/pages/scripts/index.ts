const routes: { [key: string]: string } = {
    '/': `<h1>Welcome to Home!</h1><a href="/about">Go to About</a><br><a href="/edit/id">Go to edit</a>`,
    '/about': `<h1>About Page</h1><a href="/">Back to Home</a>`,
    '/edit/id':`<h1>edit with page</h1><a href="/">Back to Home</a>`
};

const rootDiv = document.getElementById('app');

function checkInitialRoute(): string {
    const protocol=window.location.protocol;
    const pathname=window.location.pathname
    console.log(window.location)
    if(protocol==="file:"){
        return "/";
    }else{
        console.log(pathname)
        const cleanPathname=pathname.replace(/index\.html$/,"")
        const segments=pathname.split("/");  
        const route = segments[segments.length-1]==="index.html" ? "/":pathname      
        console.log(segments)
        return route;
    }
    /*let appRootPath = "/";
    console.log(window.location.pathname)
    const pathSegment = appRootPath.replace(/^\/|\/$/g, '').replace(/^([A-Za-z]:)/, '').split("/");
    console.log(pathSegment)
    if (pathSegment.length === 0 || (pathSegment.length === 1 && pathSegment[0] === '')) {
        history.pushState({}, "", "/")
        
    } else {
        return pathSegment[0];
    }*/
}

function setAnchorElements(): void {
    document.querySelectorAll("a").forEach((link: HTMLAnchorElement) => {
        const refLink: string | null = link.getAttribute("href");
        if (refLink !== null) {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                renderRoute(refLink);
            })
        }
    })
}

function renderRoute(path: string) {
    console.log(window.location.pathname)
    const content: string | undefined | null = routes[path];
    if (content !== undefined && content !== null) {
        rootDiv!.innerHTML = content;
        setAnchorElements();
        history.pushState({}, "", path)
    } else {
        rootDiv!.innerHTML = `<h1>404 - Page Not Found</h1>`
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const currentroute = checkInitialRoute();
    console.log("current route",currentroute)
    rootDiv!.innerHTML = routes[currentroute] || `<h1>404 - Page Not Found</h1>`;
    setAnchorElements();
});
window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    renderRoute(path)
})





