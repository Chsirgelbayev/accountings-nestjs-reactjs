import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import {
    MongooseModuleOptions,
    MongooseOptionsFactory
} from '@nestjs/mongoose';
import { PropertyPath } from 'src/common/enums';

@Injectable()
export class MongooseOptions implements MongooseOptionsFactory {
    constructor(private readonly _configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions {
        const MONGO_URL: string = this._configService.get(
            PropertyPath.MONGO_URL
        );

        return {
            uri: MONGO_URL,
            connectionFactory: connection => {
                console.log(`MongoDB connected: ${connection.host}`);
                return connection;
            }
        };
    }
}