import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, Res, UseGuards, Put, Param, ParseIntPipe, Delete, Query, Headers} from '@nestjs/common';

import { ResourceCategoryService } from './resourceCategory.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { resourceCategoryBody } from './interfaces/resourceCategory.interfaces';
import { resourceCategoryDto, resourceCategoryCreateDto } from './dto/ResourceCategoryDto.dto';

@ApiTags('ResourceCategory')
@Controller('resource-category')
export class ResourceCategoryController {
  
    constructor(private resourceCategoryService: ResourceCategoryService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 200, description: 'Correct Registration', type: resourceCategoryDto})
    async create(@Body() req : resourceCategoryCreateDto) {
      const createBody: resourceCategoryBody = req;
      return await this.resourceCategoryService.create(createBody);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get('all/')
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 200, description: 'Correct', type: resourceCategoryDto})
    async getAll(@Query() data: {subject: number,search: string}) {
      return await this.resourceCategoryService.getAll(data);
    }

    
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Correct', type: resourceCategoryDto})
    async getById(@Param('id', ParseIntPipe) id: number) {
      return await this.resourceCategoryService.getById(id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 400, description: 'Incorrect Data'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Updated Registration', type: resourceCategoryDto})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req : resourceCategoryCreateDto) {
      const updateBody: resourceCategoryBody = req;
      return await this.resourceCategoryService.update(id, updateBody);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiParam({name: 'id', required: true, description: 'Record Identifier'})
    @ApiResponse ({status: 500, description: 'Server Error'})
    @ApiResponse({status: 404, description: 'Record not found'})
    @ApiResponse({status: 200, description: 'Record Removed', type: resourceCategoryDto})
    async delete(@Param('id', ParseIntPipe) id: number) {
      return await this.resourceCategoryService.delete(id);
    }


}
