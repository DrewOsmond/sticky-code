import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/routes";
import { createConnection } from "typeorm";
// import { User } from "./db/entity/User";
// import { Note } from "./db/entity/Note";
// import { Comment } from "./db/entity/Comment";
// import { Collection } from "./db/entity/Collection";
import "reflect-metadata";
import path from "path";
import * as dotenv from "dotenv";
import csurf from "csurf";
const connectionOptions = require("./ormconfig");
const router = express.Router();
dotenv.config();
const inProduction = process.env.NODE_ENV === "production";

const startConnection = async () => {
  await createConnection(
    connectionOptions
    // type: "postgres",
    // host: process.env.DB_HOST,
    // port: 5432,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    // entities: [User, Note, Comment, Collection],
    // synchronize: false,
    // // extra: { ssl: true },
  );

  const port = process.env.PORT || 80;
  const app = express();

  app.listen(port, () => console.log(`listening on port: ${port}`));
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(helmet());
  app.use(
    csurf({
      cookie: {
        secure: inProduction,
        sameSite: inProduction ? "lax" : "none",
        httpOnly: true,
      },
    })
  );
  app.use(morgan("tiny"));
  app.use("/api", routes);

  if (process.env.NODE_ENV === "production") {
    console.log("production build");
    app.get("/", (req, res) => {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      res.sendFile(path.join(__dirname, "../../web", "build", "index.html"));
    });

    router.use(
      express.static(
        path.resolve(__dirname, "../../web", "build", "index.html")
      )
    );

    app.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie("XSRF-TOKEN", req.csrfToken());

      res.sendFile(path.join(__dirname, "../../web", "build", "index.html"));
    });
  }
};

startConnection()
  .then(() => console.log("connection to DB started"))
  .catch(console.error);
