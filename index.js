//server
import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import imageThumbnail from "image-thumbnail"

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload({
	createParentPath: true
}));
const Port = process.env.PORT || 8080;

app.get("/", (req, res) => {
	const index = path.resolve("index.html")
	res.send(index)
})
app.get("/dashboard", (req, res) => {
	const page = path.resolve("public/dashboard.html")
	res.sendFile(page)
})
app.get("/download/:folder/:fileName", (req, res) => {
	let {fileName, folder} = req.params
	let file = path.resolve(`public/${folder}/${fileName}`);
	res.download(file)
})
app.get("/thumbnail/:folder/:fileName", async (req, res) => {
	let {fileName, folder} = req.params
	let file = await path.resolve(`public/${folder}/${fileName}`);
	let thumb = await imageThumbnail(file);
	//console.log(thumb)
	res.send(thumb)
})

app.get("/list/:n", async (req, res) => {
	let {n} = req.params
	let root = path.resolve(`./public`);
	let list = fs.readdirSync(root).filter(e=>fs.statSync(path.resolve(`./public/${e}`)).isDirectory());
	let obj = [];
	while(obj.length < n){
		let random = Math.floor(Math.random() * list.length);
		let season = list[random];
		let filesList = fs.readdirSync(path.resolve(`./public/${season}`));
		random = Math.floor(Math.random() * filesList.length);
		let file=`${season}/${filesList[random]}`;
		if(!obj.includes(file)){
			obj.push(file)
		}
	}
	res.send(obj)
})

app.post("/update", (req, res, next) => {
	let folder = req.body.folder;
	let photos = req.files.photos;
	for(let photo of photos){
		photo.mv(`./public/${folder}/${photo.name}`);
	}
	res.end()
})

app.get("/photos/:sesion", (req, res) => {
	let {sesion} = req.params
	let folder = path.resolve(`./public/${sesion}`);
	let files = fs.readdirSync(folder);
	let obj = [];
	for(let file of files){
		let dir = path.resolve(file);
		let ext = path.extname(dir);
		if(ext == ".jpg"){
			obj.push(file)
		}
	}
	res.send(obj)
})

app.listen(Port, _=>{
	console.log("Raeady on", Port)
})