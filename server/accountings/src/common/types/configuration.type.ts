export interface Configuration {
    readonly PORT: number | string;
    readonly NODE_ENV: string;
    readonly MONGO_URL: string;
    readonly JWT: {
        readonly SECRET: string;
        readonly EXPIRE: string;
        readonly COOKIE_EXPIRE: string;
    };
    readonly SWAGGER: {
        readonly TITLE: string;
        readonly DESCRIPTION: string;
        readonly VERSION: string;
        readonly PATH: string;
    };
}
