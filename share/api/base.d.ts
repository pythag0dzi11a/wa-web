export type ApiResponseError = {
    code: Exclude<number, 200>;
    error: string;
};
