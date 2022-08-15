import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';

import { UserSubjectService } from './userSubject.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { userSubjectBody } from './interfaces/userSubject.interfaces';
import { userSubjectDto, userSubjectCreateDto, userSubjectUpdateDto } from './dto/UserSubjectDto.dto';

@ApiTags('UserSubject')
@Controller('user-subject')
export class UserSubjectController {
  
    constructor(private userSubjectService: UserSubjectService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: userSubjectDto})
    async create(@Body() req : userSubjectCreateDto) {
      const createBody: userSubjectBody = req;
      return await this.userSubjectService.create(createBody);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: userSubjectDto})
    async getAll() {
      return await this.userSubjectService.getAll();
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: userSubjectDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.userSubjectService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: userSubjectDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : userSubjectUpdateDto) {
      const updateBody: userSubjectBody = req;
      return await this.userSubjectService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: userSubjectDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.userSubjectService.delete(id);
    }


}
