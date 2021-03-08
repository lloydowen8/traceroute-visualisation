/**
 * The main application, this is the first thing to run when running the appilcation
 *
 * @packageDocumentation
 */
import { ConfigHandler } from "./parseIPtrace";
import { generalBaseSetup} from "./main_helper";


const viewer = generalBaseSetup();
new ConfigHandler(viewer);
