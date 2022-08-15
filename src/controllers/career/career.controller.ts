import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException} from '@nestjs/common';

import { CareerService } from './career.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { careerBody } from './interfaces/career.interfaces';
import { careerDto, careerCreateDto, careerUpdateDto } from './dto/CareerDto.dto';
import { FirestorageService } from '../firestorage/firestorage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Career')
@Controller('career')
export class CareerController {
  
    constructor(private careerService: CareerService, private firestorageService: FirestorageService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: careerDto})
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() req : careerCreateDto, @UploadedFile() file: Express.Multer.File) {
      const createBody: careerBody = req;
      let fileUploaded = await this.uploadFile(file)
      return await this.careerService.create(createBody, fileUploaded);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: careerDto})
    async getAll() {
      return await this.careerService.getAll();
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: careerDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.careerService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: careerDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : careerUpdateDto, @UploadedFile() file: Express.Multer.File) {
      const updateBody: careerBody = req;
      let fileUploaded = file ? await this.uploadFile(file) : null
      return await this.careerService.update(id, updateBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: careerDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.careerService.delete(id);
    }

    async uploadFile(file) {
      if(file){
        let tm = Date.now();
        return await this.firestorageService.uploadFile('careers', file, tm);
      }else{
        throw new BadRequestException(['Image file is required'])
      }
    }

}
