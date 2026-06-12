import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Company } from './companies/company.entity';
import { Driver } from './drivers/driver.entity';
import { Shipment } from './shipments/shipment.entity';
import { Approval } from './approvals/approval.entity';
import { Payment } from './payments/payment.entity';
import { Complaint } from './complaints/complaint.entity';
import { Contract } from './contracts/contract.entity';
import { Rating } from './ratings/rating.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: 'postgres',
        url: c.get('DATABASE_URL'),
        entities: [User, Company, Driver, Shipment, Approval, Payment, Complaint, Contract, Rating],
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
