async function loadHtml(filePath:string):Promise<string>{
    const response=await fetch(filePath);
    
    if(!response.ok){
        console.error("Response fetching: "+filePath+" not ok");
        return `<h1>404 - Page Not Found</h1>`;
    }    
    return response.text();
}
class HomePage extends HTMLElement{
    constructor(){
        super();        
    }
    connectedCallback(){
        this.render();
    }
    render(){
        this.innerHTML = `
            <style>
                /* Scoped styles */
                h1 {
                    color: blue;
                }
                a {
                    text-decoration: none;
                    color: darkblue;
                }
            </style>
            <h1>Welcome to Home!</h1>
            <p id="texttoModify">text</p>
            <a href="/about">Go to About</a>
            <br>
            <a href="/edit/id">Go to Edit</a>
        `;

        console.log("HomePage component");
        const element=document.getElementById("texttoModify")
        console.log(element);
        if(element!==null){
            element!.innerHTML="Text modifief in script";
        }
    }
}
customElements.define("home-page",HomePage);