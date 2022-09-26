import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, Headers} from '@nestjs/common';

import { SubjectService } from './subject.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { subjectBody, subjectUpdateBody } from './interfaces/subject.interfaces';
import { subjectDto, subjectCreateDto, subjectUpdateDto } from './dto/SubjectDto.dto';
import * as jwt from 'jsonwebtoken';

@ApiTags('Subject')
@Controller('subject')
export class SubjectController {
  
    constructor(private subjectService: SubjectService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: subjectDto})
    async create(@Body() req : subjectCreateDto) {
      const createBody: subjectBody = req;
      return await this.subjectService.create(createBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: subjectDto})
    async getAll(@Headers() header) {
      const data : any = jwt.decode(header.authorization.replace('Bearer ', ''));
      return await this.subjectService.getAll(data.userData.career_id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: subjectDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.subjectService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: subjectDto})
    async update(@Body() req : subjectUpdateDto) {
      const updateBody: subjectUpdateBody = req;
      return await this.subjectService.update(updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: subjectDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.subjectService.delete(id);
    }


}
