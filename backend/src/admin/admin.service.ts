import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Company } from '../companies/company.entity';
import { Driver } from '../drivers/driver.entity';
import { Shipment } from '../shipments/shipment.entity';
import { Payment } from '../payments/payment.entity';
import { Complaint } from '../complaints/complaint.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(Driver) private driverRepo: Repository<Driver>,
    @InjectRepository(Shipment) private shipmentRepo: Repository<Shipment>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Complaint) private complaintRepo: Repository<Complaint>,
  ) {}

  async getDashboard() {
    const [totalUsers, totalCompanies, totalDrivers, totalShipments, totalComplaints] = await Promise.all([
      this.userRepo.count(),
      this.companyRepo.count(),
      this.driverRepo.count(),
      this.shipmentRepo.count(),
      this.complaintRepo.count(),
    ]);

    const pendingCompanies = await this.companyRepo.count({ where: { status: 'pending' } });
    const pendingDrivers = await this.driverRepo.count({ where: { status: 'pending' } });
    const activeShipments = await this.shipmentRepo.count({ where: { status: 'active' } });
    const completedShipments = await this.shipmentRepo.count({ where: { status: 'completed' } });

    return {
      totalUsers,
      totalCompanies,
      totalDrivers,
      totalShipments,
      totalComplaints,
      pendingCompanies,
      pendingDrivers,
      activeShipments,
      completedShipments,
      timestamp: new Date().toISOString(),
    };
  }

  async getUsers() {
    return this.userRepo.find({ order: { createdAt: 'DESC' } });
  }

  async getComplaints(status?: string) {
    const where = status ? { status } : {};
    return this.complaintRepo.find({ where, relations: ['user', 'shipment'], order: { createdAt: 'DESC' } });
  }

  async resolveComplaint(id: string, adminNote: string) {
    await this.complaintRepo.update(id, { status: 'resolved', adminNote });
    return this.complaintRepo.findOne({ where: { id } });
  }

  async getPayments() {
    return this.paymentRepo.find({ relations: ['shipment', 'company', 'driver'], order: { createdAt: 'DESC' } });
  }
}
