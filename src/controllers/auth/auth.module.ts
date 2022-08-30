import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import {AuthController} from "./auth.controller";
import { JwtModule } from '@nestjs/jwt';
import * as config from "config";
import { JwtStrategy } from './jwt.strategy';
import { SharedModule } from 'src/modules/shared/shared.module';
import { FirestorageService } from '../firestorage/firestorage.service';
import { MailPasswordHtml } from 'src/utils/html/mail_password';
import { MailPasswordCodeHtml } from 'src/utils/html/mail_password_code';

@Module({
    controllers: [AuthController],
    imports: [PassportModule,
        JwtModule.register({
            secret: config.get("keys.jwtKey"),
            signOptions: { expiresIn: config.get("globals.expJWT") },
        }), SharedModule],
    providers: [AuthService, LocalStrategy, JwtStrategy, FirestorageService, MailPasswordHtml, MailPasswordCodeHtml],
    exports:[JwtStrategy]
})
export class AuthModule {}
