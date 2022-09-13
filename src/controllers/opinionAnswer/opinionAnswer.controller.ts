import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, Query } from '@nestjs/common';

import { OpinionAnswerService } from './opinionAnswer.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { opinionAnswerBody } from './interfaces/opinionAnswer.interfaces';
import { opinionAnswerDto, opinionAnswerCreateDto, opinionAnswerUpdateDto } from './dto/OpinionAnswerDto.dto';
import * as jwt from 'jsonwebtoken';

@ApiTags('OpinionAnswer')
@Controller('opinion-answer')
export class OpinionAnswerController {

  constructor(private opinionAnswerService: OpinionAnswerService) { }


  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 400, description: 'Incorrect Data' })
  @ApiResponse({ status: 200, description: 'Correct Registration', type: opinionAnswerDto })
  async create(@Body() req: opinionAnswerCreateDto, @Headers() header) {
    const data: any = jwt.decode(header.authorization.replace('Bearer ', ''));
    const createBody: opinionAnswerBody = req;
    return await this.opinionAnswerService.create(createBody, data.userData.id, header);
  }


  // @UseGuards(JwtAuthGuard)
  @Get('all/')
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 200, description: 'Correct', type: opinionAnswerDto })
  async getAll(@Query('opinion_id') opinion_id: number, @Query('student_id') student_id: number) {
    let data = { opinion_id: opinion_id, student_id: student_id }
    return await this.opinionAnswerService.getAll(data);
  }


  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Correct', type: opinionAnswerDto })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.opinionAnswerService.getById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 400, description: 'Incorrect Data' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Updated Registration', type: opinionAnswerDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() req: opinionAnswerUpdateDto) {
    const updateBody: opinionAnswerBody = req;
    return await this.opinionAnswerService.update(id, updateBody);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Record Removed', type: opinionAnswerDto })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.opinionAnswerService.delete(id);
  }


}
