function translateSensorType(type: string): string {
    switch (type) {
        case "soilHumidity":
            return "土壤湿度";
        case "temperature":
            return "温度";
        default:
            return "未知";
    }
}

