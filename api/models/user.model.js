import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-icon&psig=AOvVaw1m0jLJ_b1qyOM4yMinuinM&ust=1703660933730000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiJyN7FrIMDFQAAAAAdAAAAABAD"
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;