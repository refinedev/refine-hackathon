import { MigrationInterface, QueryRunner } from 'typeorm';

export class companyJobUserTables1645173561569 implements MigrationInterface {
  name = 'companyJobUserTables1645173561569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "location" character varying, "content" text, "isActive" boolean NOT NULL DEFAULT true, "companyId" integer, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "web" character varying, "linkedin" character varying, "twitter" character varying, "instagram" character varying, "youtube" character varying, "github" character varying, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "roles" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_e66170573cabd565dab1132727d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job" DROP CONSTRAINT "FK_e66170573cabd565dab1132727d"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "job"`);
  }
}
