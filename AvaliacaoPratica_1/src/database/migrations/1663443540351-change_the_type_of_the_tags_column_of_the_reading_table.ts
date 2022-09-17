import { MigrationInterface, QueryRunner } from "typeorm";

export class changeTheTypeOfTheTagsColumnOfTheReadingTable1663443540351 implements MigrationInterface {
    name = 'changeTheTypeOfTheTagsColumnOfTheReadingTable1663443540351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leitura" ADD "tags" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leitura" DROP COLUMN "tags"`);
    }

}
