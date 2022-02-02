var queueName = "tasks"
var amqp = require("amqplib")

// Publisher
async function main() {
	let conn = await amqp.connect("amqp://user:password@localhost")
	// create a channel
	let channel = await conn.createChannel()

	// assert the queue
	let ok = await channel.assertQueue(queueName)
	// i dont know if this below checking is to be done
	if (ok.queue == queueName) {
		await channel.sendToQueue(queueName, Buffer.from("something to do 1"))
		await channel.sendToQueue(queueName, Buffer.from("something to do 2"))
		await channel.sendToQueue(queueName, Buffer.from("something to do 3"))
		await channel.sendToQueue(queueName, Buffer.from("something to do 4"))
	}
}

main()
	.then(() => {
		console.log("executed producer")
	})
	.catch(console.error)
