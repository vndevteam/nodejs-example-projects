import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base extends BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP()',
    type: 'timestamptz',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
    type: 'timestamptz',
  })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deleted_at?: Date;

  @Column({ name: 'created_by', nullable: true })
  created_by?: string;

  @Column({ name: 'updated_by', nullable: true })
  updated_by?: string;

  setCreatedUser(userId: string) {
    this.created_by = userId;
    this.updated_by = userId;
  }

  setUpdatedUser(userId: string) {
    this.updated_by = userId;
    this.updated_at = new Date();
  }
}
