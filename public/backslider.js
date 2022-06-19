function factory (options) {
	const {url} = options;

	if (!url) {
		return null
	}

	let main = document.createElement("div");
	main.classList.add("backMosaic");

	main.style.background = `url(/thumbnail/${url})`;
	main.style.backgroundPosition = "center";
	main.style.backgroundSize = "cover";

	return main
}



async function getList(){
	return await(await fetch("/list/80")).json();
} 

export default async function (root) {
	let list = await getList();
	for(let url of list){
		let mosaic = factory({url});
		if (mosaic) {
			root.append(mosaic)
		}
	}
}