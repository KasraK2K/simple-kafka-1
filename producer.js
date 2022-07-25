console.log("producer...")

import Kafka from "node-rdkafka"
import eventType from "./eventType.js"

const producer = Kafka.Producer.createWriteStream(
  { "metadata.broker.list": "localhost:9092" },
  {},
  { topic: "test-topic-1" }
)

const randomFromArray = (...args) =>
  args[Math.floor(Math.random() * args.length)]

const getRandomCategory = () => randomFromArray("CAT", "DOG")

const getRandomNoise = (animal) => {
  const noises = animal === "CAT" ? ["purr", "meow"] : ["woof", "bark"]
  return randomFromArray(...noises)
}

const queueMessage = () => {
  const category = getRandomCategory()
  const noise = getRandomNoise(category)
  const event = { category, noise }
  const success = producer.write(eventType.toBuffer(event))
  success
    ? console.log("message wrote successfully to producer stream.")
    : console.log("something went wrong.")
}

setInterval(() => queueMessage(), 3000)
