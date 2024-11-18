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
        validate: {
            validator: (value) =>
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/.test(value),
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
          },
    }
})

const User = mongoose.model('User', userSchema);

export default User;