import express, { Application, json } from "express";
import cors from "cors";

import { ProductRoutes } from "./routes/ProductRoutes";
import { BrandRoutes } from "./routes/BrandRoutes";
import { CategoryRoutes } from "./routes/CategoryRoutes";

const app: Application = express();

app.use(json());
app.use(cors());

app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/brands", BrandRoutes);
app.use("/api/v1/categories", CategoryRoutes);

export { app };
