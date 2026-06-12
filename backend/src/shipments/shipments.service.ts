import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipment.entity';
import { Approval } from '../approvals/approval.entity';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment) private shipmentRepo: Repository<Shipment>,
    @InjectRepository(Approval) private approvalRepo: Repository<Approval>,
  ) {}

  async create(data: Partial<Shipment>, companyId: string) {
    const shipment = this.shipmentRepo.create({ ...data, companyId, status: 'active' });
    return this.shipmentRepo.save(shipment);
  }

  async findAll(filters?: { status?: string; fromCity?: string; toCity?: string; vehicleType?: string }) {
    const query = this.shipmentRepo.createQueryBuilder('s')
      .leftJoinAndSelect('s.company', 'company')
      .leftJoinAndSelect('s.driver', 'driver');
    if (filters?.status) query.andWhere('s.status = :status', { status: filters.status });
    if (filters?.fromCity) query.andWhere('s.fromCity ILIKE :fromCity', { fromCity: `%${filters.fromCity}%` });
    if (filters?.toCity) query.andWhere('s.toCity ILIKE :toCity', { toCity: `%${filters.toCity}%` });
    if (filters?.vehicleType) query.andWhere('s.vehicleType = :vehicleType', { vehicleType: filters.vehicleType });
    return query.orderBy('s.createdAt', 'DESC').getMany();
  }

  async findOne(id: string) {
    const shipment = await this.shipmentRepo.findOne({ where: { id }, relations: ['company', 'driver'] });
    if (!shipment) throw new NotFoundException('İlan bulunamadı');
    return shipment;
  }

  async findByCompany(companyId: string) {
    return this.shipmentRepo.find({ where: { companyId }, relations: ['driver'], order: { createdAt: 'DESC' } });
  }

  async approve(shipmentId: string, driverId: string, ipAddress?: string) {
    const shipment = await this.findOne(shipmentId);
    if (shipment.status !== 'active') throw new ForbiddenException('Bu ilana onay verilemez');
    const existing = await this.approvalRepo.findOne({ where: { shipmentId, driverId } });
    if (existing) throw new ForbiddenException('Zaten onay verdiniz');
    const approval = this.approvalRepo.create({ shipmentId, driverId, status: 'pending', ipAddress });
    return this.approvalRepo.save(approval);
  }

  async selectDriver(shipmentId: string, driverId: string, companyId: string) {
    const shipment = await this.findOne(shipmentId);
    if (shipment.companyId !== companyId) throw new ForbiddenException('Yetkisiz işlem');
    await this.approvalRepo.update({ shipmentId, driverId }, { status: 'selected' });
    await this.approvalRepo.update({ shipmentId }, { status: 'rejected' });
    await this.approvalRepo.update({ shipmentId, driverId }, { status: 'selected' });
    shipment.driverId = driverId;
    shipment.status = 'matched';
    return this.shipmentRepo.save(shipment);
  }

  async getApprovals(shipmentId: string) {
    return this.approvalRepo.find({ where: { shipmentId }, relations: ['driver', 'driver.user'] });
  }
}
