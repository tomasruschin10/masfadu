import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import {UserController} from "./user.controller";
import { JwtModule } from '@nestjs/jwt';
import * as config from "config";
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    controllers: [UserController],
    imports: [PassportModule,
        // JwtModule.register({
        //     secret: config.get("keys.jwtKey"),
        //     signOptions: { expiresIn: config.get("globals.expJWT") },
        // }),
         SharedModule],
    providers: [UserService],
})
export class UserModule {}
