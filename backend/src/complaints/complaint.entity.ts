import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Shipment } from '../shipments/shipment.entity';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => User) @JoinColumn({ name: 'user_id' }) user: User;
  @Column({ name: 'user_id' }) userId: string;
  @ManyToOne(() => Shipment, { nullable: true }) @JoinColumn({ name: 'shipment_id' }) shipment: Shipment;
  @Column({ nullable: true, name: 'shipment_id' }) shipmentId: string;
  @Column({ type: 'enum', enum: ['damage', 'late', 'fraud', 'other'], default: 'other' }) type: string;
  @Column({ type: 'text' }) description: string;
  @Column({ type: 'enum', enum: ['open', 'in_review', 'resolved', 'closed'], default: 'open' }) status: string;
  @Column({ nullable: true, name: 'admin_note', type: 'text' }) adminNote: string;
  @Column({ nullable: true, name: 'evidence_url' }) evidenceUrl: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
