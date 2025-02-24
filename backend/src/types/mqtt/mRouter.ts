import { MDefaultContext, MMiddleware } from "./index.ts";
import { callMiddlewares } from "../../utils/callMiddleware.ts";

export type MRouterOptions = {
    prefix?: string | undefined;
};

type MRouterCtx = MDefaultContext & {
    routerTopic?: string;
};

export default class MRouter {
    protected middlewares: { prefix?: string; middleware: MMiddleware }[] = [];
    protected options: MRouterOptions;

    constructor(options?: MRouterOptions) {
        this.options = options || {};
    }

    use(middleware: MMiddleware): MRouter {
        this.middlewares.push({ middleware });
        return this;
    }

    message(prefix: string, ...middlewares: MMiddleware[]): MRouter {
        this.middlewares.push(...middlewares.map((middleware) => ({ prefix, middleware })));
        return this;
    }

    routes(): MMiddleware {
        const self = this;
        return async function (ctx_, next) {
            let ctx = ctx_ as MRouterCtx;
            const rawRTopic = ctx.routerTopic;
            if (ctx.routerTopic === undefined) {
                ctx.routerTopic = ctx.topic;
            }
            let callNext = true;
            if (ctx.routerTopic.startsWith(self.options.prefix || "")) {
                ctx.routerTopic = ctx.routerTopic.slice((self.options.prefix || "").length);
                callNext = await callMiddlewares(
                    self.middlewares
                        .filter((m) =>
                            m.prefix == undefined
                                ? m.middleware
                                : (<string>ctx.routerTopic).startsWith(m.prefix)
                                  ? m.middleware
                                  : undefined
                        )
                        .map((m) => m.middleware),
                    ctx
                );
            }
            ctx.routerTopic = rawRTopic;
            if (callNext) {
                await next();
            }
        };
    }
}
