module.exports = {
    type: "postgres",
    driver: "postgres",
    host: process.env.DB_HOST || "test",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    emitDecoratorMetadata: true,
    extra: { ssl: "required" },
    entities: ["dist/db/entity/**/*.js"],
    migrations: ["dist/db/migration/**/*.js"],
    subscribers: ["dist/db/subscriber/**/*.js"],
    cli: {
        entitiesDir: "src/db/entity",
        migrationsDir: "src/db/migration",
        subscribersDir: "src/db/subscriber",
    },
};
//# sourceMappingURL=ormconfig.js.map