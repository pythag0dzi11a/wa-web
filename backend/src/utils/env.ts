import { config } from "dotenv";
import { requireNonNull } from "./obj.ts";

config();

const env = {
    db: {
        url: requireNonNull(process.env.DB_URL)
    },
    loglevel: process.env.LOG_LEVEL || "info",
    jwt: {
        secret: requireNonNull(process.env.JWT_SECRET)
    },
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
};

export default env;
