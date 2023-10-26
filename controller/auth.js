const model = require('../model/user')
const { getToken } = require('../configuration/token')
const userModel = model.User;

exports.signup = async (req, res) => {
    try {
        const { email } = req.body;

        const exitingUser = await userModel.findOne({ email: email });
        if (exitingUser) {
            return res.status(400).send({
                status: "Failed",
                message: "User already exists"
            });
        }

        const newUser = new userModel(req.body);
        await newUser.save()
        const token = getToken(newUser);
        return res.status(201).send({
            status: "Success",
            message: "User registration successful done",
            token: token
        });

    } catch (error) {
        console.log("Sign-up error: " + error);
        return res.status(500).send({
            status: "Failed",
            message: "Internal error occurred",
            error: error
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send({
                status: "Failed",
                message: "User Not exists,Please sign-up"
            });
        }
        const token = getToken(user);
        return res.status(201).send({
            status: "success",
            message: "Login successful",
            token: token
        });
    } catch (error) {
        console.log("Log-In error: " + error);
        return res.status(500).send({
            status: "Failed",
            message: "Internal error occurred",
            error: error
        });
    }
};