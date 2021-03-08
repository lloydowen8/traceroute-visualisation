/**
 * This file holds all the logging the program uses (that is the format of the logging).
 * This is a custom implementation because none seemed suitable (and actively maintained) on npm.
 *
 * @packageDocumentation
 */

/**
 * The log level to log messages, debug is the highest, error is the lowest
 */
enum LogLevel{
    Debug = 4,
    Info = 3,
    Warning = 2,
    Error = 1,
    Fatal = 0,
}

let messageCount = 0;
const MAX_MESSAGES = 200;

/**
 * Type for the logging printers, i.e where to print to
 */
interface Printer{
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
    custom(message: string): void;
}

/**
 * A printer for the logger to log to the embedded HTML console
 */
class HTMLPrinter implements Printer{
    /**
     * @param message - The message to print to the HTML
     */
    private print(message: string){
        const para = document.createElement("p");
        const loggerDiv = document.getElementById("loggercontainer");
        para.className = "log";
        messageCount += 1;
        if(messageCount > MAX_MESSAGES){
            const toRemove = document.getElementById("log" + (messageCount - MAX_MESSAGES));
            toRemove?.remove();
        }
        para.id = "log" + messageCount;
        para.innerHTML = message;
        if(loggerDiv != null){
            loggerDiv.appendChild(para);
            para.scrollIntoView(true);
        }
    }

    /**
     * @param message - The message to print to the console
     */
    public debug(message: string){
        this.print("<span id='log-debug'>[DEBUG]</span>" + message);
    }

    /**
     * @param message - The message to print to the console
     */
    public info(message: string){
        this.print("<span id='log-info'>[INFO]</span>" + message);
    }

    /**
     * @param message - The message to print to the console
     */
    public warn(message: string){
        this.print("<span id='log-warning'>[WARNING]</span>" + message);
    }

    /**
     * @param message - The message to print to the console
     */
    public error(message: string){
        this.print("<span id='log-error'>[ERROR]</span>" + message);
    }

    /**
     * @param message - The message to print to the console
     */
    public fatal(message: string){
        this.print("<span id='log-fatal'>[FATAL]</span>" + message);
    }

    /**
     * @param message - The message to print to the console
     */
    public custom(message: string){
        this.print(message);
    }
}

/**
 * A printer for the logger to log to the web console
 */
class ConsolePrinter implements Printer{
    /**
     * @param message - The message to print to the console
     */
    public debug(message: string){
        console.debug(message);
    }

    /**
     * @param message - The message to print to the console
     */
    public info(message: string){
        console.info(message);
    }

    /**
     * @param message - The message to print to the console
     */
    public warn(message: string){
        console.warn(message);
    }

    /**
     * @param message - The message to print to the console
     */
    public error(message: string){
        console.error(message);
    }

    /**
     * @param message - The message to print to the console
     */
    public fatal(message: string){
        console.error(message);
    }

    /**
     * @param message - The message to print to the console
     */
    public custom(message: string){
        console.log(message);
    }
}

/**
 * A custom logger to standardise logging,
 * there doesn't seem to be a suitable maintained alternative on npm
 */
class CustomLogger{
    prefix: string;
    level: LogLevel;
    printers: Printer[];

    constructor(opts?: {prefix?: string, level?: LogLevel, printer?: Printer[]}){
        this.prefix = "";
        this.level = LogLevel.Debug;
        this.printers = [new ConsolePrinter(), new HTMLPrinter()];
        if(opts != undefined){
            if(opts.prefix != undefined){
                this.prefix = opts.prefix;
            }
            if(opts.level != undefined){
                this.level = opts.level;
            }
            if(opts.printer != undefined){
                this.printers = opts.printer;
            }
        }
    }

    /**
     * Set a prefix for the logger.
     * Do not use this, this is here just in case
     * but will be removed in the future.
     *
     * @param prefix - The prefix to use
     */
    set setPrefix(prefix: string){
        this.prefix = prefix;
    }

    /**
     * Log an info message
     *
     * @param message -  The message to log
     */
    public info(message: string){
        if(LogLevel.Info <= this.level){
            for(const printer of this.printers){
                printer.info(this.prefix + " " + message);
            }
        }
    }

    /**
     * Log an error message
     *
     * @param message -  The message to log
     */
    public error(message: string){
        if(LogLevel.Error <= this.level){
            for(const printer of this.printers){
                printer.error(this.prefix + " " + message);
            }
        }
    }

    /**
     * Log a fatal error message
     *
     * @param message -  The message to log
     */
    public fatal(message: string){
        if(LogLevel.Fatal <= this.level){
            for(const printer of this.printers){
                printer.fatal(this.prefix + " " + message);
            }
        }
    }

    /**
     * Log a warn message
     *
     * @param message -  The message to log
     */
    public warn(message: string){
        if(LogLevel.Warning <= this.level){
            for(const printer of this.printers){
                printer.warn(this.prefix + " " + message);
            }
        }
    }

    /**
     * Log a debug message
     *
     * @param message -  The message to log
     */
    public debug(message: string){
        if(LogLevel.Debug <= this.level){
            for(const printer of this.printers){
                printer.debug(this.prefix + " " + message);
            }
        }
    }

    /**
     * Log a message with a custom prefix
     *
     * @param prefix - The logging prefix (e.g info, debug...)
     * @param message -  The message to log
     */
    public custom(prefix: string, message: string){
        for(const printer of this.printers){
            printer.custom(prefix + this.prefix + " " + message);
        }
    }
}

/// A general logger for general things
export const GeneralLogger = new CustomLogger({prefix: "[General]"});

/// Logger for video related things
export const VideoLogger = new CustomLogger({prefix: "[Video]"});

/// Logger for image related things
export const ImageLogger = new CustomLogger({prefix: "[Image]"});

/// Logger for FOV related things
export const FOVLogger = new CustomLogger({prefix: "[FOV]"});

/// Logger for VGIP related things
export const VGIPLogger = new CustomLogger({prefix: "[VGIP]"});
