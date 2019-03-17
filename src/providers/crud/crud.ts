export const leerDatosArray = leerdatos =>{
	let returnArray = [];

	leerdatos.forEach(element => {
		let item = element.val();
		item.key = element.key;
		returnArray.push(item);
	});

	return returnArray;
}