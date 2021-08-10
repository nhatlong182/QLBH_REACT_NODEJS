import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        isWebmaster: { type: Boolean, default: false, required: true },
    }
);
const Account = mongoose.model('Account', accountSchema);
export default Account;
