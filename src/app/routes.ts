import { loadHtml } from "./scripts/fetcher";
import "./pages/home/HomePage"



export const routes: { [key: string]: string  } = {
    '/': `<h1>Welcome to Home!</h1><a href="/about">Go to About</a><br><a href="/edit/id">Go to edit</a><br><a href="/test">Go to test</a>`,
    "/test":"<home-page></home-page>",
    '/about': `<h1>About Page</h1><a href="/">Back to Home</a>`,
    '/edit/id':`<h1>edit with page</h1><a href="/">Back to Home</a>`
};