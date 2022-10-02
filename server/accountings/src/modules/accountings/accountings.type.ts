import { Accounting } from './accountings.schema';

export class GetAllAccountingsResponse {
    readonly success: true;
    readonly data: Accounting[];
}

export class CreateAccountingResponse {
    readonly success: true;
    readonly data: Accounting;
}

export class UpdateAccountingResponse {
    readonly success: true;
    readonly data: Accounting;
}
