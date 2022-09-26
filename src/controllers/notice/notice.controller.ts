import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';

import { NoticeService } from './notice.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { noticeBody } from './interfaces/notice.interfaces';
import { noticeDto, noticeCreateDto, noticeUpdateDto } from './dto/NoticeDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirestorageService } from '../firestorage/firestorage.service';

@ApiTags('Notice')
@Controller('notice')
export class NoticeController {
  
    constructor(
      private noticeService: NoticeService,
      private firestorageService: FirestorageService
      ) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: noticeDto})
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() req : noticeCreateDto, @UploadedFile() file: Express.Multer.File,) {
      const createBody: noticeBody = req;
      let fileUploaded = await this.uploadFile(file)
      return await this.noticeService.create(createBody, fileUploaded);
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
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : noticeUpdateDto,@UploadedFile() file: Express.Multer.File) {
      const updateBody: noticeBody = req;
      let fileUploaded
      if (file) fileUploaded = await this.uploadFile(file)
      return await this.noticeService.update(id, updateBody, fileUploaded);
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
    
    async uploadFile(file) {
      if(file){
        let tm = Date.now();
        return await this.firestorageService.uploadFile('users', file, tm);
      }else{
        throw new HttpException('Needed a Image',HttpStatus.NOT_FOUND)
      }
    }


}
