import { MigrationInterface, QueryRunner } from 'typeorm';

export class addJobTable1633083867240 implements MigrationInterface {
  name = 'addJobTable1633083867240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`job-posting\`.\`job\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`location\` varchar(255) NULL, \`content\` longtext NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`companyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`job-posting\`.\`job\` ADD CONSTRAINT \`FK_e66170573cabd565dab1132727d\` FOREIGN KEY (\`companyId\`) REFERENCES \`job-posting\`.\`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`job-posting\`.\`job\` DROP FOREIGN KEY \`FK_e66170573cabd565dab1132727d\``,
    );
    await queryRunner.query(`DROP TABLE \`job-posting\`.\`job\``);
  }
}
