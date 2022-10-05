import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, UseInterceptors, UploadedFile, BadRequestException, Headers, Query} from '@nestjs/common';

import { OfferService } from './offer.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { offerBody } from './interfaces/offer.interfaces';
import { offerDto, offerCreateDto, offerUpdateDto } from './dto/OfferDto.dto';
import { FirestorageService } from '../firestorage/firestorage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as jwt from 'jsonwebtoken';

@ApiTags('Offer')
@Controller('offer')
export class OfferController {
  
    constructor(private offerService: OfferService, private firestorageService: FirestorageService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: offerDto})
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() req : offerCreateDto, @UploadedFile() file: Express.Multer.File) {
      const createBody: offerBody = req;
      let fileUploaded = await this.uploadFile(file)
      return await this.offerService.create(createBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: offerDto})
    async getAll(@Headers() header, @Query() query: {search: string}) {
      const data : any = jwt.decode(header.authorization.replace('Bearer ', ''));      
      return await this.offerService.getAll(data.userData.career_id, query.search);
    }

    
    //@UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: offerDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.offerService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: offerDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : offerUpdateDto, @UploadedFile() file: Express.Multer.File) {
      const updateBody: offerBody = req;
      let fileUploaded = file ? await this.uploadFile(file) : null
      return await this.offerService.update(id, updateBody, fileUploaded);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: offerDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.offerService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('all/work')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: offerDto})
    async getWorkOffers(@Headers() header, @Query() query: {search: string}) {
      const data : any = jwt.decode(header.authorization.replace('Bearer ', ''));
      return await this.offerService.getWorkOffers(data.userData.career_id, query.search);
    }

    @UseGuards(JwtAuthGuard)
    @Get('all/course')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: offerDto})
    async getCourseOffers(@Headers() header, @Query() query: {search: string}) {
      const data : any = jwt.decode(header.authorization.replace('Bearer ', ''));
      return await this.offerService.getCourseOffers(data.userData.career_id, query.search);
    }

    async uploadFile(file) {
      if(file){
        let tm = Date.now();
        return await this.firestorageService.uploadFile('offers', file, tm);
      }else{
        throw new BadRequestException(['Image file is required'])
      }
    }

}
