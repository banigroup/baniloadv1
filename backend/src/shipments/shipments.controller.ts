import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShipmentsService } from './shipments.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: any, @Request() req: any) {
    return this.shipmentsService.create(body, req.user.companyId);
  }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('fromCity') fromCity?: string,
    @Query('toCity') toCity?: string,
    @Query('vehicleType') vehicleType?: string,
  ) {
    return this.shipmentsService.findAll({ status, fromCity, toCity, vehicleType });
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  findMy(@Request() req: any) {
    return this.shipmentsService.findByCompany(req.user.companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(id);
  }

  @Post(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  approve(@Param('id') id: string, @Request() req: any) {
    return this.shipmentsService.approve(id, req.user.driverId, req.ip);
  }

  @Post(':id/select-driver')
  @UseGuards(AuthGuard('jwt'))
  selectDriver(@Param('id') id: string, @Body() body: { driverId: string }, @Request() req: any) {
    return this.shipmentsService.selectDriver(id, body.driverId, req.user.companyId);
  }

  @Get(':id/approvals')
  @UseGuards(AuthGuard('jwt'))
  getApprovals(@Param('id') id: string) {
    return this.shipmentsService.getApprovals(id);
  }
}
