const path=require("path");
const fs=require("fs")
const esbuild=require("esbuild");


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
        const fsp=file.split(".")
        if(fsp[fsp.length-1]==="ts"){
            return;
        }        
        const spf=path.join(sp,file);
        const dpf=path.join(dirPath,file)
        if(!fs.lstatSync(spf).isDirectory()){
            fs.copyFileSync(spf,dpf);
        }else{
            return transferFiles("./"+from+"/"+file,"./"+to+"/"+file+"/" )
        }  
    })    
}
// Bundle the browser (renderer process)
const bundleRender=esbuild.build({
    entryPoints:["out/pages/scripts/index.js"],
    outfile:'out/pages/bundle.js',
    bundle:true,
    platform:"browser",
    target:"es2020",
    sourcemap:false,
    minify:true,    
});

const bundleMain=esbuild.build({
    entryPoints:["out/index.js"],
    outfile:"out/index.bundle.js",
    bundle:true,
    platform:"node",
    target:"node18",
    sourcemap:false,
    minify:false,
    external:["electron"]
})

Promise.all([bundleRender,bundleMain])
.then(()=>{
    transferFiles("./src","./out")
    console.log("Build complete.");
})
.catch(()=>process.exit(1))
// esbuild.build({
//     entryPoints:["out/pages/scripts/index.js"],
//     outfile:'out/pages/bundle.js',
//     bundle:true,
//     platform:"browser",
//     target:"es2020",
//     sourcemap:false,
//     minify:true,    
// }).then(()=>{    
//     transferFiles("./src","./out")
// }).catch(()=>process.exit(1))