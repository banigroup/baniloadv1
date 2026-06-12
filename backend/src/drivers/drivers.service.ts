import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver) private driverRepo: Repository<Driver>,
  ) {}

  async create(data: Partial<Driver>, userId: string) {
    const exists = await this.driverRepo.findOne({ where: { userId } });
    if (exists) throw new ConflictException('Bu kullanıcı zaten kayıtlı');
    const driver = this.driverRepo.create({ ...data, userId, status: 'pending' });
    return this.driverRepo.save(driver);
  }

  async findAll(status?: string) {
    const where = status ? { status } : {};
    return this.driverRepo.find({ where, relations: ['user'], order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const driver = await this.driverRepo.findOne({ where: { id }, relations: ['user'] });
    if (!driver) throw new NotFoundException('Kamyoncu bulunamadı');
    return driver;
  }

  async findByUser(userId: string) {
    return this.driverRepo.findOne({ where: { userId } });
  }

  async approve(id: string) {
    await this.driverRepo.update(id, { status: 'approved' });
    return this.findOne(id);
  }

  async reject(id: string, reason: string) {
    await this.driverRepo.update(id, { status: 'rejected', rejectionReason: reason });
    return this.findOne(id);
  }

  async block(id: string) {
    await this.driverRepo.update(id, { status: 'blocked' });
    return this.findOne(id);
  }

  async updateRating(id: string, rating: number) {
    await this.driverRepo.update(id, { rating, totalJobs: () => 'total_jobs + 1' } as any);
    return this.findOne(id);
  }
}
