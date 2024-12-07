const path=require("path");
const fs=require("fs")
const esbuild=require("esbuild");
const cheerio=require("cheerio")
// const htmlPlugin=require("esbuild-plugin-html");


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
// Bundle the browser (renderer process)
const bundleRender=esbuild.build({
    entryPoints:["out/app/index.js"],
    outfile:'out/app/bundle.js',
    bundle:true,
    platform:"browser",
    target:"es2020",
    sourcemap:false,
    minify:true,  
    // plugins:[htmlPlugin({exclude: /node_modules/})]  
});

const bundleMain=esbuild.build({
    entryPoints:["out/node/index.js"],
    outfile:"out/node/index.bundle.js",
    bundle:true,
    platform:"node",
    target:"node18",
    sourcemap:false,
    minify:true,
    external:["electron"]
})

Promise.all([bundleRender,bundleMain])
.then(()=>{
    transferFiles("./src","./out")
    console.log("Build complete.");
})
.catch(()=>process.exit(1))
