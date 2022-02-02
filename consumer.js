var queueName = "tasks"
var amqp = require("amqplib")

// Consumer
async function main() {
	let conn = await amqp.connect("amqp://user:password@localhost")
	// create a channel
	let channel = await conn.createChannel()
	// will send and wait for ack only 1 message at a time
	channel.prefetch(1)

	// consume messages
	channel.consume(queueName, function (msg) {
		if (msg !== null) {
			console.log(msg.content.toString())
			// simulated delay
			setTimeout(() => {
				channel.ack(msg)
			}, 500)
		}
	})
}

main()
	.then(() => {
		console.log("initialized consumer")
	})
	.catch(console.error)
