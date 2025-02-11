import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import { connectGraphQL } from "./graphql/graphql.js";
import { ExpressContextFunctionArgument, expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
import dotenv from "dotenv";
import { db } from "./lib/db.js";
import { auth } from "./middleware/auth.js";
import { Users } from "./lib/entities/users.js";

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

const app = express();

const graphqlServer = connectGraphQL();
await graphqlServer.start();

app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));

app.use("/graphql", expressMiddleware(graphqlServer,{
  context:async({req}:ExpressContextFunctionArgument):Promise<{user:Users | null}>=>{
    const token = req.headers.authorization;
    if(!token){
      return {user:null};
    }
    const user = await auth(token);
    return {user:user};
  }
}));



app.get("/", async(req, res) => {
  res.send("Hello, World!");
});

// your routes here

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`--------------------------------------------\n`);
  console.log(
    "Server is working on Port:" + port + " in " + envMode + " Mode."
  );
  console.log(`\n--------------------------------------------`);
  db.initialize().then(()=>console.log('DB Connected !'))
  .catch((err)=>console.log('DB FAIELD',err))
});
