import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import {
    MongooseModuleOptions,
    MongooseOptionsFactory
} from '@nestjs/mongoose';
import { ConfigEnum } from '../enums/config.enum';
import { configuration } from './configuration';

@Injectable()
export class MongoConfig implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.configService.get(ConfigEnum.MONGO_URL),
            connectionFactory: connection => {
                console.log(`MongoDB connected: ${connection.host}`);
                return connection;
            }
        };
    }
}
