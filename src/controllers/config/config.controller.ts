import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';

import { ConfigService } from './config.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { configBody } from './interfaces/config.interfaces';
import { configDto, configCreateDto } from './dto/ConfigDto.dto';

@ApiTags('Config')
@Controller('config')
export class ConfigController {
  
    constructor(private configService: ConfigService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: configDto})
    async create(@Body() req : configCreateDto) {
      const createBody: configBody = req;
      return await this.configService.create(createBody);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: configDto})
    async getAll() {
      return await this.configService.getAll();
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: configDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.configService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: configDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : configCreateDto) {
      const updateBody: configBody = req;
      return await this.configService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: configDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.configService.delete(id);
    }


}
