import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    MongooseConfigModule,
    MongooseConfigService
} from '@accountings/configuration';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [MongooseConfigModule],
            useClass: MongooseConfigService
        })
    ]
})
export class DatabaseModule {}
