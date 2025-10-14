from paho.mqtt import client as mqtt_client
from datetime import datetime
import threading
import json
import logging
import time


class MQTTConnector:

    def __init__(self, broker, port, client_id):
        self.broker = broker
        self.port = port
        self.client_id = client_id
        self.client = mqtt_client.Client(client_id=client_id, callback_api_version=mqtt_client.CallbackAPIVersion.VERSION2)  # type: ignore
        self.connected = False
        print(f"Initialized MQTT client with ID: {self.client_id}")

    def connect_mqtt(self):
        def on_connect(client, userdata, flags, rc, properties):
            if rc == 0:
                print("Connected to MQTT Broker!")
                self.connected = True
            else:
                print(f"Failed to connect, return code {rc}")
                print(f"Connection result meanings:")
                print(f"  0: Connection successful")
                print(f"  1: Connection refused - incorrect protocol version")
                print(f"  2: Connection refused - invalid client identifier")
                print(f"  3: Connection refused - server unavailable")
                print(f"  4: Connection refused - bad username or password")
                print(f"  5: Connection refused - not authorised")
                self.connected = False

        def on_disconnect(client, userdata, flags, rc, properties):
            print(f"Disconnected from MQTT broker with result code {rc}")
            self.connected = False

        def on_connect_fail(client, userdata):
            print("Failed to connect to MQTT broker - connection failed callback")

        def on_log(client, userdata, level, buf):
            print(f"MQTT Log: {buf}")

        self.client.on_connect = on_connect
        self.client.on_disconnect = on_disconnect
        self.client.on_connect_fail = on_connect_fail
        self.client.on_log = on_log  # 启用日志以获得更多调试信息
        
        print(f"Attempting to connect to MQTT broker at {self.broker}:{self.port}")
        try:
            self.client.connect(self.broker, self.port, 60)  # 添加 keepalive 参数
            # 启动网络循环来处理回调函数
            self.client.loop_forever()
            print("MQTT loop started")
            
            # 等待连接完成
            for i in range(10):  # 等待最多10秒
                if self.connected:
                    break
                time.sleep(1)
                print(f"Waiting for connection... ({i+1}/10)")
            
            if not self.connected:
                print("Failed to establish connection within timeout period")
                
        except Exception as e:
            print(f"Exception while connecting to MQTT broker: {e}")

    def subscribe(self, topic: str):
        """
        :param client: MQTT client instance
        :param topic: topic to subscribe to
        :return: None
        """

        def on_message(client, userdata, msg):
            print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

        self.client.subscribe(topic)
        self.client.on_message = on_message

    def publish(self, topic: str, message: str):
        """
        :param client: MQTT client instance
        :param topic: topic to publish to
        :param message: message to publish
        :return: None
        """
        if not self.connected:
            print("Cannot publish: Not connected to MQTT broker")
            return
            
        result = self.client.publish(topic, message)
        status = result[0]
        if status == 0:
            print(f"Send `{message}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}, status: {status}")


class SensorReportTimer(MQTTConnector):
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
        request_report_message = json.dumps(
            {"request": "report", "timestamp": datetime.now().isoformat()}
        )
        self.publish(self.topic, request_report_message)


def main():
    broker = "pythagodzilla.top"  # 恢复你的服务器
    # broker = "test.mosquitto.org"  # 公共测试服务器
    port = 1883
    client_id = "sensor-report-timer"
    topic = "sensors/report"
    interval = 1  # seconds

    sensor_reporter = SensorReportTimer(broker, port, client_id, topic, interval)

    # 连接已经在 SensorReportTimer.__init__() 中完成了，这里不需要重复调用
    # 给连接一些时间来完成
    import time
    time.sleep(2)
    
    #threading.Timer(interval, sensor_reporter.request_reporting).start()

    while True:
        sensor_reporter.request_reporting()
        time.sleep(interval)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Program interrupted")
    except Exception as e:
        logging.exception(f"An error occurred: {e}")
