import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { JwtConfigService } from './jwt-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        })
    ],
    providers: [JwtConfigService],
    exports: [ConfigModule, JwtConfigService]
})
export class JwtConfigModule {}
