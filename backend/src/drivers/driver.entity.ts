import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'tc_number', unique: true }) tcNumber: string;
  @Column({ name: 'plate_number', unique: true }) plateNumber: string;
  @Column({ name: 'vehicle_brand' }) vehicleBrand: string;
  @Column({ name: 'vehicle_model' }) vehicleModel: string;
  @Column({ name: 'vehicle_year' }) vehicleYear: number;
  @Column({ type: 'enum', enum: ['tenteli', 'dorse', 'sogutmali', 'kasa', 'tanker'], default: 'tenteli' }) vehicleType: string;
  @Column({ nullable: true, name: 'k_document_url' }) kDocumentUrl: string;
  @Column({ nullable: true, name: 'license_url' }) licenseUrl: string;
  @Column({ nullable: true, name: 'registration_url' }) registrationUrl: string;
  @Column({ type: 'enum', enum: ['pending', 'approved', 'rejected', 'blocked'], default: 'pending' }) status: string;
  @Column({ nullable: true, name: 'rejection_reason' }) rejectionReason: string;
  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0, name: 'rating' }) rating: number;
  @Column({ default: 0, name: 'total_jobs' }) totalJobs: number;
  @ManyToOne(() => User) @JoinColumn({ name: 'user_id' }) user: User;
  @Column({ name: 'user_id' }) userId: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
