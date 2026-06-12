import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Shipment } from '../shipments/shipment.entity';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => User) @JoinColumn({ name: 'rater_id' }) rater: User;
  @Column({ name: 'rater_id' }) raterId: string;
  @ManyToOne(() => User) @JoinColumn({ name: 'rated_id' }) rated: User;
  @Column({ name: 'rated_id' }) ratedId: string;
  @ManyToOne(() => Shipment) @JoinColumn({ name: 'shipment_id' }) shipment: Shipment;
  @Column({ name: 'shipment_id' }) shipmentId: string;
  @Column({ type: 'int' }) score: number;
  @Column({ nullable: true, type: 'text' }) comment: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
