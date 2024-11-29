// import { log } from "console"
import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

const connectDB = async ():Promise<void> => {
    if(connection.isConnected){
        console.log("already connected");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
         connection.isConnected = db.connections[0].readyState

         console.log("db connected");
         
    } catch (error) {
         
        console.log("Connection failed ", error);
         
        process.exit(1)
    }
}

export default connectDB;

