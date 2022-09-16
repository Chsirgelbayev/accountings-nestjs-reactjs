import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AccountingsController } from './accountings.controller';
import { Accounting, accountingsSchema } from './accountings.schema';
import { AccountingsService } from './accountings.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Accounting.name, schema: accountingsSchema }
        ]),
        AuthModule
    ],
    controllers: [AccountingsController],
    providers: [AccountingsService]
})
export class AccountingsModule {}
