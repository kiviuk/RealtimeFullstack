const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

if(!process.env.MONGO_URL){
    console.error("Missing MONGO_URL in the environment variables");
    process.exit(1);
}

const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes)

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log('Connected to MongoDB');
        // The rest of your code goes here, after the connection has been established.
    } catch (err) {
        console.error('Mongoose connection error:', err);
    }

    const server = app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server started on port ${process.env.SERVER_PORT}`)
    });
}

main();


