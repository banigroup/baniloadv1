import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ name: 'company_name' }) companyName: string;
  @Column({ name: 'tax_number', unique: true }) taxNumber: string;
  @Column({ name: 'tax_office' }) taxOffice: string;
  @Column({ nullable: true }) address: string;
  @Column({ nullable: true }) city: string;
  @Column({ nullable: true }) phone: string;
  @Column({ nullable: true, name: 'tax_document_url' }) taxDocumentUrl: string;
  @Column({ type: 'enum', enum: ['pending', 'approved', 'rejected', 'blocked'], default: 'pending' }) status: string;
  @Column({ nullable: true, name: 'rejection_reason' }) rejectionReason: string;
  @Column({ nullable: true, name: 'authorized_person' }) authorizedPerson: string;
  @ManyToOne(() => User) @JoinColumn({ name: 'user_id' }) user: User;
  @Column({ name: 'user_id' }) userId: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
