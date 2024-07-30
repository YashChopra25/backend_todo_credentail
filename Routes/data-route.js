import express from "express";
import { AddData } from "../controllers/data-controller/AddData.js";
import { GetData } from "../controllers/data-controller/GetData.js";
import { UpdateData } from "../controllers/data-controller/UpdateData.js";

const data_routes = express.Router()

data_routes.get("/get-data/:id", GetData).patch("/update-data/:id", UpdateData).post("/add-data", AddData)
export default data_routes