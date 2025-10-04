interface BaseSensorData {
    type: string;
}

export interface TemperatureSensorData extends BaseSensorData {
    type: 'temperature';
    value: number;
    id: string;
    time: string;
}

export interface SoilHumiditySensorData extends BaseSensorData {
    type: 'soil_humidity';
    value: number;
    id: string;
    time: string;
}

export type SensorData = TemperatureSensorData | BaseSensorData | SoilHumiditySensorData;