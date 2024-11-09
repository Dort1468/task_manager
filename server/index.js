import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { dbConnection } from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js";

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 8800;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://taskontaskmanager.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
