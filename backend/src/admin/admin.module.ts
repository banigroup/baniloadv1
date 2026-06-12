import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../users/user.entity';
import { Company } from '../companies/company.entity';
import { Driver } from '../drivers/driver.entity';
import { Shipment } from '../shipments/shipment.entity';
import { Payment } from '../payments/payment.entity';
import { Complaint } from '../complaints/complaint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Driver, Shipment, Payment, Complaint])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
