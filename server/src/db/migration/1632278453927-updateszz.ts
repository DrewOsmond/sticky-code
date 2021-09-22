import {MigrationInterface, QueryRunner} from "typeorm";

export class updateszz1632278453927 implements MigrationInterface {
    name = 'updateszz1632278453927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."notes" DROP CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738"`);
        await queryRunner.query(`ALTER TABLE "public"."collections" DROP CONSTRAINT "FK_da613d6625365707f8df0f65d81"`);
        await queryRunner.query(`ALTER TABLE "public"."notes" ADD CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."collections" ADD CONSTRAINT "FK_da613d6625365707f8df0f65d81" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."collections" DROP CONSTRAINT "FK_da613d6625365707f8df0f65d81"`);
        await queryRunner.query(`ALTER TABLE "public"."notes" DROP CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738"`);
        await queryRunner.query(`ALTER TABLE "public"."collections" ADD CONSTRAINT "FK_da613d6625365707f8df0f65d81" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."notes" ADD CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
