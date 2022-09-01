import { MigrationInterface, QueryRunner } from "typeorm";

export class changeDefaultOfContaAtivaColumn1662053869826 implements MigrationInterface {
    name = 'changeDefaultOfContaAtivaColumn1662053869826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "conta_ativa" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "conta_ativa" SET DEFAULT false`);
    }

}
