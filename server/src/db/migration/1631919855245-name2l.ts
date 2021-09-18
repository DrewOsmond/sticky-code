import {MigrationInterface, QueryRunner} from "typeorm";

export class name2l1631919855245 implements MigrationInterface {
    name = 'name2l1631919855245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."notes" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "public"."notes" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."notes" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."notes" ADD "category_id" integer NOT NULL`);
    }

}
