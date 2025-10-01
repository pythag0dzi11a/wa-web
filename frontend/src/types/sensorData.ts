interface BaseSensorData {
    type: string;
}

export interface TemperatureSensorData extends BaseSensorData {
    type: 'temperature';
    value: string;
    id: string;
}

export type SensorData = TemperatureSensorData;