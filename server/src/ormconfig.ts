import * as PostgressConnectionStringParser from "pg-connection-string";

interface connectionOptions {
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

const databaseUrl: string = process.env.DATABASE_URL || "localhost";
const connectionOptions: PostgressConnectionStringParser.ConnectionOptions =
  PostgressConnectionStringParser.parse(databaseUrl);

module.exports = {
  type: "postgres",

  name: connectionOptions.user,
  host: connectionOptions.host,
  port: connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  synchronize: false,
  logging: false,
  emitDecoratorMetadata: true,
  //extra: { ssl: { rejectUnauthorized: false } },
  entities: ["dist/db/entity/**/*.js"],
  migrations: ["dist/db/migration/**/*.js"],
  subscribers: ["dist/db/subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/db/entity",
    migrationsDir: "src/db/migration",
    subscribersDir: "src/db/subscriber",
  },
};
