const model = require('../model/user')
const token = require('../configuration/token')
const userModel = model.User;

exports.getUser = async (req, res) => {
    try {
        const jwtToken = token.extractJWTFromRequest(req);
        const jwtInfo = token.extractJWTDetails(jwtToken);

        const user = await userModel.findOne({ email: jwtInfo.email }).select('-_id -__v')

        return res.status(200).send({
            status: "status",
            message: "user details fetched successfully",
            user: user
        });
    } catch (error) {
        console.log("get user error: " + error);
        return res.status(500).send({
            status: "Failed",
            message: "Internal error occurred",
            error: error
        });
    }
};