import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, Headers, Query} from '@nestjs/common';

import { OfferCategoryService } from './offerCategory.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { offerCategoryBody } from './interfaces/offerCategory.interfaces';
import { offerCategoryDto, offerCategoryCreateDto, offerCategoryUpdateDto } from './dto/OfferCategoryDto.dto';
import * as jwt from 'jsonwebtoken';

@ApiTags('OfferCategory')
@Controller('offer-category')
export class OfferCategoryController {
  
    constructor(private offerCategoryService: OfferCategoryService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: offerCategoryDto})
    async create(@Body() req : offerCategoryCreateDto) {
      const createBody: offerCategoryBody = req;
      return await this.offerCategoryService.create(createBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: offerCategoryDto})
    async getAll(@Headers() header, @Query() query: {search: string}) {
      const data : any = jwt.decode(header.authorization.replace('Bearer ', ''));
      return await this.offerCategoryService.getAll(data.userData.userRole[0].role_id, data.userData.career_id, query.search);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: offerCategoryDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.offerCategoryService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: offerCategoryDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : offerCategoryUpdateDto) {
      const updateBody: offerCategoryBody = req;
      return await this.offerCategoryService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: offerCategoryDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.offerCategoryService.delete(id);
    }


}
