// Função principar para pegar os valores, verificar e converter
function mainConverter(id, conversor) {
    const colorValue = getValue(id).value;
    const arrayVerif = colorValue.replace(/[)( ]/g, "").split(",");
    const rgbVerif = verificationRgb(arrayVerif, conversor);
    if (rgbVerif === true) { return }
    
    if (conversor === 1) {
        const arrayCmy = rgbToCmy(arrayVerif);
        writeResp(id, arrayCmy, "CMY");
        chageColorEx(id, colorValue);
    }
    if (conversor === 2) {
        const arrayRgb = cmyToRgb(arrayVerif);
        writeResp(id, arrayRgb, "RGB");
        const x = arrayRgb.toString()
        const y = `(${x})`
        chageColorEx(id, y)
        console.log(y);
    }
    // getValue(`resultado${id}`).innerHTML = `CMY = ${arrayCmy}`
}

function writeResp(id, resp, cor) {
    return getValue(`resultado${id}`).innerHTML = `${cor} = ${resp}`
}

// função para pegar o id
function getValue(e) {
    return this.document.getElementById(e);
}

function chageColorEx(id, color) {
    const typeColor = id.replace("'", "")
    document.getElementById(`colorEx${typeColor}`).style.backgroundColor = `RGB${color}`
}



// ----------Verificações-----------
// Função para verificar se o array é menor que zero, maior que 255 ou contem letras (RGB)
function verificationRgb(value, numb) {
    let erro = false;
    value.forEach(e => {
        if (e === "000" || "0.000000") { return }
        else if (e === "") { alert(`ERRO: Você não escreveu um dos valores.`) 
        return erro = true;
        } else if (!Number(e)) { alert(`ERRO: O valor ${e} contém uma letra.`);
            return erro = true;
        } else if (numb === 1) { if (e > 255 || e < 0) {
                alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
                return erro = true;
            }
        } else if (numb === 2) { if (e > 1 || e < 0 ) {
                alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
                return erro = true;
        }}
    });
    return erro;
}
// ----------Verificações-----------        




// ----------Conversores------------
function rgbToCmy(value) {
    const novoArrayCmy = value.map(e => {
        const test = 1 - (e / 255);
        const resposta = parseFloat(test.toFixed(5))
        return ` ${resposta}`
    })
    return novoArrayCmy;
}

function cmyToRgb(value) {
    const novoArrayRgb = value.map(e => {
        const test = (1 - e) * 255;
        return `${test}`
    })
    return novoArrayRgb
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
    if (conversor === 2)  {
        chageIf(name, 0, '(', 'front')
        chageIf(name, 29, ')', 'back')
        chageIf(name, 2, '.', 'back')
        chageIf(name, 9, ', ', 'back')
        chageIf(name, 12, '.', 'back')
        chageIf(name, 19, ', ', 'back')
        chageIf(name, 22, '.', 'back')
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

// -----------input -----------------