import * as fs from "node:fs";
import { logger } from "./log";

const dirsToInit:string[] = [];

export default async function initFile() {
    dirsToInit.forEach((dir) => {
        const realPath = process.cwd() + dir;
        if (fs.existsSync(realPath)) return;
        fs.mkdirSync(realPath);
        logger.log(`[Init]: Created directory ${realPath}`);
    });
}
