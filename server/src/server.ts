import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/routes";
import { createConnection } from "typeorm";
import { User } from "./db/entity/User";
import { Note } from "./db/entity/Note";
import { Comment } from "./db/entity/Comment";
import { Collection } from "./db/entity/Collection";
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

const startConnection = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Note, Comment, Collection],
    synchronize: false,
  });

  const port: number = Number(process.env.PORT) || 5000;
  const app = express();

  app.listen(port, () => console.log(`listening on port: ${port}`));
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use("/api", routes);
};

// import { seed } from "./seeder";

startConnection()
  .then(() => console.log("connection to DB started"))
  // .then(() => seed())
  .catch(console.error);
