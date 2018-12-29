export declare enum Environment {
    Dev = "dev",
    Local = "local",
    Test = "test",
    Production = "production"
}
declare const env: {
    NODE_ENV: Environment;
    PORT: number;
};
export default env;
