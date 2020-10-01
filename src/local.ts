import { AddressInfo } from "net";
import dotenv from "dotenv";
import app from "./index";

if (process.env.NODE_ENV !== "serverless") {
    dotenv.config();
};

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