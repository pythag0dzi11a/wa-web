export function removeTrail(str: string, trail: string): string {
    if (str.endsWith(trail)) {
        return str.slice(0, -trail.length);
    }
    return str;
}