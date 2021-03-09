/* eslint-disable sort-imports */
//I cant figure out how this is not in aphabetical order...
import * as Cesium from "cesium_source/Cesium";
import {ipLogger} from "./logger";
import {geoLocator} from "./main";

/* eslint @typescript-eslint/no-magic-numbers: off */

/**
 * Set up base and return the viewer and the FOV objects
 *
 * @returns The viewer and the FOV object which have been created
 */
export function generalBaseSetup(): Cesium.Viewer{
    // The tiles used below are open source at https://github.com/stamen/terrain-classic
    const imageryProvider = new Cesium.UrlTemplateImageryProvider({
        url : "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
        credit : "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
    });

    // Set up basic viewer
    const viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        timeline: false,
        geocoder: false,
        selectionIndicator: false,
        infoBox: false,
        vrButton: false,
        fullscreenButton: false,
        imageryProvider: imageryProvider,
        sceneMode: Cesium.SceneMode.SCENE2D,
    });
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.primitives.add(globalPoints);
    viewer.scene.primitives.add(globallines);
    return viewer;
}


const globalPoints = new Cesium.PointPrimitiveCollection();
const globallines = new Cesium.PolylineCollection();
/**
 * Applies the config to the viewer
 *
 * @param viewer -  viewer
 * @param ips -  the config for the application
 * @returns the promise
 */
export async function applyConfig(viewer:Cesium.Viewer, ips: string[]): Promise<void>{
    ipLogger.info("Getting location for: " + ips[0] + " -- " + ips[1]);
    return Promise.all([geoLocator.getGeolocation(ips[0]), geoLocator.getGeolocation(ips[1])]).then(([point1, point2]) => {
        if(typeof point1 === "function"){
            ipLogger.warn("Unable to parse repsonse for ip" + ips[0]);
            return;
        }
        if(typeof point2 === "function"){
            ipLogger.warn("Unable to parse repsonse for ip" + ips[1]);
            return;
        }
        point1 = point1 as string[];
        point2 = point2 as string[];
        let pointPrim1 = null;
        let pointPrim2 = null;
        if(Number(point1[0]) == 0){
            ipLogger.error("Unable to get location for: " + ips[0]);
        } else {
            ipLogger.info("Location for " + ips[0] + ": " + point1[1] + " " + point1[0]);
            pointPrim1 = globalPoints.add({
                position: Cesium.Cartesian3.fromDegrees(Number(point1[1]), Number(point1[0])),
                color: Cesium.Color.RED,
                pixelSize: 10,
            });
        }
        if(Number(point2[0]) == 0){
            ipLogger.error("Unable to get location for: " + ips[1]);
        } else {
            ipLogger.info("Location for " + ips[1] + ": " + point2[1] + " " + point2[0]);
            pointPrim2 = globalPoints.add({
                position: Cesium.Cartesian3.fromDegrees(Number(point2[1]), Number(point2[0])),
                color: Cesium.Color.RED,
                pixelSize: 10,
            });
        }
        if(pointPrim1 && pointPrim2){
            globallines.add({
                positions: [pointPrim1.position, pointPrim2.position],
                width : 5.0,
                material : new Cesium.Material({
                    fabric : {
                        type : "Color",
                        uniforms : {
                            color : Cesium.Color.GREEN,
                        },
                    },
                }),
            });
        } else {
            ipLogger.warn("Can't draw line because one is the points hasn't got a location");
        }
    });
}
