export = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  emitDecoratorMetadata: true,
  entities: ["dist/db/entity/**/*.js"],
  migrations: ["dist/db/migration/**/*.js"],
  subscribers: ["dist/db/subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/db/entity",
    migrationsDir: "src/db/migration",
    subscribersDir: "src/db/subscriber",
  },
};
