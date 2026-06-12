import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: any, @Request() req: any) {
    return this.companiesService.create(body, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query('status') status?: string) {
    return this.companiesService.findAll(status);
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  findMy(@Request() req: any) {
    return this.companiesService.findByUser(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Post(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  approve(@Param('id') id: string) {
    return this.companiesService.approve(id);
  }

  @Post(':id/reject')
  @UseGuards(AuthGuard('jwt'))
  reject(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.companiesService.reject(id, body.reason);
  }

  @Post(':id/block')
  @UseGuards(AuthGuard('jwt'))
  block(@Param('id') id: string) {
    return this.companiesService.block(id);
  }
}
