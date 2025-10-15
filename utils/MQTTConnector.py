import time
from paho.mqtt import client as mqtt_client
from logger import get_logger

logger = get_logger()


class MQTTConnector:
    """MQTT 连接器基类，封装 paho-mqtt 客户端的连接、订阅、发布和断开逻辑。

    Args:
        broker (str): MQTT 代理地址(主机名或 IP)。
        port (int): MQTT 代理端口。
        client_id (str): MQTT 客户端 ID。

    Attributes:
        client (mqtt_client.Client): 底层 paho MQTT 客户端实例。
        connected (bool): 连接状态标志。

    Methods:
        connect_mqtt() -> None
            建立连接并启动后台网络循环（非阻塞）。
        subscribe(topic: str) -> None
            订阅主题并设置简单的 on_message 回调。
        publish(topic: str, message: str) -> None
            发布消息到指定主题。
        disconnect() -> None
            停止后台循环并断开连接。
        is_connected() -> bool
            线程安全地返回当前连接状态。
    """

    def __init__(self, broker, port, client_id):
        self.broker = broker
        self.port = port
        self.client_id = client_id
        self.client = mqtt_client.Client(client_id=client_id, callback_api_version=mqtt_client.CallbackAPIVersion.VERSION2)  # type: ignore
        self.connected = False
        logger.info(f"Initialized MQTT client with ID: {self.client_id}")

    def connect_mqtt(self) -> None:
        """建立连接并启动后台网络循环（非阻塞）。
        Args:
            None
        Returns:
            None
        """

        def on_connect(client, userdata, flags, rc, properties):
            if rc == 0:
                logger.info("Connected to MQTT Broker!")
                self.connected = True
            else:
                logger.error(f"Failed to connect, return code {rc}")
                logger.error(f"Connection result meanings:")
                logger.error(f"  0: Connection successful")
                logger.error(f"  1: Connection refused - incorrect protocol version")
                logger.error(f"  2: Connection refused - invalid client identifier")
                logger.error(f"  3: Connection refused - server unavailable")
                logger.error(f"  4: Connection refused - bad username or password")
                logger.error(f"  5: Connection refused - not authorised")
                self.connected = False

        def on_disconnect(client, userdata, flags, rc, properties):
            logger.info(f"Disconnected from MQTT broker with result code {rc}")
            self.connected = False

        def on_connect_fail(client, userdata):
            logger.error(
                "Failed to connect to MQTT broker - connection failed callback"
            )

        def on_log(client, userdata, level, buf):
            logger.info(f"MQTT Log: {buf}")

        self.client.on_connect = on_connect
        self.client.on_disconnect = on_disconnect
        self.client.on_connect_fail = on_connect_fail
        self.client.on_log = on_log  # 启用日志以获得更多调试信息

        logger.info(
            f"Attempting to connect to MQTT broker at {self.broker}:{self.port}"
        )
        try:
            self.client.connect(self.broker, self.port, 60)  # 添加 keepalive 参数
            # 启动网络循环来处理回调函数
            self.client.loop_start()
            logger.info("MQTT loop started")

            # 等待连接完成
            for i in range(10):  # 等待最多10秒
                if self.connected:
                    break
                time.sleep(1)
                logger.info(f"Waiting for connection... ({i+1}/10)")

            if not self.connected:
                logger.error("Failed to establish connection within timeout period")

        except Exception as e:
            logger.error(f"Exception while connecting to MQTT broker: {e}")

    def subscribe(self, topic: str) -> None:
        """订阅主题并设置简单的 on_message 回调。
        Args:
            topic (str): 订阅的主题。
        Returns:
            None
        """

        def on_message(client, userdata, msg):
            logger.info(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

        self.client.subscribe(topic)
        self.client.on_message = on_message

    def disconnect(self) -> None:
        """停止后台循环并断开连接。
        Args:
            None
        Returns:
            None
        """
        self.client.loop_stop()
        self.client.disconnect()
        logger.info("Disconnected from MQTT broker")

    def publish(self, topic: str, message: str) -> None:
        """发表消息到指定主题。
        Args:
            topic (str): 发表的主题。
            message (str): 发表的消息内容。
        Returns:
            None
        """
        if not self.connected:
            logger.error("Cannot publish: Not connected to MQTT broker")
            return

        result = self.client.publish(topic, message)
        status = result[0]
        if status == 0:
            logger.info(f"Send `{message}` to topic `{topic}`")
        else:
            logger.error(f"Failed to send message to topic {topic}, status: {status}")
