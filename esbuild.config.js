const path=require("path");
const fs=require("fs")
const esbuild=require("esbuild");
const cheerio=require("cheerio")
// const htmlPlugin=require("esbuild-plugin-html");
const htmlPlugin = {
    name: 'html-plugin',
    setup(build) {
        build.onLoad({ filter: /\.html$/ }, async (args) => {
            const content = await fs.promises.readFile(args.path, 'utf8');
            return {
                contents: `export default ${JSON.stringify(content)};`,
                loader: 'js',
            };
        });
    },
};


// Bundle the browser (renderer process)
const bundleRender=esbuild.build({
    entryPoints:["out/app/index.js"],
    outfile:'out/app/bundle.js',
    bundle:true,
    platform:"browser",
    target:"es2020",
    sourcemap:false,
    minify:true,  
    plugins:[htmlPlugin]
      
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
    
    console.log("Build complete.");
})
.catch(()=>process.exit(1))
