const express = require('express');
const prisma = require('./middlewares/prisma');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const appRouter = require('./modules/app.routes');
require('dotenv').config()


const app = express();
app.use(prisma);
app.use(cors({
    allowedHeaders: ["*", "content-type", "authorization"],
    origin: ["http://192.168.43.248:8081"]
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use("/api", appRouter);


app.listen(process.env.PORT, () => {
    console.log("Server is up on port " + process.env.PORT);
})