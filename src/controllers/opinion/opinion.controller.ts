import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException, Headers} from '@nestjs/common';

import { OpinionService } from './opinion.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { opinionBody } from './interfaces/opinion.interfaces';
import { opinionDto, opinionCreateDto, opinionUpdateDto } from './dto/OpinionDto.dto';
import { FirestorageService } from '../firestorage/firestorage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as jwt from 'jsonwebtoken';

@ApiTags('Opinion')
@Controller('opinion')
export class OpinionController {
  
    constructor(private opinionService: OpinionService, private firestorageService: FirestorageService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: opinionDto})
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() req : opinionCreateDto, @UploadedFile() file: Express.Multer.File) {
      const createBody: opinionBody = req;
      let fileUploaded = await this.uploadFile(file)
      return await this.opinionService.create(createBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: opinionDto})
    async getAll(@Headers() header) {
      const data : any = jwt.decode(header.authorization.replace('Bearer ', ''));
      return await this.opinionService.getAll();
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: opinionDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.opinionService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: opinionDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : opinionUpdateDto, @UploadedFile() file: Express.Multer.File) {
      const updateBody: opinionBody = req;
      let fileUploaded = file ? await this.uploadFile(file) : null
      return await this.opinionService.update(id, updateBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: opinionDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.opinionService.delete(id);
    }
    
    async uploadFile(file) {
      if(file){
        let tm = Date.now();
        return await this.firestorageService.uploadFile('opinions', file, tm);
      }else{
        throw new BadRequestException(['Image file is required'])
      }
    }

}
