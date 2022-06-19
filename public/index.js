//background
import backSlider from "./backslider.js";
backSlider(document.getElementById("background"));


//portfolio

//seasson
let sesion = document.getElementById("frm-Pedido");
sesion.addEventListener("submit", e => {
	e.preventDefault();
	let fecha = document.getElementById("frm-Pedido-Fecha").value
	let nombres = document.getElementById("frm-Pedido-Nombres").value
	let dir = `${fecha}-${nombres}`;
	(async _=> {
		let f = await fetch(`./photos/${dir}`);
		let obj = await f.json();
		obj = obj.map(e => `${dir}/${e}`)

		let root = document.getElementById("root-Pedido");
		renderPhotos(root, obj);
	})();
})

function build(file) {
	let img = document.createElement("img");
	img.src = `/thumbnail/${file}`;

	let div = document.createElement("div");
	div.classList.add("img-container");

	let warp = document.createElement("div");
	warp.classList.add("img-warp")

	let btn = document.createElement("a");
	btn.innerHTML = "Descargar"
	btn.href = `/download/${file}`

	warp.appendChild(img);
	warp.appendChild(btn);
	div.appendChild(warp);

	return div
}

function renderPhotos (root, obj){
	root.innerHTML = "";
	for(let file of obj){
		let img = build(file)

		root.appendChild(img)
	}
	setTimeout(_=>{
		root.scrollIntoView({behavior:'smooth', block:'start'});
	}, 200)
}