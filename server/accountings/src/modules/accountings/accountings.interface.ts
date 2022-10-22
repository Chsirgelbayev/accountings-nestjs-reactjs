import { ExpressResponse } from 'src/interfaces';
import { Accounting } from './accountings.schema';

export class GetAllAccountingsResponse extends ExpressResponse<Accounting[]> {}

export class CreateAccountingResponse extends ExpressResponse<Accounting> {}

export class UpdateAccountingResponse extends ExpressResponse<Accounting> {}
