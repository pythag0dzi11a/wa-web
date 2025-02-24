import MMessage from "./mMessage.ts";

type MDefaultContextExtends = MMessage;

export interface MDefaultContext extends MDefaultContextExtends {
    [key: PropertyKey]: any;
}

export type MNext = () => Promise<any>;

export type MMiddleware<Ctx = MDefaultContext> = (context: Ctx, next: MNext) => any;

export * from "./mClient.ts";
export * from "./mMessage.ts";
export * from "./mRouter.ts";
