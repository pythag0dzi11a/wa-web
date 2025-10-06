import type { SensorData } from "@/types/sensorClass.ts";
import { SoilHumiditySensorData, TemperatureSensorData } from "@/types/sensorClass.ts";
import { reactive } from "vue";

class DataManager {
    static keep: number = 10;
    protected data: SensorData[] = reactive([]);

    getData<T>(Type: new (data: SensorData) => T) {
        return this.data.filter((d) => d instanceof Type) as T[];
    }

    getLatestData<T>(Type: new (data: SensorData) => T) {
        const filteredData = this.getData(Type);
        const latestDataMap: { [id: string]: T } = {};

        filteredData.forEach((d) => {
            const id = (d as any).id;
            if (!latestDataMap[id] || (d as any).time > (latestDataMap[id] as any).time) {
                latestDataMap[id] = d;
            }
        });
        return Object.values(latestDataMap);
    }

    getDataById<T = SensorData>(id: string): T | undefined {
        const idData = this.data.filter((d) => (d as any).id === id);
        return idData[idData.length - 1] as T | undefined;
    }

    uncheckedAddData(data: SensorData) {
        switch (data.type) {
            case "soilHumidity":
                this.data.push(new SoilHumiditySensorData(data));
                break;
            case "temperature":
                this.data.push(new TemperatureSensorData(data));
                break;
            default:
                throw new Error(`Unknown data type: ${data.type}`);
        }
    }

    addData(data: SensorData) {
        this.uncheckedAddData(data);
        this.reduceData(data.id);
    }

    reduceData(id: string) {
        const idData = this.data.filter((d) => (d as any).id === id);
        if (idData.length > DataManager.keep) {
            const excess = idData.length - DataManager.keep;
            const newData = this.data.filter(
                (d) => (d as any).id !== id || idData.indexOf(d) >= excess
            );
            this.data.splice(0, this.data.length, ...newData);
        }
    }
}

const dataManager = reactive(new DataManager());

export default dataManager;
