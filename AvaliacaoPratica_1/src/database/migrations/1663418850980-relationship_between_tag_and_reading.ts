import { MigrationInterface, QueryRunner } from "typeorm";

export class relationshipBetweenTagAndReading1663418850980 implements MigrationInterface {
    name = 'relationshipBetweenTagAndReading1663418850980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leitura_tag_tag" ("leituraId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_04330f56cdc304ec45b58dcacd9" PRIMARY KEY ("leituraId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dab45090cb60b3578834424e05" ON "leitura_tag_tag" ("leituraId") `);
        await queryRunner.query(`CREATE INDEX "IDX_356804679eb79e6d08a8df778f" ON "leitura_tag_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "leitura" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "leitura_tag_tag" ADD CONSTRAINT "FK_dab45090cb60b3578834424e05c" FOREIGN KEY ("leituraId") REFERENCES "leitura"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "leitura_tag_tag" ADD CONSTRAINT "FK_356804679eb79e6d08a8df778fa" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leitura_tag_tag" DROP CONSTRAINT "FK_356804679eb79e6d08a8df778fa"`);
        await queryRunner.query(`ALTER TABLE "leitura_tag_tag" DROP CONSTRAINT "FK_dab45090cb60b3578834424e05c"`);
        await queryRunner.query(`ALTER TABLE "leitura" ADD "tags" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_356804679eb79e6d08a8df778f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dab45090cb60b3578834424e05"`);
        await queryRunner.query(`DROP TABLE "leitura_tag_tag"`);
    }

}
