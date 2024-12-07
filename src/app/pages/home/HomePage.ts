
import content from './home.html'
class HomePage extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback() {
        this.innerHTML=content;

        this.run();
    }
    private run() {
        // console.log(template)
        const element = document.getElementById("texttoModify")
        if (element !== null) {
            element!.innerHTML = "Text modifief in script";
        }
    }
}
customElements.define("home-page", HomePage);

