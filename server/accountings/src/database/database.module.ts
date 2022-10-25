import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseOptions } from './mongoose.options';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useClass: MongooseOptions
        })
    ]
})
export class DatabaseModule {}
