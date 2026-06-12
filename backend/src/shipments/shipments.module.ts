import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { Shipment } from './shipment.entity';
import { Approval } from '../approvals/approval.entity';
import { Company } from '../companies/company.entity';
import { Driver } from '../drivers/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Approval, Company, Driver])],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  exports: [ShipmentsService],
})
export class ShipmentsModule {}
