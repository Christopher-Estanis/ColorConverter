// Função principar para pegar os valores, verificar e converter
function mainConverter(id, conversor) {
    const colorValue = getValue(id).value;
    const arrayVerif = colorValue.replace(/[)( ]/g, "").split(",");
    const rgbVerif = verificationRgb(arrayVerif, conversor);
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
        changeColorEx(id, y)
        const arrayHex = rgbToHex(arrayRgb);
        writeResp(id, arrayHex, "Hex");
    }
    if (conversor === 6) {
        const stringRgb = hexToRgb(colorValue);
        const arrayRgb = stringRgb.replace(/[)( ]/g, "").split(",");
        const arrayCmy = rgbToCmy(arrayRgb);
        writeResp(id, arrayCmy, "CMY");
        changeColorEx(id, stringRgb)
    }
}

function writeResp(id, resp, cor) {
    return getValue(`resultado${id}`).innerHTML = `${cor} = ${resp}`
}

// função para pegar o id
function getValue(e) {
    return this.document.getElementById(e);
}

function changeColorEx(id, color) {
    const typeColor = id.replace("'", "")
    document.getElementById(`colorEx${typeColor}`).style.backgroundColor = `RGB${color}`
}



// ----------Verificações-----------
// Função para verificar se o array é menor que zero, maior que 255 ou contem letras (RGB)
function verificationRgb(value, numb) {
    console.log(value);
    let erro = false;
    value.forEach(e => {
        if (e === "000") { return }
        else if (e === "") {
            alert(`ERRO: Você não escreveu um dos valores.`)
            return erro = true;
        } else if (!Number(e)) {
            alert(`ERRO: O valor ${e} contém uma letra.`);
            return erro = true;
        } else if (numb === 1 || 3) {
            if (e > 255 || e < 0) {
                alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
                return erro = true;
            }
        } else if (numb === 2 || 5) {
            if (e > 1 || e < 0) {
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
        return `${test}`;
    })
    return novoArrayRgb;
}

function rgbToHex(value) {
    const numbRgb = transformNumber(value);
    const hexR = numbRgb[1].toString(16);
    const hexG = numbRgb[2].toString(16);
    const hexB = numbRgb[1].toString(16);
    return `#${hexR}${hexG}${hexB}`
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
function chageValue(id, conversor) {
    const name = this.getValue(id);
    if (conversor === 1) {
        chageIf(name, 0, '(', 'front')
        chageIf(name, 12, ')', 'back')
        chageIf(name, 4, ',', 'back')
        chageIf(name, 8, ',', 'back')
    }
    if (conversor === 2) {
        chageIf(name, 0, '(', 'front')
        chageIf(name, 29, ')', 'back')
        chageIf(name, 2, '.', 'back')
        chageIf(name, 9, ', ', 'back')
        chageIf(name, 12, '.', 'back')
        chageIf(name, 19, ', ', 'back')
        chageIf(name, 22, '.', 'back')
    }
    if (conversor === 4) {
        chageIf(name, 0, '#', 'front')
    }
}


function chageIf(element, number, concat, local) {
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

function focusExemple(id) {
    getValue(`textEx${id}`).innerHTML = "Exemplo: (255,255,255)";
}

function exitExemple(id) {
    getValue(`textEx${id}`).innerHTML = "";
}

// -----------input -----------------