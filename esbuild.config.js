const path=require("path");
const fs=require("fs")
const esbuild=require("esbuild");
const cheerio=require("cheerio")

const htmlPlugin = {
    name: 'html-plugin',
    setup(build) {
        build.onLoad({ filter: /\.html$/ }, async (args) => {
            let content = await fs.promises.readFile(args.path, 'utf8');
            content = content.replace(/<link\s+rel="stylesheet"\s+href="(.+?\.css)">/g, (_, cssPath) => {
                const cssFilePath = path.resolve(path.dirname(args.path), cssPath);
                const cssContent = fs.existsSync(cssFilePath)
                    ? fs.readFileSync(cssFilePath, 'utf8')
                    : '';
                return `<style>${cssContent}</style>`;
            });
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
    plugins:[htmlPlugin],
    
      
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
