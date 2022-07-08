import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, ParseIntPipe, Put, Param, Delete, UnauthorizedException} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';
import { WinstonLogger } from '@payk/nestjs-winston';
import { AuthService } from './auth.service';
import * as config from "config";
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { IRegisterBody, IUpdateBody } from './interfaces/auth.interfaces';
import { ExtractJwt } from 'passport-jwt';
import { TokenDto, AuthUserDtoDto, authRegisterDto, authUserDto, authUpdateDto } from './dto/AuthUserDto.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    private readonly logger = new WinstonLogger(AuthController.name);
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiParam({name: 'userOrEmail', required: true})
    @ApiParam({name: 'password', required: true})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse ({status: 401, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Authentication successful', type: TokenDto})
    async login(@Request() req, @Response() res) {
      res.status(HttpStatus.OK).json({token: req.user});
    }

    @UseGuards(JwtAuthGuard)
    @Get('validate-token')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse ({status: 401, description: 'Not authenticated'})
    @ApiResponse({status: 200, description: 'Validated Token', type: TokenDto})
    async validateToken(@Request() req, @Response() res){
      const token = ExtractJwt.fromAuthHeaderAsBearerToken();
      const data : any = jwt.decode(token(req));
      
      const response:any = await this.authService.loginUsername(data.userData.username);
      if (!res) {
          throw new UnauthorizedException();
      }
      
      const newToken =  jwt.sign({
        userData: response
    }, config.get("keys.jwtKey"), {
        expiresIn: config.get("globals.expJWT")
    });
      return res.status(HttpStatus.OK).json({token: newToken});
    }


    // @UseGuards(JwtAuthGuard)
    @Post('register')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse ({status: 401, description: 'Not authenticated'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: authUserDto})
    async register(@Body() req : authRegisterDto) {
      const registerBody: IRegisterBody = req;
      return await this.authService.register(registerBody);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse ({status: 401, description: 'Not authenticated'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: authUserDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : authUpdateDto) {
      const updateBody: IUpdateBody = req;
      return await this.authService.update(id, updateBody);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse ({status: 401, description: 'Not authenticated'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed'})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.authService.delete(id);
    }

}
