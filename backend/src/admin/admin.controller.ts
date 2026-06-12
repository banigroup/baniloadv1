import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'))
  getDashboard() {
    return this.adminService.getDashboard();
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get('complaints')
  @UseGuards(AuthGuard('jwt'))
  getComplaints(@Query('status') status?: string) {
    return this.adminService.getComplaints(status);
  }

  @Post('complaints/:id/resolve')
  @UseGuards(AuthGuard('jwt'))
  resolveComplaint(@Param('id') id: string, @Body() body: { adminNote: string }) {
    return this.adminService.resolveComplaint(id, body.adminNote);
  }

  @Get('payments')
  @UseGuards(AuthGuard('jwt'))
  getPayments() {
    return this.adminService.getPayments();
  }
}
