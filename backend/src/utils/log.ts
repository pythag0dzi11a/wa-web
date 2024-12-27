import { getLogger } from "log4js";
import env from "./env.ts";

const logger = getLogger();

logger.level = env.loglevel;

export { logger };
