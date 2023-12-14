import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1702454710209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "first_name" character varying,
        "last_name"  character varying,
        "role"       character varying NOT NULL DEFAULT 'user',
        "username"   character varying,
        "email"      character varying,
        "password"   character varying,
        "phone"      character varying,
        "avatar"     character varying,
        "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_8c82d7f526340ab734260ea46be" UNIQUE ("email"),
        CONSTRAINT "PK_03be52ce04894e6a-bcd48acd85" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
