import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Shipment } from '../shipments/shipment.entity';
import { Company } from '../companies/company.entity';
import { Driver } from '../drivers/driver.entity';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => Shipment) @JoinColumn({ name: 'shipment_id' }) shipment: Shipment;
  @Column({ name: 'shipment_id' }) shipmentId: string;
  @ManyToOne(() => Company) @JoinColumn({ name: 'company_id' }) company: Company;
  @Column({ name: 'company_id' }) companyId: string;
  @ManyToOne(() => Driver) @JoinColumn({ name: 'driver_id' }) driver: Driver;
  @Column({ name: 'driver_id' }) driverId: string;
  @Column({ name: 'contract_text', type: 'text' }) contractText: string;
  @Column({ nullable: true, name: 'company_signed_at', type: 'timestamp' }) companySignedAt: Date;
  @Column({ nullable: true, name: 'company_ip' }) companyIp: string;
  @Column({ nullable: true, name: 'driver_signed_at', type: 'timestamp' }) driverSignedAt: Date;
  @Column({ nullable: true, name: 'driver_ip' }) driverIp: string;
  @Column({ type: 'enum', enum: ['pending', 'signed', 'cancelled'], default: 'pending' }) status: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
