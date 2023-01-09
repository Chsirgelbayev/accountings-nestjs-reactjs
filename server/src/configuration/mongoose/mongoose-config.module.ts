import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { MongooseConfigService } from './mongoose-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        })
    ],
    providers: [MongooseConfigService],
    exports: [ConfigModule, MongooseConfigService]
})
export class MongooseConfigModule {}
