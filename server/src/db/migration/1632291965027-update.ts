import {MigrationInterface, QueryRunner} from "typeorm";

export class update1632291965027 implements MigrationInterface {
    name = 'update1632291965027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collections_added_notes_notes" ("collectionsId" integer NOT NULL, "notesId" integer NOT NULL, CONSTRAINT "PK_42135444931f4b9c78eba7983f0" PRIMARY KEY ("collectionsId", "notesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98aa22527bb29eabce63f299c1" ON "collections_added_notes_notes" ("collectionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_20d3c668e091ec63ca51e8a896" ON "collections_added_notes_notes" ("notesId") `);
        await queryRunner.query(`ALTER TABLE "collections_added_notes_notes" ADD CONSTRAINT "FK_98aa22527bb29eabce63f299c18" FOREIGN KEY ("collectionsId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "collections_added_notes_notes" ADD CONSTRAINT "FK_20d3c668e091ec63ca51e8a8964" FOREIGN KEY ("notesId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collections_added_notes_notes" DROP CONSTRAINT "FK_20d3c668e091ec63ca51e8a8964"`);
        await queryRunner.query(`ALTER TABLE "collections_added_notes_notes" DROP CONSTRAINT "FK_98aa22527bb29eabce63f299c18"`);
        await queryRunner.query(`DROP INDEX "IDX_20d3c668e091ec63ca51e8a896"`);
        await queryRunner.query(`DROP INDEX "IDX_98aa22527bb29eabce63f299c1"`);
        await queryRunner.query(`DROP TABLE "collections_added_notes_notes"`);
    }

}
