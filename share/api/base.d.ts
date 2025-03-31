export type ApiResponseError = {
    code: Exclude<number, 200>;
    error: string;
};

export interface SensorRequest {
    humidity: number;
    timestamp: number;
}
