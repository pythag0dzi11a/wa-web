import Koa from "koa";
import { koaBody } from "koa-body";
import { getTasks } from "node-cron";
import "./tasks/cron.ts";
import { logger } from "./utils/log";
import initFile from "./utils/initFile";
import db, { initDb } from "./utils/db/db";
import initRouter from "./routes/initRouter";
import ipTransformer from "./middlewares/ipTransformer";

async function main() {
    ["SIGTERM", "SIGINT", "SIGQUIT"].forEach(function (sig) {
        process.on(sig, () => {
            logger.warn(`${sig} close process signal detected.`);
            processExit();
        });
    });

    // init db
    await initDb();

    // init file
    await initFile();

    // init koa
    const app = new Koa();

    app.use(ipTransformer);

    app.use(async (ctx, next) => {
        logger.debug(`${ctx.ip} ${ctx.method} ${ctx.path}`);
        await next();
    });

    app.use(
        koaBody({
            multipart: true,
            formidable: {
                maxFileSize: 512 * 1024 * 1024
            }
        })
    );

    initRouter(app);

    // cron
    getTasks().forEach((task) => {
        task.start();
    });

    app.listen(3000, () => logger.log("Server running on port 3000"));
}

async function processExit() {
    try {
        // cron
        getTasks().forEach((task) => {
            task.stop();
        });

        // close db
        await db().end();

        logger.info("Exit.");
    } catch (err) {
        logger.error("ERROR:", err);
    } finally {
        process.exit(0);
    }
}

main().then(() => {
    logger.info("Server started.");
});
