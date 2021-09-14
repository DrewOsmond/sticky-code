import {MigrationInterface, QueryRunner} from "typeorm";

export class values1631656206050 implements MigrationInterface {
    name = 'values1631656206050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "languages" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_9c0e155475f0aa782e4a6178969" UNIQUE ("name"), CONSTRAINT "UQ_9c0e155475f0aa782e4a6178969" UNIQUE ("name"), CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "languageIdId" integer, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("username", "email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryIdId" integer, "userIdId" integer, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" integer, "noteIdId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_b4764a8ef27f647d3a014a2b39b" FOREIGN KEY ("languageIdId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_b7d641003c97bc6c2244dcb63eb" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_6a23993868ae46f9b0fb5ecb23e" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_eceec63aabe184730569db684e7" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_84547cecd9c2ffaaead0255ac05" FOREIGN KEY ("noteIdId") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_84547cecd9c2ffaaead0255ac05"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_eceec63aabe184730569db684e7"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_6a23993868ae46f9b0fb5ecb23e"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_b7d641003c97bc6c2244dcb63eb"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_b4764a8ef27f647d3a014a2b39b"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "languages"`);
    }

}
