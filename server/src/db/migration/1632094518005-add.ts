import {MigrationInterface, QueryRunner} from "typeorm";

export class add1632094518005 implements MigrationInterface {
    name = 'add1632094518005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "noteId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("username", "email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "language" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, "userId" integer, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_favorites_notes" ("usersId" integer NOT NULL, "notesId" integer NOT NULL, CONSTRAINT "PK_6aed6a66f8715f0174a73cdbb83" PRIMARY KEY ("usersId", "notesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2000e566490b6aecd93468ac6" ON "users_favorites_notes" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_682adb5443fd4bb127d94f4e14" ON "users_favorites_notes" ("notesId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_80933a403a9452ac4dd9b507ad6" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_337c70c841b6064e5797e974c32" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_829532ff766505ad7c71592c6a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorites_notes" ADD CONSTRAINT "FK_e2000e566490b6aecd93468ac69" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_notes" ADD CONSTRAINT "FK_682adb5443fd4bb127d94f4e14b" FOREIGN KEY ("notesId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_notes" DROP CONSTRAINT "FK_682adb5443fd4bb127d94f4e14b"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_notes" DROP CONSTRAINT "FK_e2000e566490b6aecd93468ac69"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_829532ff766505ad7c71592c6a5"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_337c70c841b6064e5797e974c32"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_80933a403a9452ac4dd9b507ad6"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP INDEX "IDX_682adb5443fd4bb127d94f4e14"`);
        await queryRunner.query(`DROP INDEX "IDX_e2000e566490b6aecd93468ac6"`);
        await queryRunner.query(`DROP TABLE "users_favorites_notes"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
