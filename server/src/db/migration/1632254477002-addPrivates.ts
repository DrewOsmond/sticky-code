import {MigrationInterface, QueryRunner} from "typeorm";

export class addPrivates1632254477002 implements MigrationInterface {
    name = 'addPrivates1632254477002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."collections" ADD "personal" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."collections" DROP COLUMN "personal"`);
    }

}
