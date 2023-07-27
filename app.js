import express from "express";
import connectDB from "./DB/connectDB.js";
import * as indexRouter from "./src/modules/index.router.js";
const app = express();
const port = 5000;
const baseUrl = "/api/v1";
app.use(express.json());
app.use(`${baseUrl}/auth`, indexRouter.authRouter);
app.use(`${baseUrl}/user`, indexRouter.userRouter);
app.use(`${baseUrl}/product`, indexRouter.productRouter);
app.use(`*`, (req, res, next) => {
    return res.status(404).json({message:"In-valid routing"})
});
connectDB();
app.listen(port, () => console.log(`Running........${port}`));
