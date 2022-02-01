var q = "tasks"

var open = require("amqplib").connect("amqp://user:password@localhost")

// Publisher
open
	.then(function (conn) {
		return conn.createChannel()
	})
	.then(function (ch) {
		return ch.assertQueue(q).then(function (ok) {
			ch.sendToQueue(q, Buffer.from("something to do 1"))
			ch.sendToQueue(q, Buffer.from("something to do 2"))
			ch.sendToQueue(q, Buffer.from("something to do 3"))
			ch.sendToQueue(q, Buffer.from("something to do 4"))
			return
		})
	})
	.catch(console.warn)
