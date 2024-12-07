export abstract class BasePage extends HTMLElement{
    constructor(){
        super();
    }

    async connectedCallback(){
        const template=this.getTemplate();
        this.innerHTML=template;

        await this.asyncInitialize();
        this.script();
    }

    protected initialize():void{} 

    protected abstract getTemplate():string

    protected async asyncInitialize():Promise<void>{}    

    protected script(){}
}