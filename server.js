import app from "./app.js";
import connectDB from "./config/db.js";

const startServer = async()=>{
    try {
        await connectDB();

        app.listen(process.env.PORT,()=>{
            console.log(`server is running on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();