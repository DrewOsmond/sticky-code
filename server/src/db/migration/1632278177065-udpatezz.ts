import {MigrationInterface, QueryRunner} from "typeorm";

export class udpatezz1632278177065 implements MigrationInterface {
    name = 'udpatezz1632278177065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."notes" DROP CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738"`);
        await queryRunner.query(`ALTER TABLE "public"."notes" ADD CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."notes" DROP CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738"`);
        await queryRunner.query(`ALTER TABLE "public"."notes" ADD CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
