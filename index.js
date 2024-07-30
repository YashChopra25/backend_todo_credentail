import express from "express"
import dotenv from "dotenv"
import compression from "compression"
import { Dbconnect } from "./config/DbConnect.js";
import cors from "cors"
import auth_routes from "./Routes/route.js";
const app = express(); //creating an instance of express
dotenv.config()

//Secret Variable Imports
const port = process.env.PORT
const DB_URL = process.env.MONGODB_URL;



//middleware
app.use(express.json()) //to receive data in json format to the server
app.use(express.urlencoded({ extended: true })); //to receive data from client to the server
app.use(compression())
const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}
app.use(cors(corsOption))


//Connect to DB
await Dbconnect()



//test route-home route
app.get("/", (req, res) => {
    res.status(200).send({ msg: "Listing from server", status: true })
})
app.post("/", (req, res) => {
    res.status(201).send({ body: req.body, msg: "post request from server", status: true })
})

//routes middleware
app.use("/api/v1/", auth_routes)

app.listen(port, () => {
    console.log("server is running on port", port)
})