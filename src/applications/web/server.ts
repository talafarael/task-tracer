import express from "express";
import { errorHandler } from "./middlewars/error";
// import itemRoutes from './routes/itemRoutes';

const app = express();

app.use(express.json());

// app.use('/api/items', itemRoutes);
app.use(errorHandler);

export default app;
