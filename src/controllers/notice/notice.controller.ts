import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';

import { NoticeService } from './notice.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { noticeBody } from './interfaces/notice.interfaces';
import { noticeDto, noticeCreateDto, noticeUpdateDto } from './dto/NoticeDto.dto';

@ApiTags('Notice')
@Controller('notice')
export class NoticeController {
  
    constructor(private noticeService: NoticeService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: noticeDto})
    async create(@Body() req : noticeCreateDto) {
      const createBody: noticeBody = req;
      return await this.noticeService.create(createBody);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all/:active?')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: noticeDto})
    async getAll(@Param('active') active: string) {
      return await this.noticeService.getAll(active);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: noticeDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.noticeService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: noticeDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : noticeUpdateDto) {
      const updateBody: noticeBody = req;
      return await this.noticeService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: noticeDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.noticeService.delete(id);
    }


}
