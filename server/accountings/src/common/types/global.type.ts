declare global {
    namespace Express {
        interface Request {
            user: any;
            options: any
        }
    }
}

export {};
