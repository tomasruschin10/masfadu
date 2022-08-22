import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException, Headers} from '@nestjs/common';

import { TagService } from './tag.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { tagBody } from './interfaces/tag.interfaces';
import { tagDto, tagCreateDto, tagUpdateDto } from './dto/TagDto.dto';
import { FirestorageService } from '../firestorage/firestorage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as jwt from 'jsonwebtoken';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  
    constructor(private tagService: TagService, private firestorageService: FirestorageService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: tagDto})
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() req : tagCreateDto, @UploadedFile() file: Express.Multer.File) {
      const createBody: tagBody = req;
      let fileUploaded = await this.uploadFile(file)
      return await this.tagService.create(createBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: tagDto})
    async getAll(@Headers() header) {
      const data : any = jwt.decode(header.authorization.replace('Bearer ', ''));
      return await this.tagService.getAll();
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: tagDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.tagService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: tagDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : tagUpdateDto, @UploadedFile() file: Express.Multer.File) {
      const updateBody: tagBody = req;
      let fileUploaded = file ? await this.uploadFile(file) : null
      return await this.tagService.update(id, updateBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: tagDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.tagService.delete(id);
    }

    async uploadFile(file) {
      if(file){
        let tm = Date.now();
        return await this.firestorageService.uploadFile('tags', file, tm);
      }else{
        throw new BadRequestException(['Image file is required'])
      }
    }

}
