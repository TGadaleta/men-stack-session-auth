import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
})

const User = mongoose.model('User', userSchema);

export default User;