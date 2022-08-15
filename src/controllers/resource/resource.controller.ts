import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException} from '@nestjs/common';

import { ResourceService } from './resource.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { resourceBody } from './interfaces/resource.interfaces';
import { resourceDto, resourceCreateDto, resourceUpdateDto } from './dto/ResourceDto.dto';
import { FirestorageService } from '../firestorage/firestorage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Resource')
@Controller('resource')
export class ResourceController {
  
    constructor(private resourceService: ResourceService, private firestorageService: FirestorageService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: resourceDto})
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() req : resourceCreateDto, @UploadedFile() file: Express.Multer.File) {
      const createBody: resourceBody = req;
      let fileUploaded = await this.uploadFile(file)
      return await this.resourceService.create(createBody, fileUploaded);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: resourceDto})
    async getAll() {
      return await this.resourceService.getAll();
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: resourceDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.resourceService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: resourceDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : resourceUpdateDto, @UploadedFile() file: Express.Multer.File) {
      const updateBody: resourceBody = req;
      let fileUploaded = file ? await this.uploadFile(file) : null
      return await this.resourceService.update(id, updateBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: resourceDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.resourceService.delete(id);
    }

    async uploadFile(file) {
      if(file){
        let tm = Date.now();
        return await this.firestorageService.uploadFile('resources', file, tm);
      }else{
        throw new BadRequestException(['File is required'])
      }
    }

}
