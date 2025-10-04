import type { SensorData } from "@/types/sensorData.ts";

class SensorStore {
    private static instance: SensorStore;

    // private data: SensorData[] = [];
    private soilHumidityData: SensorData[] = [];
    private temperatureData: SensorData[] = [];

    private constructor() {}

    public static getInstance(): SensorStore {
        if (!SensorStore.instance) {
            SensorStore.instance = new SensorStore();
        }
        return SensorStore.instance;
    }

    public addData(newData: SensorData): void {
        // this.data.push(newData);
        // if (this.data.length > 500) {
        //     this.data.shift();
        // }
        switch (newData.type) {
            case "soil_humidity":
                this.soilHumidityData.push(newData);
                if (this.soilHumidityData.length > 50) {
                    this.soilHumidityData.shift();
                }
                break;
            case "temperature":
                this.temperatureData.push(newData);
                if (this.temperatureData.length > 50) {
                    this.temperatureData.shift();
                }
                break;
            default:
                break; // 抛弃数据
        }
    }

    public getData(type: string): SensorData[] {
        switch (type) {
            case "soil_humidity":
                return this.soilHumidityData;
            case "temperature":
                return this.temperatureData;
            default:
                return [];
        }
    }
}

export const sensorStore = SensorStore.getInstance();
