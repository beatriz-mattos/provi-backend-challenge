import { AddressInfo } from "net";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/UserRouter";

if (process.env.NODE_ENV !== "serverless") {
    dotenv.config();
};

export const app = express();

app.use(express.json());
app.use("/user", userRouter);

export default app;

if (process.env.NODE_ENV !== "serverless") {
    const server = app.listen(process.env.PORT || 3003, () => {
        if (server) {
            const address = server.address() as AddressInfo;
            console.log(`Server is running in http://localhost:${address.port}`);
        }
        else {
            console.error(`Failure upon starting server.`);
        }
    });
};