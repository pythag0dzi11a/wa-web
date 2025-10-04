interface SensorData {
    type: string;
    id: string;
    time: Date;
}

class SoilHumiditySensorData implements SensorData {
    type: string;
    id: string;
    time: Date;
    humidity: number;

    constructor(data: SensorData) {
        this.type = data.type;
        this.id = data.id;
        this.time = data.time;
        this.humidity = (data as any).humidity; // 假设传入的数据有 humidity 字段
    }
}

class TemperatureSensorData implements SensorData {
    type: string;
    id: string;
    time: Date;
    temperature: number;

    constructor(data: SensorData) {
        this.type = data.type;
        this.id = data.id;
        this.time = data.time;
        this.temperature = (data as any).temperature; // 假设传入的数据有 temperature 字段
    }
}

export { type SensorData, SoilHumiditySensorData, TemperatureSensorData };
