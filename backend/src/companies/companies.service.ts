import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}

  async create(data: Partial<Company>, userId: string) {
    const exists = await this.companyRepo.findOne({ where: { taxNumber: data.taxNumber } });
    if (exists) throw new ConflictException('Bu vergi numarası zaten kayıtlı');
    const company = this.companyRepo.create({ ...data, userId, status: 'pending' });
    return this.companyRepo.save(company);
  }

  async findAll(status?: string) {
    const where = status ? { status } : {};
    return this.companyRepo.find({ where, relations: ['user'], order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const company = await this.companyRepo.findOne({ where: { id }, relations: ['user'] });
    if (!company) throw new NotFoundException('Firma bulunamadı');
    return company;
  }

  async findByUser(userId: string) {
    return this.companyRepo.findOne({ where: { userId } });
  }

  async approve(id: string) {
    await this.companyRepo.update(id, { status: 'approved' });
    return this.findOne(id);
  }

  async reject(id: string, reason: string) {
    await this.companyRepo.update(id, { status: 'rejected', rejectionReason: reason });
    return this.findOne(id);
  }

  async block(id: string) {
    await this.companyRepo.update(id, { status: 'blocked' });
    return this.findOne(id);
  }
}
