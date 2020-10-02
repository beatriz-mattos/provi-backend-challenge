import { AddressInfo } from "net";
import dotenv from "dotenv";
import app from "./index";

dotenv.config();

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.info(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});