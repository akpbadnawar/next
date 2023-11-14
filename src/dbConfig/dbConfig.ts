import mongoose from "mongoose";

export async function connect () {
    console.log("hello check")
    try {
        mongoose.connect(process.env.MONGO_URI!) //HERE ! means we are defining this data will alway resovle.
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDB connected successfully')
        })

        connection.on('error',(err)=>{
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' +err);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong!!")
        console.log(error)
    }
}