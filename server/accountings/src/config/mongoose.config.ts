import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import {
    MongooseModuleOptions,
    MongooseOptionsFactory
} from '@nestjs/mongoose';
import { ConfigEnum } from 'src/common/enums/config.enums';

@Injectable()
export class MongooseConfigOptions implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions {
        const MONGO_URL: string = this.configService.get(ConfigEnum.MONGO_URL);

        return {
            uri: MONGO_URL,
            connectionFactory: connection => {
                console.log(`MongoDB connected: ${connection.host}`);
                return connection;
            }
        };
    }
}
