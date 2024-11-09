import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config();

dbConnection();

const port = process.env.PORT || 8800;
const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://taskontaskmanager.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
  );
  res.header("Access-Control-Expose-Headers", "Set-Cookie");

  // 處理 OPTIONS 預檢請求
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// CORS 配置選項
const corsOptions = {
  origin: "https://taskontaskmanager.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
  maxAge: 86400,
};
// 應用 CORS 中介軟體
app.use(cors(corsOptions));

app.use(cookieParser());
app.use((req, res, next) => {
  // 設定 cookie 的 SameSite 屬性
  res.cookie("token", req.cookies.token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: ".onrender.com", // 根據你的 domain 調整
  });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API 路由
app.use("/api", routes);

// 錯誤處理
app.use(routeNotFound);
app.use(errorHandler);

// 啟動伺服器
app.listen(port, () => console.log(`Server listening on ${port}`));
