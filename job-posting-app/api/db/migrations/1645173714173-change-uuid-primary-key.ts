import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeUuidPrimaryKey1645173714173 implements MigrationInterface {
  name = 'changeUuidPrimaryKey1645173714173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job" DROP CONSTRAINT "FK_e66170573cabd565dab1132727d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" DROP CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."job" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "public"."job" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" ADD CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" DROP COLUMN "companyId"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."job" ADD "companyId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "public"."company" DROP CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."company" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "public"."company" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company" ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" ADD CONSTRAINT "FK_e66170573cabd565dab1132727d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job" DROP CONSTRAINT "FK_e66170573cabd565dab1132727d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company" DROP CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."company" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "public"."company" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."company" ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" DROP COLUMN "companyId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" ADD "companyId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" DROP CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."job" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "public"."job" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" ADD CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job" ADD CONSTRAINT "FK_e66170573cabd565dab1132727d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
