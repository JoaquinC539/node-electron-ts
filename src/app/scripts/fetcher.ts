export async function loadHtml(filePath:string):Promise<string>{
    console.log(window.location)
    const response=await fetch(filePath);
    
    if(!response.ok){
        console.error("Response fetching: "+filePath+" not ok");
        return `<h1>404 - Page Not Found</h1>`;
    }    
    return response.text();
}