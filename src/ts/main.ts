/**
 * The main application, this is the first thing to run when running the appilcation
 *
 * @packageDocumentation
 */
import { applyConfig, generalBaseSetup} from "./main_helper";
import { ConfigHandler } from "./parseIPtrace";

/* eslint @typescript-eslint/no-magic-numbers: off */
const viewer = generalBaseSetup();
new ConfigHandler(viewer);
//ApplyConfig(viewer, ["146.97.154.1", "146.97.38.25"]);
//GeoLocator.getGeolocation("130.209.240.48");
// If using a websocket, put in the right address in the line below.
// Note that an address which does not serve any data can be put and nothing will be recieved
// (The program will not error in this case (only if malformed data is sent it will emit a warning))

