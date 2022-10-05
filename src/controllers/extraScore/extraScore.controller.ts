import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';

import { ExtraScoreService } from './extraScore.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { extraScoreBody } from './interfaces/extraScore.interfaces';
import { extraScoreDto, extraScoreCreateDto } from './dto/ExtraScoreDto.dto';

@ApiTags('ExtraScore')
@Controller('extra-score')
export class ExtraScoreController {
  
    constructor(private extraScoreService: ExtraScoreService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: extraScoreDto})
    async create(@Body() req : extraScoreCreateDto) {
      const createBody: extraScoreBody = req;
      return await this.extraScoreService.create(createBody);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: extraScoreDto})
    async getAll() {
      return await this.extraScoreService.getAll();
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: extraScoreDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.extraScoreService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: extraScoreDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : extraScoreCreateDto) {
      const updateBody: extraScoreBody = req;
      return await this.extraScoreService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: extraScoreDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.extraScoreService.delete(id);
    }


}
