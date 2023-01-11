import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, Headers} from '@nestjs/common';

import { GeneralNotificationService } from './generalNotification.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { generalNotificationBody } from './interfaces/generalNotification.interfaces';
import { generalNotificationDto, generalNotificationCreateDto } from './dto/GeneralNotificationDto.dto';
import * as jwt from 'jsonwebtoken';

@ApiTags('GeneralNotification')
@Controller('general-notification')
export class GeneralNotificationController {
  
    constructor(private generalNotificationService: GeneralNotificationService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: generalNotificationDto})
    async create(@Body() req : generalNotificationCreateDto) {
      const createBody: generalNotificationBody = req;
      return await this.generalNotificationService.create(createBody);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: generalNotificationDto})
    async getAll() {
      return await this.generalNotificationService.getAll();
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('user')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: generalNotificationDto})
    async getUserNotification(@Headers() header) {
      const data: any = jwt.decode(header.authorization.replace('Bearer ', ''));
      return await this.generalNotificationService.getUserNotification(data.userData.id);
    }

    
    // @UseGuards(JwtAuthGuard)
    // @Get(':id')
    // @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    // @ApiResponse ({status: 500, description: 'Server Error'})
    // @ApiResponse({status: 404, description: 'Record not found'})
    // @ApiResponse({status: 200, description: 'Correct', type: generalNotificationDto})
    // async getById(@Param('id', ParseIntPipe) id: number) {
    //   return await this.generalNotificationService.getById(id);
    // }

    
    // @UseGuards(JwtAuthGuard)
    // @Put('update/:id')
    // @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    // @ApiResponse ({status: 500, description: 'Server Error'})
    // @ApiResponse({status: 400, description: 'Incorrect Data'})
    // @ApiResponse({status: 404, description: 'Record not found'})
    // @ApiResponse({status: 200, description: 'Updated Registration', type: generalNotificationDto})
    // async update(@Param('id', ParseIntPipe) id: number, @Body() req : generalNotificationCreateDto) {
    //   const updateBody: generalNotificationBody = req;
    //   return await this.generalNotificationService.update(id, updateBody);
    // }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: generalNotificationDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.generalNotificationService.delete(id);
    }


}
