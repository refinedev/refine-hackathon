import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCompanyTable1633081438794 implements MigrationInterface {
  name = 'addCompanyTable1633081438794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`job-posting\`.\`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`web\` varchar(255) NULL, \`linkedin\` varchar(255) NULL, \`twitter\` varchar(255) NULL, \`instagram\` varchar(255) NULL, \`youtube\` varchar(255) NULL, \`github\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`job-posting\`.\`company\``);
  }
}
