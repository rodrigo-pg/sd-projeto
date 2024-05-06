import { connect } from "amqplib";
import nodemailer from "nodemailer";
import { config } from "dotenv"

config()

type Message = {
    subject: string;
    recipient: string;
    content: string;
}

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
});

(async () => {
    const connection = await connect(process.env.RABBIT_URI as string)
    const channel = await connection.createChannel()

    channel.consume("mails", async (msg) => {
        console.log("[!] - Mensagem recebida na fila: 'mails'")

        if (!msg?.content) return 
        const message: Message = JSON.parse(msg.content.toString())

        try {
            await transporter.sendMail({
                to: message.recipient,
                subject: message.subject,
                text: message.content
            })
            console.log("[+] E-mail enviado com sucesso!")
            channel.ack(msg)
        } catch (error) {
            channel.nack(msg)
            console.error("[!] Um erro ocorreu ao enviar o e-mail")
        }
    })
})();