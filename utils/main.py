from paho.mqtt import client as mqtt_client
from datetime import datetime
from MQTTConnector import MQTTConnector
import schedule
import time
import json
import logging
import time


class SensorReportTimer(MQTTConnector):
    """定时类
    Args:
        MQTTConnector (class): MQTT 连接器基类。
        broker (str): MQTT 代理地址(主机名或 IP)。
        port (int): MQTT 代理端口。
        client_id (str): MQTT 客户端 ID。
        topic (str): 传感器数据发布的主题。
        interval (int): 定时间隔，单位为秒。
    Attributes:
        topic (str): 传感器数据发布的主题。
        interval (int): 定时间隔，单位为秒。
    Methods:
        request_reporting() -> None
            发布请求传感器数据的消息。
    """

    def __init__(self, broker, port, client_id, topic, interval):
        super().__init__(broker, port, client_id)
        self.topic = topic
        self.interval = interval
        self.connect_mqtt()
        # loop_start() 已经在 connect_mqtt() 中调用了
        print(
            f"SensorReportTimer initialized to publish to topic: {self.topic} every {self.interval} seconds"
        )

    def request_reporting(self):
        """发送“需要report”的信息
        Args:
            None
        Returns:
            None
        """
        request_report_message = json.dumps(
            {"request": "report", "timestamp": datetime.now().isoformat()}
        )
        self.publish(self.topic, request_report_message)


def main():
    broker = "pythagodzilla.top"
    port = 1883
    client_id = "sensor-report-timer"
    topic = "sensors/report"
    interval = 10  # seconds

    global sensor_reporter

    sensor_reporter = SensorReportTimer(broker, port, client_id, topic, interval)

    # 给连接一些时间来完成

    time.sleep(2)

    schedule.every(interval=interval).seconds.do(sensor_reporter.request_reporting)

    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        global sensor_reporter
        if sensor_reporter.connected:
            sensor_reporter.disconnect()
        print("Program interrupted")
    except Exception as e:
        logging.exception(f"An error occurred: {e}")
