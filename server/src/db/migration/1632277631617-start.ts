import {MigrationInterface, QueryRunner} from "typeorm";

export class start1632277631617 implements MigrationInterface {
    name = 'start1632277631617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "noteId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "language" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "collectionId" integer, "userId" integer, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("username", "email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collections" ("id" SERIAL NOT NULL, "name" text NOT NULL, "personal" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_favorite_notes_notes" ("usersId" integer NOT NULL, "notesId" integer NOT NULL, CONSTRAINT "PK_45180bb2b776193e88aa6e54be9" PRIMARY KEY ("usersId", "notesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_95c752541ac33dc0d2eadcc9a2" ON "users_favorite_notes_notes" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_508be997409caf9381b956d287" ON "users_favorite_notes_notes" ("notesId") `);
        await queryRunner.query(`CREATE TABLE "users_favorite_collections_collections" ("usersId" integer NOT NULL, "collectionsId" integer NOT NULL, CONSTRAINT "PK_f45ab6d2d120c3b3907c08a5591" PRIMARY KEY ("usersId", "collectionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03620d8013cd93d139103c61be" ON "users_favorite_collections_collections" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_41f653e502b8cebcfcc4cfd498" ON "users_favorite_collections_collections" ("collectionsId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_80933a403a9452ac4dd9b507ad6" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_829532ff766505ad7c71592c6a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_da613d6625365707f8df0f65d81" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorite_notes_notes" ADD CONSTRAINT "FK_95c752541ac33dc0d2eadcc9a21" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorite_notes_notes" ADD CONSTRAINT "FK_508be997409caf9381b956d2871" FOREIGN KEY ("notesId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorite_collections_collections" ADD CONSTRAINT "FK_03620d8013cd93d139103c61bee" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorite_collections_collections" ADD CONSTRAINT "FK_41f653e502b8cebcfcc4cfd498b" FOREIGN KEY ("collectionsId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorite_collections_collections" DROP CONSTRAINT "FK_41f653e502b8cebcfcc4cfd498b"`);
        await queryRunner.query(`ALTER TABLE "users_favorite_collections_collections" DROP CONSTRAINT "FK_03620d8013cd93d139103c61bee"`);
        await queryRunner.query(`ALTER TABLE "users_favorite_notes_notes" DROP CONSTRAINT "FK_508be997409caf9381b956d2871"`);
        await queryRunner.query(`ALTER TABLE "users_favorite_notes_notes" DROP CONSTRAINT "FK_95c752541ac33dc0d2eadcc9a21"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_da613d6625365707f8df0f65d81"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_829532ff766505ad7c71592c6a5"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_fd1b56d90e0f8e5143d2da4d738"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_80933a403a9452ac4dd9b507ad6"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP INDEX "IDX_41f653e502b8cebcfcc4cfd498"`);
        await queryRunner.query(`DROP INDEX "IDX_03620d8013cd93d139103c61be"`);
        await queryRunner.query(`DROP TABLE "users_favorite_collections_collections"`);
        await queryRunner.query(`DROP INDEX "IDX_508be997409caf9381b956d287"`);
        await queryRunner.query(`DROP INDEX "IDX_95c752541ac33dc0d2eadcc9a2"`);
        await queryRunner.query(`DROP TABLE "users_favorite_notes_notes"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
