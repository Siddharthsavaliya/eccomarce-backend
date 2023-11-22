const model = require('../model/user')
const { getToken } = require('../configuration/token')
const userModel = model.User;
const nodeMailer = require('nodemailer');
const twilio = require('twilio');
const logger = require("../logger");
let OTP;

// send message function
async function sendSms({ otp, phone }) {
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log(phone)
    console.log(otp)

    await new Promise((resolve, reject) => {
        client.messages
            .create({ body: 'Your verification code is ' + otp, from: "+12566125479", to: phone })
            .then(message => resolve(message))
            .catch(err => reject(err));
    });

}



// send email 
async function sendEmail({ otp, email }) {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'samarpan.infotech.1221@gmail.com',
            pass: process.env.smtpPassword
        }
    });
    const mailOption = {
        from: 'samarpan.infotech.1221@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: 'Your verification code is ' + otp
    }
    try {
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else if (info) {
                    console.log(info);
                    resolve(info);
                }
            });
        });
    } catch (error) {
        throw new Error("Email sending failed: " + error.message);
    }

}

// send otp 
exports.sendOtp = async (req, res) => {

    const { phone, email } = req.body;
    let digits = "0123456789";
    OTP = "";

    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]
    }

    if (phone != null) {
        sendSms({ otp: OTP, phone: phone })
            .then(() => res.status(201).send({
                status: "Success",
                message: "Otp sent successfully to your phone number"
            }))
    } else {
        sendEmail({ otp: OTP, email: email })
            .then(() => res.status(201).send({
                status: "Success",
                message: "Otp sent successfully to your email address"
            }))
    }

};

// sign up with otp
exports.signUpWithOtp = async (req, res) => {

    let exitingUser;
    const { phone, email, otp } = req.body;
    if (phone != null) {
        exitingUser = await userModel.findOne({ phone: phone });
    } else {
        exitingUser = await userModel.findOne({ email: email });
    }

    if (exitingUser) {
        throw new Error("User already exists");
    }
    console.log(OTP)
    if (OTP === otp) {

        const newUser = new userModel(req.body);
        await newUser.save()
        const token = getToken(newUser);
        return res.status(201).send({
            status: "Success",
            message: "User registration successful done",
            token: token
        });
    } else {
        throw new Error("Invalid OTP");

    }

};

// login with otp
exports.loginWithOtp = async (req, res, next) => {
    const { phone, email, otp } = req.body;
    if (!otp || (!phone && !email)) {
        logger.error("Invalid json in login with otp");
        throw new Error("Invalid json");
    }
    if (OTP === otp) {
        let user;
        if (phone != null) {
            user = await userModel.findOne({ phone: phone });
        } else {
            user = await userModel.findOne({ email: email });
        }
        if (!user) {
            logger.error(phone + " User Not exists,Please sign-up login with otp");
            throw new Error("User Not exists,Please sign-up");
        }
        const token = getToken(user);
        return res.status(201).send({
            status: "success",
            message: "Login successful",
            token: token
        });
    } else {
        logger.error(phone + "Invalid OTP login with otp");
        throw new Error("Invalid OTP");
    }

};