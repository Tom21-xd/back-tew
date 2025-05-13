import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authService } from './auth.service';
import { authController } from './auth.controller';
import { userModule } from '../user/user.module';
import { jwtStrategy } from './strategies/jwtStrategy';
import { localStrategy } from './strategies/localStrategy';

@Module({
  imports: [
    userModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // luego lo pasas a variables de entorno
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [authController],
  providers: [authService, localStrategy, jwtStrategy],
})
export class authModule {}
