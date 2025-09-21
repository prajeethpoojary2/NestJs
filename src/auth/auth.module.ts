import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService],
  imports:[DatabaseModule,JwtModule]
})
export class AuthModule {}
