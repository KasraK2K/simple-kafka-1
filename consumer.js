console.log("consumer...")

import Kafka from "node-rdkafka"
import eventType from "./eventType.js"

const consumer = Kafka.KafkaConsumer(
  {
    "metadata.broker.list": "localhost:9092",
    "group.id": "kafka",
  },
  {},
  { topic: "test-topic-1" }
)

consumer.connect()

consumer
  .on("ready", () => {
    console.log("consumer ready...")
    consumer.subscribe(["test-topic-1"])
    consumer.consume()
  })
  .on("data", (data) =>
    console.log(`received message: ${eventType.fromBuffer(data.value)}`)
  )
