import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) email: string;
  @Column({ name: 'password_hash' }) passwordHash: string;
  @Column({ name: 'first_name' }) firstName: string;
  @Column({ name: 'last_name' }) lastName: string;
  @Column({ type: 'enum', enum: ['firma', 'kamyoncu', 'admin'], default: 'firma' }) role: string;
  @Column({ type: 'enum', enum: ['pending', 'approved', 'rejected', 'blocked'], default: 'pending' }) status: string;
  @Column({ nullable: true, name: 'phone' }) phone: string;
  @Column({ nullable: true, name: 'avatar_url' }) avatarUrl: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
