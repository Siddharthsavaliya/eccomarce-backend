const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;
function getToken(user) {
    const token = jwt.sign({
        ID: user._id, email: user.email, type: user.type,
    }, process.env.SECRET)

    return token;
}

function extractJWTFromRequest(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' from the token
        return token;
    }
    return null;
}


const validateToken = (req, res, next) => {
    const token = extractJWTFromRequest(req)

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded; // Store the decoded user information in the request object
        next();
    });
};

function extractJWTDetails(jwtToken) {
    try {
        // Verify and decode the JWT using the secret key or public key, depending on your use case
        const decoded = jwt.verify(jwtToken, secretKey); // Replace 'your-secret-key' with your actual secret key

        // The 'decoded' object will contain the payload data from the JWT
        return decoded;
    } catch (error) {
        // Handle any errors (e.g., invalid token or expired token)
        console.error('JWT verification failed:', error);
        return null; // You can return null or handle the error as needed
    }
}

module.exports = {
    validateToken,
    extractJWTDetails,
    extractJWTFromRequest,
    getToken
};