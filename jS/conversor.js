// Função principar para pegar os valores, verificar e converter
// Parametros vindo do HTML 
function mainConverter(id, conversor) {
	console.log(`id:${id},conversor:${conversor}`);
	const colorValue = getValue(id).value;
	const arrayVerif = colorValue.replace(/[)(%° ]/g, "").split(",");
	const rgbVerif = verificationRgb(arrayVerif, conversor, id);
	console.log(arrayVerif);
	if (rgbVerif === true) { return }

	if (conversor === 1) {
		const arrayCmy = rgbToCmy(arrayVerif);
		writeResp(id, arrayCmy, "CMY");
		changeColorEx(id, colorValue);
	}
	if (conversor === 2) {
		const arrayRgb = cmyToRgb(arrayVerif);
		writeResp(id, arrayRgb, "RGB");
		const x = arrayRgb.toString()
		const y = `(${x})`
		changeColorEx(id, y)
	}
	if (conversor === 3) {
		const arrayHex = rgbToHex(arrayVerif);
		writeResp(id, arrayHex, "Hex");
		changeColorEx(id, colorValue);
	}
	if (conversor === 4) {
		const arrayRgb = hexToRgb(colorValue);
		writeResp(id, arrayRgb, "RGB");
		changeColorEx(id, arrayRgb)
	}
	if (conversor === 5) {
		const arrayRgb = cmyToRgb(arrayVerif);
		const x = arrayRgb.toString()
		const y = `(${x})`
		const arrayHex = rgbToHex(arrayRgb);
		writeResp(id, arrayHex, "Hex");
		changeColorEx(id, y)
	}
	if (conversor === 6) {
		const stringRgb = hexToRgb(colorValue);
		const arrayRgb = stringRgb.replace(/[)( ]/g, "").split(",");
		const arrayCmy = rgbToCmy(arrayRgb);
		writeResp(id, arrayCmy, "CMY");
		changeColorEx(id, stringRgb);
	}
	if (conversor === 7) {
		const arrayHsv = rgbToHsv(arrayVerif);
		writeResp(id, arrayHsv, "HSV");
		changeColorEx(id, colorValue)
	}
	if(conversor === 8) {
		const arrayRgb = hsvToRgb(arrayVerif);
		
		writeResp(id, arrayRgb, "RGB");
		changeColorEx(id,arrayRgb);
	}
	if(conversor === 9) {
		const arrayRgb = cmyToRgb(arrayVerif);
		const x = arrayRgb.toString();
		const y = `(${x})`;
		const arrayHsv = rgbToHsv(arrayRgb);
		writeResp(id, arrayHsv, "HSV");
		changeColorEx(id, y);
	}
	if(conversor === 10) {
		const stringRgb = hsvToRgb(arrayVerif);
		const arrayRgb = stringRgb.replace(/[)(%° ]/g, "").split(",");
		const arrayCmy = rgbToCmy(arrayRgb);
		writeResp(id, arrayCmy, "CMY");
		changeColorEx(id, stringRgb);
	}
	if(conversor === 11) {
		const stringRgb = hexToRgb(colorValue);
		const arrayRgb = stringRgb.replace(/[)( ]/g, "").split(",");
		const arrayHsv = rgbToHsv(arrayRgb);
		writeResp(id, arrayHsv, "HSV");
		changeColorEx(id, stringRgb);
	}
	if(conversor === 12) {
		const stringRgb = hsvToRgb(arrayVerif);
		const arrayRgb = stringRgb.replace(/[)(%° ]/g, "").split(",");
		const arrayHex = rgbToHex(arrayRgb);
		writeResp(id, arrayHex, "Hex");
		changeColorEx(id, stringRgb);
	}
}

function writeResp(id, resp, cor) {
	return getValue(`resultado${id}`).innerHTML = `${cor} = ${resp}`
}

// função para pegar o id
function getValue(id) {
	return this.document.getElementById(id);
}

function changeColorEx(id, color) {
	const typeColor = id.replace("'", "")
	document.getElementById(`colorEx${typeColor}`).style.backgroundColor = `RGB${color}`
}



// ----------Verificações-----------
// Função para verificar se o array é menor que zero, maior que 255 ou contem letras (RGB)
function verificationRgb(value, numb, id) {
	let erro = false;
	const hexRegExp = /[g-z]/gi;
	const caracterRegExp = /[a-z]/gi;

	value.forEach(e => {
		if (e === "000") { return }
		else if (e === "") {
			alert(`ERRO: Você não escreveu um dos valores.`)
			return erro = true;
		} 
		else if (caracterRegExp.test(e) && numb !== 4 && numb !== 6 && numb !== 11) {
			alert(`ERRO: O valor ${e} contém uma letra.`);
			return erro = true;
		} 
		else if ('rgb' === id) {
			if (e > 255 || e < 0) {
				alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
				return erro = true;
			}
		} 
		else if ('cmy' === id) {
			if (e > 1 || e < 0) {
				alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
				return erro = true;
			}
		} 
		else if ('hex' === id) {
			if (hexRegExp.test(e)) {
				alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
				return erro = true;
			}
		} 
		else if ('hsv' === id) {
			if(value[0] > 360 || value[0] < 0){
				alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
				return erro = true;
			}
			if(value[1] > 100 || value[1] < 0){
				alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
				return erro = true;
			}
			if(value[2] > 100 || value[2] < 0){
				alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
				return erro = true;
			}
		}
	});
	return erro;
}
// ----------Verificações-----------




// ----------Conversores------------
function rgbToCmy(value) {
	const novoArrayCmy = value.map(e => {
		const test = 1 - (e / 255);
		const resposta = parseFloat(test.toFixed(5));
		return ` ${resposta}`;
	})
	return novoArrayCmy;
}

function cmyToRgb(value) {
	const novoArrayRgb = value.map(e => {
		const test = (1 - e) * 255;
		const respTest = test.toFixed(1)
		return `${respTest}`;
	})
	return novoArrayRgb;
}

function rgbToHex(value) {
	const numbRgb = transformNumber(value);
	const hexR = parseInt(numbRgb[1].toFixed(0)).toString(16);
	const hexG = parseInt(numbRgb[2].toFixed(0)).toString(16);
	const hexB = parseInt(numbRgb[1].toFixed(0)).toString(16);	
	return `#${hexR}${hexG}${hexB}`
}

function rgbToHsv(arrayRgb) {
	numRgbZeroOne = arrayRgb.map((numberRgb) => {
		return numberRgb / 255;
	});
	const rgbMax = Math.max(numRgbZeroOne[0], numRgbZeroOne[1], numRgbZeroOne[2]);
	const rgbMin = Math.min(numRgbZeroOne[0], numRgbZeroOne[1], numRgbZeroOne[2]);
	const deltaMaxMin = rgbMax - rgbMin;

	//Hue calc
	let hue;
	if (deltaMaxMin == 0) {
		hue = 0;
	} else if (rgbMax == numRgbZeroOne[0]) {
		hue = (((numRgbZeroOne[1] - numRgbZeroOne[2]) / deltaMaxMin) % 6) * 60;
	} else if (rgbMax == numRgbZeroOne[1]) {
		hue = (((numRgbZeroOne[2] - numRgbZeroOne[0]) / deltaMaxMin) + 2) * 60;
	} else if (rgbMax == numRgbZeroOne[2]) {
		hue = (((numRgbZeroOne[0] - numRgbZeroOne[1]) / deltaMaxMin) + 4) * 60;
	}

	if(hue<0){
		hue += 360;
	}

	let saturation;
	rgbMax == 0 ? saturation = 0 : saturation = deltaMaxMin / rgbMax;

	value = rgbMax;

	let arrayHsvFormatado = new Array();
	arrayHsvFormatado.push(hue.toFixed(0) + '°');
	arrayHsvFormatado.push((saturation*100).toFixed(2) +'%');
	arrayHsvFormatado.push((value*100).toFixed(2) + '%');
	return arrayHsvFormatado;
}

function hsvToRgb(arrayHsv){
	const hue = arrayHsv[0];
	const saturation = arrayHsv[1]/100;
	const value = arrayHsv[2]/100;
	const chroma = value * saturation;
	const smallerRgbComponent = value - chroma;
	const auxCalc = chroma * (1 - Math.abs((hue/60)%2 - 1));
	let red,blue,green;

	if (hue >0 && hue < 60){
		red = chroma + smallerRgbComponent;
		green = auxCalc + smallerRgbComponent;
		blue = smallerRgbComponent;

	}else if(hue >=60 && hue < 120){
		red = auxCalc + smallerRgbComponent;
		green = chroma + smallerRgbComponent;
		blue = smallerRgbComponent;

	}else if(hue >=120 && hue < 180){
		red = smallerRgbComponent;
		green = chroma + smallerRgbComponent;
		blue = auxCalc + smallerRgbComponent;

	}else if(hue >=180 && hue < 240){
		red = smallerRgbComponent;
		green = auxCalc + smallerRgbComponent;
		blue = chroma + smallerRgbComponent;

	}
	else if(hue >=240 && hue < 300){
		red = auxCalc + smallerRgbComponent;
		green = smallerRgbComponent;
		blue = chroma + smallerRgbComponent;

	}else if(hue >=300 && hue < 360){
		red = chroma + smallerRgbComponent;
		green = smallerRgbComponent;
		blue = auxCalc + smallerRgbComponent;
		//console.log(`${red},${green},${blue}`);

	}else {
		red = smallerRgbComponent;
		green = smallerRgbComponent;
		blue = smallerRgbComponent;

	}
	RgbZeroOne = [red,green,blue];
	const RgbZeroTo255 = RgbZeroOne.map((color) =>{
		return (color * 255).toFixed(0);
	});
	console.log(RgbZeroTo255);
	return `(${RgbZeroTo255})`;

}

function transformNumber(value) {
	const x = value.map(e => {
		return Number(e)
	})
	return x
}

function hexToRgb(hex) {
	const r = hex.slice(1, 3);
	const g = hex.slice(3, 5);
	const b = hex.slice(5, 7);
	const respR = parseInt(r, 16);
	const respG = parseInt(g, 16);
	const respB = parseInt(b, 16);
	return `(${respR}, ${respG}, ${respB})`
}
// ----------Conversores------------




// -----------input -----------------



// adiciona virgulas e parenteses no input
function chageValue(id, conversor, maxLength) {
	const name = this.getValue(id);
	if ('rgb' === id) {
		changeIf(name, 0, '(', 'front')
		changeIf(name, 4, ',', 'back')
		changeIf(name, 8, ',', 'back')
		changeIf(name, 12, ')', 'back')
		console.log('passou');
	}
	if ('cmy' === id) {
		changeIf(name, 0, '(', 'front')
		changeIf(name, 2, '.', 'back')
		changeIf(name, 9, ', ', 'back')
		changeIf(name, 12, '.', 'back')
		changeIf(name, 19, ', ', 'back')
		changeIf(name, 22, '.', 'back')
		changeIf(name, 29, ')', 'back')
	}
	if ('hex' === id) {
		changeIf(name, 0, '#', 'front')
	}
	if ('hsv' === id) {
		changeIf(name, 0, '(', 'front')
		changeIf(name, 4, '°', 'back')
		changeIf(name, 5, ', ', 'back')
		changeIf(name, 10, '%', 'back')
		changeIf(name, 11, ', ', 'back')
		changeIf(name, 16, '%', 'back')
		changeIf(name, 17, ')', 'back')
	}
	if(name.value.length === maxLength) {
		mainConverter(id, conversor);
	}
}


function changeIf(element, number, concat, local) {
	if (local === 'front') {
		if (element.value.length === number) {
			element.value = concat + element.value;
		}
	}
	if (local === 'back') {
		if (element.value.length === number) {
			element.value = element.value + concat;
		}
	}
}

function focusExemple(id, text) {
	getValue(`textEx${id}`).innerHTML = `EX: ${text}`;
}

function exitExemple(id) {
	getValue(`textEx${id}`).innerHTML = "";
}



// -----------input -----------------


