import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException, Headers, Query } from '@nestjs/common';

import { OpinionService } from './opinion.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { opinionBody } from './interfaces/opinion.interfaces';
import { opinionDto, opinionCreateDto, opinionUpdateDto } from './dto/OpinionDto.dto';
import * as jwt from 'jsonwebtoken';

@ApiTags('Opinion')
@Controller('opinion')
export class OpinionController {

  constructor(private opinionService: OpinionService) { }


  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 400, description: 'Incorrect Data' })
  @ApiResponse({ status: 200, description: 'Correct Registration', type: opinionDto })
  async create(@Body() req: opinionCreateDto, @Headers() header) {
    const data: any = jwt.decode(header.authorization.replace('Bearer ', ''));
    const createBody: opinionBody = req;
    return await this.opinionService.create(createBody, data.userData.id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('all/')
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 200, description: 'Correct', type: opinionDto })
  async getAll(@Query() query: {
     tags: any, student_id: number, subject_id: number,
     limit: number, offset: number, search: string
    }) {    
    return await this.opinionService.getAll(query);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Correct', type: opinionDto })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.opinionService.getById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 400, description: 'Incorrect Data' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Updated Registration', type: opinionDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() req: opinionUpdateDto) {
    const updateBody: opinionBody = req;
    return await this.opinionService.update(id, updateBody);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Record Removed', type: opinionDto })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.opinionService.delete(id);
  }

}
