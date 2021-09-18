import {MigrationInterface, QueryRunner} from "typeorm";

export class name2ls1631920229968 implements MigrationInterface {
    name = 'name2ls1631920229968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`);
    }

}
