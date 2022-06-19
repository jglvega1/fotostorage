import express from "express";
import path from "path";

const route = express.Router();

//route.use(express.static("/public"))

route.get("/dashboard", (req,res)=>{
	const page = path.resolve("dashboard.html")
	res.send(page)
})

export default route;