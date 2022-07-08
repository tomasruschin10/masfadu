import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException, Request, HttpException, HttpStatus, Response} from '@nestjs/common';
import {AuthService} from './auth.service';
import * as config from "config";
import * as jwt from 'jsonwebtoken';
import {AuthUserDtoDto} from "./dto/AuthUserDto.dto";
import * as admin from 'firebase-admin';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({passReqToCallback: true, usernameField: 'userOrEmail'});
    }

    async validate(@Request() req): Promise<any> {
        const res:any = await this.authService.login(req.body.userOrEmail, req.body.password);
        if (!res) {
            throw new UnauthorizedException();
        }
        
        return jwt.sign({
            userData: res
        }, config.get("keys.jwtKey"), {
            expiresIn: config.get("globals.expJWT")
        });
    }
}