//bulk=0   liquid=1   piece=2 
let prodClassArr = new Array("Сыпучие", "Жидкие", "Штучные");

let productsArr = new Array(
	{
		name: "Мука",
		prodClass: 0,
		density_pieceGr: 650,
	},
	{
		name: "Сахар",
		prodClass: 0,
		density_pieceGr: 1085,
	},
	{
		name: "Вода",
		prodClass: 1,
		density_pieceGr: 997,
	},
	{
		name: "Яйца",
		prodClass: 2,
		density_pieceGr: 60,
	}
);

let select = document.getElementById("productSelect");
let pC = -1;
for (let product of productsArr){
	let option = document.createElement("option");
	option.text = product.name;
	if (product.prodClass != pC){
		pC++;
		let optgroup = document.createElement("optgroup");
		optgroup.label = prodClassArr[pC];
		select.add(optgroup);
	}
	select.add(option);
}


function calcProd() {
	let amount = Number(document.getElementById("amountInput").value);
	if (isNaN(amount)){
		alert("Ошибка в записи");
	} else {


		let results = document.getElementsByClassName("calcResults");
		for (let result of results){
			result.innerHTML = (amount*2) + "кг";
		}
	}
}