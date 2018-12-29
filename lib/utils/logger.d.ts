declare type LogFunc = (msg: string, obj?: object) => void;
declare const logger: {
    fatal: LogFunc;
    error: LogFunc;
    warn: LogFunc;
    info: LogFunc;
    debug: LogFunc;
    trace: LogFunc;
};
export default logger;
