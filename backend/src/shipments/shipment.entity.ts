import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../companies/company.entity';
import { Driver } from '../drivers/driver.entity';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'from_city' }) fromCity: string;
  @Column({ name: 'from_address' }) fromAddress: string;
  @Column({ nullable: true, name: 'from_lat', type: 'decimal', precision: 10, scale: 8 }) fromLat: number;
  @Column({ nullable: true, name: 'from_lng', type: 'decimal', precision: 11, scale: 8 }) fromLng: number;
  @Column({ name: 'to_city' }) toCity: string;
  @Column({ name: 'to_address' }) toAddress: string;
  @Column({ nullable: true, name: 'to_lat', type: 'decimal', precision: 10, scale: 8 }) toLat: number;
  @Column({ nullable: true, name: 'to_lng', type: 'decimal', precision: 11, scale: 8 }) toLng: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) tonnage: number;
  @Column({ type: 'enum', enum: ['tenteli', 'dorse', 'sogutmali', 'kasa', 'tanker'] }) vehicleType: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) price: number;
  @Column({ name: 'load_date', type: 'date' }) loadDate: Date;
  @Column({ type: 'enum', enum: ['active', 'matched', 'in_progress', 'completed', 'cancelled'], default: 'active' }) status: string;
  @Column({ nullable: true, name: 'notes', type: 'text' }) notes: string;
  @ManyToOne(() => Company) @JoinColumn({ name: 'company_id' }) company: Company;
  @Column({ name: 'company_id' }) companyId: string;
  @ManyToOne(() => Driver, { nullable: true }) @JoinColumn({ name: 'driver_id' }) driver: Driver;
  @Column({ nullable: true, name: 'driver_id' }) driverId: string;
  @CreateDateColumn({ name:
