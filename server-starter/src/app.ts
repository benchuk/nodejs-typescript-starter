import express from "express";
import routesConfiguration from "./routes"
import globalMiddlewares from "./middlewares";
import { initExtensions } from './utils/extensions';

initExtensions()

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(globalMiddlewares)
app.use('/', routesConfiguration());

export default app;