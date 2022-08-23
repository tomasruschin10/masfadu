import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException, Headers} from '@nestjs/common';

import { BalanceService } from './balance.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { balanceBody } from './interfaces/balance.interfaces';
import { balanceDto, balanceCreateDto, balanceUpdateDto } from './dto/BalanceDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Balance')
@Controller('balance')
export class BalanceController {
  
    constructor(private balanceService: BalanceService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: balanceDto})
    async create(@Body() req : balanceCreateDto) {
      const createBody: balanceBody = req;
      return await this.balanceService.create(createBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('all/:id?')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: balanceDto})
    async getAll(@Param('id') id: number) {
      return await this.balanceService.getAll(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: balanceDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.balanceService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: balanceDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : balanceUpdateDto) {
      const updateBody: balanceBody = req;
      return await this.balanceService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: balanceDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.balanceService.delete(id);
    }

}
