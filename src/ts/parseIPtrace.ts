import { GeneralLogger } from "./logger";
import {applyConfig} from "./main_helper";

/**
 * Interface for a number of configuration options for the application
 */
export interface Config{
    latitude: string;
    longitude: string;
}

/**
 * Handles configs and related stuff
 */
export class ConfigHandler{
    viewer: Cesium.Viewer;
    constructor(viewer : Cesium.Viewer){
        this.viewer = viewer;
        this.setupLoadConfigButton();
    }

    /**
     * Apply the config object to associated viewer
     *
     * @param rawFile - A stringified traceroutemap
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async createAndAplyConfig(rawFile: string){
        const rows = rawFile.split("\n");
        //Console.log(rows);
        for(const row of rows){
            const ips = row.split(" -- ");
            const ipRow = [];
            for(const ip of ips){
                ipRow.push(ip.slice(1, ip.length - 1));
            }
            await applyConfig(this.viewer, ipRow);
        }
    }

    /**
     * Load in the config file from the client computer,
     * i.e a file which they select and run a callback
     *
     * @param filePath - The location of the file, usually supplied from a input tag from HTML
     */
    loadConfigFromClient(filePath: File | null): void{
        if(filePath != null) {
            const reader = new FileReader();
            reader.readAsText(filePath, "utf8");
            reader.onload = (event) => {
                this.createAndAplyConfig(event.target?.result as string);
            };
            reader.onerror = (e) => {
                GeneralLogger.error("Error loading config: " + e);
            };
        }
    }


    /**
     * Load in the config file from the client computer,
     * i.e a file which they select and run a callback
     */
    setupLoadConfigButton(): void {
        const confFileButton = document.getElementById("confFile") as HTMLInputElement;
        if(confFileButton != null) {
            confFileButton.addEventListener("change", () => {
                if(confFileButton.files) {
                    if(confFileButton.files.length > 1) {
                        alert("Only 1 file can be selected");
                        GeneralLogger.error("Did not laod config files, only 1 can be leceted at a time");
                    } else if(confFileButton.files.length == 1) {
                        this.loadConfigFromClient(confFileButton.files.item(0));
                    }
                }
            });
        } else {
            console.log("Button not found");
        }
    }
}
