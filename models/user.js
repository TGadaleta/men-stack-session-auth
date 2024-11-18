import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        match: ['^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$', 'Provide one upper and one lower case letter, one number, and one special character.']
    }
        
})

const User = mongoose.model('User', userSchema);

export default User;