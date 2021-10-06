export = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "drewosmond",
  password: "",
  database: "sticky_code",
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
