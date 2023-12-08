import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../common/entities/base.entity';
import {
  GENDER_ARRAY,
  GENDER_ENUM,
} from '../../../common/constants/enums/gender.enum';

@Entity({ name: 'users' })
@Index('user_email_index', ['email'], {
  unique: true,
  where: 'deleted_at IS NULL',
})
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: true })
  name?: string;

  @Column({ name: 'email', nullable: true, length: 500 })
  email?: string;

  @Column({ name: 'phone_number', nullable: true })
  phone_number?: string;

  @Column({ name: 'password_encrypt', nullable: true })
  password?: string;

  @Column({ name: 'gender', nullable: true, type: 'enum', enum: GENDER_ARRAY })
  gender?: GENDER_ENUM;

  @Column({ name: 'address', nullable: true })
  address?: string;
}
