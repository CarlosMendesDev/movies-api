import nodemail from 'nodemailer'

const transport = nodemail.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.SENHA
  }
})

export default transport
