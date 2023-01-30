const teaspoonVolume = 5; //sm3 = ml
const tablespoonVolume = 18;

//bulk=0 | liquid=1 | piece=2 
let prodClassesArr = new Array( "Сыпучие", "Жидкие", "Штучные");

//bulk - г, кг, ч л, ст л, ст | liquid - мл, л, ч л, ст л, ст | piece - г, кг, шт
//let unitsArr = new Array("г", "кг", "мл", "л", "ч л", "ст л", "ст", "шт");
let bulkUnitsArr = new Array("г", "кг","ч л", "ст л", "ст");
let liquidUnitsArr = new Array("мл", "л", "ч л", "ст л", "ст");
let pieceUnitsArr = new Array("г", "кг", "шт");

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
		density_pieceGr: 60
	}
);

let div = document.getElementById("resultsDiv");
let uSelect = document.getElementById("unitSelect");	

let selectedProduct = 0;
let unitNumber = 3;
changeSelectedUnit();
let pC = -1;

let pSelect = document.getElementById("productSelect");

for (let product of productsArr){
	let option = document.createElement("option");
	option.text = product.name;
	if (product.prodClass != pC){
		pC++;
		let optgroup = document.createElement("optgroup");
		optgroup.label = prodClassesArr[pC];
		pSelect.add(optgroup);
	}
	pSelect.add(option);
}


function changeSelectedUnit(){
	let options = uSelect.querySelectorAll("option");
	for (let option of options){
		option.remove();
	}

	switch (productsArr[selectedProduct].prodClass){
	case 0:
		for (let u of bulkUnitsArr){
			let option = document.createElement("option");
			option.text = u;
			uSelect.add(option);
		}
		if (unitNumber < bulkUnitsArr.length){
			for (let i = 0; i < bulkUnitsArr.length - unitNumber; i++){
				let d = document.createElement("div");
				d.className = "calcResults";
				div.append(d);
			} 
			unitNumber = bulkUnitsArr.length;
		}
		break;

	case 1:
		for (let u of liquidUnitsArr){
			let option = document.createElement("option");
			option.text = u;
			uSelect.add(option);
		}
		if (unitNumber < liquidUnitsArr.length){
			for (let i = 0; i < liquidUnitsArr.length - unitNumber; i++){
				let d = document.createElement("div");
				d.className = "calcResults";
				div.append(d);
			} 
			unitNumber = liquidUnitsArr.length;
		}
		break;

	case 2:
		for (let u of pieceUnitsArr){
			let option = document.createElement("option");
			option.text = u;
			uSelect.add(option);
		}
		if (unitNumber > pieceUnitsArr.length){
			for (let i = 0; i < unitNumber - pieceUnitsArr.length; i++){
				let d = div.querySelector(".calcResults");
				d.remove();
			} 
			unitNumber = pieceUnitsArr.length;
		}
		break;
	}
}

function changeProd(){
	if (selectedProduct != pSelect.selectedIndex){
		selectedProduct = pSelect.selectedIndex;
		changeSelectedUnit();
	} 
}

function calcProd(){
	let amount = Number(document.getElementById("amountInput").value);
	if (isNaN(amount)){
		alert("Ошибка в записи");
	} else {
		let results = div.getElementsByClassName("calcResults");
		let resultsArr = new Array(results.length);
		
		resultsArr[3] = 69;
		/////////////////////////////////////////////////////////////////////////////////////stakan/////////////////////////////
		let d_pG = productsArr[selectedProduct].density_pieceGr;

		let i = 0;
		switch (productsArr[selectedProduct].prodClass){
		case 0:
			switch (uSelect.selectedIndex){
			case 0:
                resultsArr[0] = amount / 1000;
                resultsArr[1] = amount * 1000 / (teaspoonVolume * d_pG);
                resultsArr[2] = amount * 1000 / (tablespoonVolume * d_pG);
                break;

            case 1:
                resultsArr[0] = amount * 1000;
                resultsArr[1] = resultsArr[0] * 1000 / (teaspoonVolume * d_pG);
                resultsArr[2] = resultsArr[0] * 1000 / (tablespoonVolume * d_pG);
                break;

            case 2:
                resultsArr[0] = amount * teaspoonVolume * d_pG / 1000;
                resultsArr[1] = resultsArr[0] / 1000;
                resultsArr[2] = amount * teaspoonVolume / tablespoonVolume;
                break;

            case 3:
                resultsArr[0] = amount * tablespoonVolume * d_pG / 1000;
                resultsArr[1] = resultsArr[0] / 1000;
                resultsArr[2] = amount * tablespoonVolume / teaspoonVolume;
                break;
			}
			for (let result of results){	
				if (i == uSelect.selectedIndex){		
					i++;
				}			
				result.innerHTML = bulkUnitsArr[i];
				i++;
			}
			break;

		case 1:
			switch (uSelect.selectedIndex) {
            case 0:
                resultsArr[0] = amount / 1000;
                resultsArr[1] = amount / teaspoonVolume;
                resultsArr[2] = amount / tablespoonVolume;
                break;

            case 1:
                resultsArr[0] = amount * 1000;
                resultsArr[1] = resultsArr[0] / teaspoonVolume;
                resultsArr[2] = resultsArr[0] / tablespoonVolume;
                break;

            case 2:
                resultsArr[0] = amount * teaspoonVolume;
                resultsArr[1] = resultsArr[0] / 1000;
                resultsArr[2] = amount * teaspoonVolume / tablespoonVolume;
                break;

            case 3:
                resultsArr[0] = amount * tablespoonVolume;
                resultsArr[1] = resultsArr[0] / 1000;
                resultsArr[2] = amount * tablespoonVolume / teaspoonVolume;
                break;
            }
			for (let result of results){	
				if (i == uSelect.selectedIndex){		
					i++;	
				}
				result.innerHTML = liquidUnitsArr[i];
				i++;
			}
			break;

		case 2:
			switch (uSelect.selectedIndex){
            case 0:
            	resultsArr[0] = amount / 1000;
                resultsArr[1] = amount / d_pG;                
                break;

            case 1:
            	resultsArr[0] = amount * 1000;
                resultsArr[1] = amount * 1000 / d_pG;                
                break;

            case 2:
            	resultsArr[0] = amount * d_pG;
                resultsArr[1] = resultsArr[0] / 1000;
                break;
            }
			for (let result of results){	
				if (i == uSelect.selectedIndex){		
					i++;
				}
				result.innerHTML = pieceUnitsArr[i];
				i++;
			}
			break;
		}
		i = 0;
		for (let result of results){			
			result.innerHTML = resultsArr[i] + " " + result.innerHTML;
			i++;
		}
	}
}