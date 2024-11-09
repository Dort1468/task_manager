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

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://taskontaskmanager.netlify.app"]
      : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  exposedHeaders: ["Set-Cookie", "Authorization"],
};

const app = express();

app.use(morgan("dev"));

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log("Request Headers:", req.headers);
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    next();
  });
}

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
