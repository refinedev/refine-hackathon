import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPasswordField1645175209570 implements MigrationInterface {
  name = 'addPasswordField1645175209570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "password"`,
    );
  }
}
