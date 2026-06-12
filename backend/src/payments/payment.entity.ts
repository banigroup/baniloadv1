import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Shipment } from '../shipments/shipment.entity';
import { Company } from '../companies/company.entity';
import { Driver } from '../drivers/driver.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => Shipment) @JoinColumn({ name: 'shipment_id' }) shipment: Shipment;
  @Column({ name: 'shipment_id' }) shipmentId: string;
  @ManyToOne(() => Company) @JoinColumn({ name: 'company_id' }) company: Company;
  @Column({ name: 'company_id' }) companyId: string;
  @ManyToOne(() => Driver) @JoinColumn({ name: 'driver_id' }) driver: Driver;
  @Column({ name: 'driver_id' }) driverId: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_amount' }) totalAmount: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'commission_amount' }) commissionAmount: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'driver_amount' }) driverAmount: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'commission_rate' }) commissionRate: number;
  @Column({ type: 'enum', enum: ['pending', 'paid', 'released', 'refunded', 'failed'], default: 'pending' }) status: string;
  @Column({ nullable: true, name: 'payment_method' }) paymentMethod: string;
  @Column({ nullable: true, name: 'transaction_id' }) transactionId: string;
  @Column({ nullable: true, name: 'paid_at', type: 'timestamp' }) paidAt: Date;
  @Column({ nullable: true, name: 'released_at', type: 'timestamp' }) releasedAt: Date;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
