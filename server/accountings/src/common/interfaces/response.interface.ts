export class ExpressResponse<T> {
    readonly success: boolean;
    readonly data?: T;
}
