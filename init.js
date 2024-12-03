const path=require("path");
const fs=require("fs")
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
transferFiles("./src","./out")