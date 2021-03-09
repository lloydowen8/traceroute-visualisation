/**
 * The main application, this is the first thing to run when running the appilcation
 *
 * @packageDocumentation
 */
import { ConfigHandler } from "./parseIPtrace";
import { generalBaseSetup} from "./main_helper";
import { ipGeolocator } from "./ipGeolocator";

const apiKey = "5e890a77d73b198f89900ec7652d7267";
const viewer = generalBaseSetup();
new ConfigHandler(viewer);
export const geoLocator = new ipGeolocator(apiKey);

