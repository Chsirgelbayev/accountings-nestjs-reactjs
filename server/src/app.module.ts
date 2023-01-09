import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AccountingsModule } from './accountings/accountings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AuthModule, UsersModule, AccountingsModule, DatabaseModule]
})
export class AppModule {}
