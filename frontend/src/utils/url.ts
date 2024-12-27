export function getUrlArg(name: string): string | string[] | undefined {
    const url = new URL(window.location.href);
    const a = url.searchParams.getAll(name);
    return a.length == 0 ? undefined : a.length == 1 ? a[0] : a;
}
