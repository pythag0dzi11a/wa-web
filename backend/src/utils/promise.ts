const tester = {};

export async function isPromiseResolved(p: Promise<any>): Promise<boolean> {
    return (await Promise.race([p, tester])) != tester;
}
