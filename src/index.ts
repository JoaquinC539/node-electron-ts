import { app, BrowserWindow } from 'electron';
import path from 'path'
class Index {

    public static main(args: string[]) {
        let mainWindow: BrowserWindow | null;
        app.on('ready', () => {
            mainWindow = new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    nodeIntegration: true
                }
            });
            mainWindow!.loadFile(path.join(__dirname,"pages/index.html"));

            mainWindow!.on("closed", () => {
                mainWindow = null;
            });

        });

        app.on("window-all-closed",()=>{
            if(process.platform!=="darwin"){
                app.quit();
            }
        });
        app.on("activate",()=>{
            if(BrowserWindow.getAllWindows().length===0){
                mainWindow=new BrowserWindow({
                    width: 800,
                    height: 600,
                    webPreferences: {
                        nodeIntegration: true
                    }
                });
                mainWindow!.loadFile(path.join(__dirname,"pages/index.html"));
            }
        })
    }
}


Index.main(process.argv.slice(2))