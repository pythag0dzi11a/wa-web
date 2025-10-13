from paho.mqtt import client as mqtt_client
from datetime import datetime
import threading


class MQTTConnector:

    def __init__(self, broker, port, client_id):
        self.broker = broker
        self.port = port
        self.client_id = client_id
        self.client = mqtt_client.Client(client_id)

    def connect_mqtt():
        def on_connect(client, userdata, flags, rc):
            if rc == 0:
                print("Connected to MQTT Broker!")
            else:
                print("Failed to connect, return code %d\n", rc)

        client.on_connect = on_connect
        client.connect(broker, port)
        return client

    @staticmethod
    def subscribe(client: mqtt_client, topic: str):
        """
        :param client: MQTT client instance
        :param topic: topic to subscribe to
        :return: None
        """
        def on_message(client, userdata, msg):
            print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

        client.subscribe(topic)
        client.on_message = on_message
    
    @staticmethod
    def publish(client: mqtt_client, topic: str, message: str):
        """
        :param client: MQTT client instance
        :param topic: topic to publish to
        :param message: message to publish
        :return: None
        """
        result = client.publish(topic, message)
        status = result[0]
        if status == 0:
            print(f"Send `{message}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")

def main():
    mqtt_connector = MQTTConnector(broker='broker.emqx.io',
                                   port=1883,
                                   client_id='sensor-report-timer')
    client = mqtt_connector.connect_mqtt()
    topic_report_trigger = "sensor/report_trigger"
    trigger_message = json.dumps({
        "trigger": "report",
        "timestamp": datetime.now().isoformat("%Y-%m-%d-%H:%M:%S")
    })
    threading.Timer(15, mqtt_connector.publish(topic=topic_report_trigger,client=client,message=trigger_message)).start()  # Schedule the next call


if __name__ == "__main__":
    main()