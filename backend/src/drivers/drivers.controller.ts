import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: any, @Request() req: any) {
    return this.driversService.create(body, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query('status') status?: string) {
    return this.driversService.findAll(status);
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  findMy(@Request() req: any) {
    return this.driversService.findByUser(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Post(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  approve(@Param('id') id: string) {
    return this.driversService.approve(id);
  }

  @Post(':id/reject')
  @UseGuards(AuthGuard('jwt'))
  reject(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.driversService.reject(id, body.reason);
  }

  @Post(':id/block')
  @UseGuards(AuthGuard('jwt'))
  block(@Param('id') id: string) {
    return this.driversService.block(id);
  }
}
