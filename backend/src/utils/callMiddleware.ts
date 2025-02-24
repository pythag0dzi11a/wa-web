export async function callMiddlewares<
    M extends (...args: [...A, () => Promise<void>]) => Promise<void>,
    A extends any[]
>(middlewares: M[], ...args: A): Promise<boolean> {
    let returnValue = false;
    for (const middleware of middlewares) {
        let flag = false;
        await middleware(...args, async () => {
            flag = true;
        });
        if (!flag) {
            break;
        }
    }
    return returnValue;
}
