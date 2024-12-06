import { routes } from "./routes";

const rootDiv = document.getElementById('app')!;

export function checkInitialRoute(): string {
    const protocol=window.location.protocol;
    const pathname=window.location.pathname;
    if(protocol==="file:"){
        return "/";
    }else{       
        const segments=pathname.split("/");  
        const route = segments[segments.length-1]==="index.html" ? "/":pathname 
        return route;
    }
    
}

export function setAnchorElements(): void {
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

export async function renderRoute(path: string) {
    const contentPromise=routes[path]
    const content: string | undefined | null = await contentPromise;
    if (content !== undefined && content !== null) {
        rootDiv!.innerHTML = content;
        setAnchorElements();
        history.pushState({}, "", path)
    } else {
        rootDiv!.innerHTML = `<h1>404 - Page Not Found</h1>`
    }
}

