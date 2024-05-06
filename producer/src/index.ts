import express, { json } from 'express';
import { connect, Connection } from "amqplib"
import { config } from "dotenv"

config()

const app = express()
const port = 3000
let rabbitConnection: Connection;

app.use(json())

app.post('/mail/send', async (req, res) => {
  const { 
    recipient,
    subject,
    content
  } = req.body
  
  const channel = await rabbitConnection.createChannel()
  const sendResult = channel.sendToQueue("mails", Buffer.from(JSON.stringify({
    subject,
    recipient,
    content
  })))

  if (sendResult) {
    return res
    .status(200)
    .json({
      status: "ok"
    })
  } else {
    return res
    .status(500)
    .json({
      status: "failure"
    })
  }
})

connect(process.env.RABBIT_URI as string)
.then(connection => {
  rabbitConnection = connection
  app.listen(port, () => {
    console.log(`Producer listening on port ${port}`)
  })
})