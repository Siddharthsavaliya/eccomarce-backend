const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    firstName: { type: String, required: [true, 'First Name is Required'], },
    lastName: { type: String, required: [true, 'Last Name is Required'], },
    email: { type: String, required: [true, 'Email is Required'], unique: true },
    type: { type: String, required: [true, 'Type is Required'], enum: ["Admin", "Vender", 'User'], message: 'Invalid Type. Must be "Admin," "Vender," or "User".', }
});

exports.User = mongoose.model('User', userSchema);