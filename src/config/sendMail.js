import { env } from "./environment.js"
import { google } from 'googleapis'
import nodemailer from 'nodemailer'


const o2AuthClient = new google.auth.OAuth2(env.CLIENT_ID, env.CLIENT_SECRET, env.REDIRECT_URI)
o2AuthClient.setCredentials({ refresh_token: env.REFRESH_TOKEN })
const sendMail = async () => {
  try {
    const accessTokenn = await o2AuthClient.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: "bomelatuyetnhat12@gmail.com",
        clientId: env.CLIENT_ID,
        clientSecret: env.CLIENT_SECRET,
        refreshToken: env.REFRESH_TOKEN,
        accessToken: accessTokenn,
      }
    })
    const info = await transport.sendMail({
      from: '"Maddison Foo Koch 👻" Bomelatuyenhat12@gmail.com', // sender address
      to: "minh.dinhminh1234@hcmut.edu.vn",
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    })
    console.log(info)
  }
  catch (error) {
    throw new Error(error)
  }
}

sendMail()