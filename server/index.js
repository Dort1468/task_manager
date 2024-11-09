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

const app = express();
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://taskontaskmanager.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // 處理 OPTIONS 請求
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.header(
    "Access-Control-Allow-Origin",
    "https://taskontaskmanager.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  res.status(err.status || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.error("Error:", err);

  server.close(() => {
    process.exit(1);
  });
});
