import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
