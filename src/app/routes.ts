async function loadHtml(filePath:string):Promise<string>{
    const response=await fetch(filePath);
    
    if(!response.ok){
        console.error("Response fetching: "+filePath+" not ok");
        return `<h1>404 - Page Not Found</h1>`;
    }    
    return response.text();
}
import "./pages/home/HomePage"
export const routes: { [key: string]: string | Promise<string> } = {
    // '/': `<h1>Welcome to Home!</h1><a href="/about">Go to About</a><br><a href="/edit/id">Go to edit</a>`,    
    '/': `<home-page></home-page>`,    
    '/about': `<h1>About Page</h1><a href="/">Back to Home</a>`,
    '/edit/id':`<h1>edit with page</h1><a href="/">Back to Home</a>`
};