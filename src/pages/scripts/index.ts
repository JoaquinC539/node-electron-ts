const routes:{[key:string]:string} = {
    '/': `<h1>Welcome to Home!</h1><a href="/about">Go to About</a>`,
    '/about': `<h1>About Page</h1><a href="/">Back to Home</a>`,
};

const rootDiv = document.getElementById('app');

function checkInitialRoute():string{
    const appRootPath="/"
    console.log(window.location.protocol);
    const pathSegment=appRootPath.replace(/^\/|\/$/g, '').replace(/^([A-Za-z]:)/, '').split("/");
    if(pathSegment.length===0 ||(pathSegment.length === 1 && pathSegment[0] === '') ){
        // history.pushState({},"","/")
        console.log("inital",window.location)
        return "/";
    }else{
        return pathSegment[0];
    }
    
}

function setAnchorElements():void{
    document.querySelectorAll("a").forEach((link:HTMLAnchorElement)=>{
        const refLink:string|null=link.getAttribute("href");        
        if(refLink!==null){
            link.addEventListener("click",(event)=>{
                event.preventDefault();
                renderRoute(refLink);
            })
        }
    }) 
}

function renderRoute(path:string){  
    const content:string|undefined|null=routes[path];
    if(content!==undefined && content !==null){
        rootDiv!.innerHTML=content;
        setAnchorElements();
        history.pushState({},"",path)
    }else{
        rootDiv!.innerHTML=`<h1>404 - Page Not Found</h1>`
    }    
    
}



document.addEventListener("DOMContentLoaded",()=>{
    const currentroute=checkInitialRoute(); 
    rootDiv!.innerHTML=routes[currentroute] || `<h1>404 - Page Not Found</h1>`;
    setAnchorElements();
});
window.addEventListener("popstate",()=>{
    console.log("popstate",window.location)
})





