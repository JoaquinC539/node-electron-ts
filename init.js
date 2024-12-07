const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const createDir = (relPath) => {
    if (!fs.existsSync(relPath)) {
        fs.mkdirSync(relPath);
    }
}
const transferFiles = (from, to) => {
    createDir(to);
    if (!fs.existsSync(from)) {
        console.log("Error it doesnt exists said relative source path directory")
        return;
    }
    const sp = path.join(__dirname, from)
    const dirPath = path.join(__dirname, to)
    const files = fs.readdirSync(sp)
    files.forEach((file) => {
        const spf = path.join(sp, file);
        const dpf = path.join(dirPath, file)
        if (file.endsWith(".ts")) {
            return;
        }
        if (file.endsWith(".html") && file !== "index.html") {
            const htmlContent = fs.readFileSync(spf, "utf-8");
            const jsContent = `export default \`${htmlContent}\`;`;
            // const jsContent=`export const template = \`${htmlContent}\`;`;
            const jsFilePath = dpf.replace(/\.html$/, ".js");
            fs.writeFileSync(jsFilePath, jsContent, "utf-8");
            fs.copyFileSync(spf,dpf);
            return;
        }

        if (!fs.lstatSync(spf).isDirectory()) {
            fs.copyFileSync(spf, dpf);
        } else {

            return transferFiles("./" + from + "/" + file, "./" + to + "/" + file + "/")
        }
    })
}
try {
    console.log("Copying and parsing html")
    transferFiles("./src", "./out");
    console.log("ts building ts node")
    execSync("tsc --project tsconfig.node.json", { stdio: "inherit" });
    console.log("ts building ts app")
    execSync("tsc --project tsconfig.app.json", { stdio: "inherit" });
    console.log("Bundling...")
    execSync("node esbuild.config.js")

    console.log("Build completed")
} catch (error) {
    process.exit(1)
}
