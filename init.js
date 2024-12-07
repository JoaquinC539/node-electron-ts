const path=require("path");
const fs=require("fs");
const { execSync } = require("child_process");
const createDir=(relPath)=>{
    if(!fs.existsSync(relPath)){        
        fs.mkdirSync(relPath);
    }
}
const transferFiles=(from,to)=>{
    createDir(to);
    if(!fs.existsSync(from)){        
        console.log("Error it doesnt exists said relative source path directory")
        return;
    }    
    const sp=path.join(__dirname,from)
    const dirPath=path.join(__dirname,to)
    const files=fs.readdirSync(sp)    
    files.forEach((file)=>{
        const spf=path.join(sp,file);
        const dpf=path.join(dirPath,file)     
        if(file.endsWith(".ts")){
            return;
        }
        if(file.endsWith(".html") && file!=="index.html"){
            const htmlContent=fs.readFileSync(spf,"utf-8");
            const jsContent=`export default \`${htmlContent}\`;`;
            // const jsContent=`export const template = \`${htmlContent}\`;`;
            const jsFilePath=dpf.replace(/\.html$/,".js");
            fs.writeFileSync(jsFilePath,jsContent,"utf-8");
            return;
        }
        
        if(!fs.lstatSync(spf).isDirectory()){
            fs.copyFileSync(spf,dpf);
        }else{
            
            return transferFiles("./"+from+"/"+file,"./"+to+"/"+file+"/" )
        }  
    })    
}


transferFiles("./src","./out");
execSync("tsc --project tsconfig.node.json",{stdio:"inherit"});

execSync("tsc --project tsconfig.app.json",{stdio:"inherit"});

execSync("node esbuild.config.js")

console.log("Build completed")