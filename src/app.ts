import express from "express";
import "express-async-errors";
import fruitsRoutes from "./routes/fruits";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";
import authRoutes from "./routes/auth";

const app = express();

app.use(initSessionMiddleware(app.get("env")));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/fruits", fruitsRoutes);

app.use("/auth", authRoutes);

export default app;
