import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/PLSTORE1', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        console.log('Ket noi mongodb thanh cong!!!');
    } catch (error) {
        console.log('Ket noi mongodb that bai!!!');
        process.exit(1);
    }
}

export default connectDB;