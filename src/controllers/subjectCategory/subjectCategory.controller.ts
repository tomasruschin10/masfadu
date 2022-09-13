import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, Headers } from '@nestjs/common';

import { SubjectCategoryService } from './subjectCategory.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { subjectCategoryBody } from './interfaces/subjectCategory.interfaces';
import { subjectCategoryDto, subjectCategoryCreateDto, subjectCategoryUpdateDto } from './dto/SubjectCategoryDto.dto';
import * as jwt from 'jsonwebtoken';

@ApiTags('SubjectCategory')
@Controller('subject-category')
export class SubjectCategoryController {

  constructor(private subjectCategoryService: SubjectCategoryService) { }


  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 400, description: 'Incorrect Data' })
  @ApiResponse({ status: 200, description: 'Correct Registration', type: subjectCategoryDto })
  async create(@Body() req: subjectCategoryCreateDto) {
    const createBody: subjectCategoryBody = req;
    return await this.subjectCategoryService.create(createBody);
  }


  @UseGuards(JwtAuthGuard)
  @Get('all/:id?')
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 200, description: 'Correct', type: subjectCategoryDto })
  async getAll(@Param('id') id: number, @Headers() header) {
    const data: any = jwt.decode(header.authorization.replace('Bearer ', ''));
    return await this.subjectCategoryService.getAll(data, id);
  }


  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Correct', type: subjectCategoryDto })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectCategoryService.getById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 400, description: 'Incorrect Data' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Updated Registration', type: subjectCategoryDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() req: subjectCategoryUpdateDto) {
    const updateBody: subjectCategoryBody = req;
    return await this.subjectCategoryService.update(id, updateBody);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'Record Identifier' })
  @ApiResponse({ status: 500, description: 'Server Error' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 200, description: 'Record Removed', type: subjectCategoryDto })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectCategoryService.delete(id);
  }


}