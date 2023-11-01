const twilio = require('twilio');
const dotenv = require("dotenv");

async function sendSms() {
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

    return client.messages
        .create({ body: "Hey this is a test message", from: "+12566125479", to: "+919714696101" })
        .than(message => console.log(message))
        .catch(err => console.log(err))
}




module.exports = sendSms;   