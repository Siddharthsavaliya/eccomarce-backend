const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    firstName: { type: String, required: [true, 'First Name is Required'], },
    lastName: { type: String, required: [true, 'Last Name is Required'], },
    email: { type: String, unique: true, match: [/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, "Please enter Valid Email address"], },
    phone: { type: String, unique: true, match: [/^[0-9]{10}$/, "Please enter valid phone number"] },
    type: { type: String, required: [true, 'Type is Required'], enum: ["Admin", "Vender", 'User'], message: 'Invalid Type. Must be "Admin," "Vender," or "User".', }
});

exports.User = mongoose.model('User', userSchema);