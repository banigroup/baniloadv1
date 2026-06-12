import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Shipment } from '../shipments/shipment.entity';
import { Driver } from '../drivers/driver.entity';

@Entity('approvals')
export class Approval {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => Shipment) @JoinColumn({ name: 'shipment_id' }) shipment: Shipment;
  @Column({ name: 'shipment_id' }) shipmentId: string;
  @ManyToOne(() => Driver) @JoinColumn({ name: 'driver_id' }) driver: Driver;
  @Column({ name: 'driver_id' }) driverId: string;
  @Column({ type: 'enum', enum: ['pending', 'selected', 'rejected'], default: 'pending' }) status: string;
  @Column({ nullable: true, name: 'company_note', type: 'text' }) companyNote: string;
  @Column({ nullable: true, name: 'ip_address' }) ipAddress: string;
  @Column({ nullable: true, name: 'device_info' }) deviceInfo: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
