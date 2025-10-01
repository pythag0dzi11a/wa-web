import type { SensorData, TemperatureSensorData } from "@/types/sensorData.ts";

type SpecificSensorCallback<T extends SensorData> = (data: T) => void;

class SensorDataProcessor {
    private temperatureHandlers: SpecificSensorCallback<TemperatureSensorData>[] = [];

}