String.prototype.replace2 = function (rep1, rep2, troca) {
    const elementoNovo = this.replace(`${rep1}`, `${troca}`).replace(`${rep2}`, `${troca}`);
    return elementoNovo;
}

// Função principar para pegar os valores, verificar e converter
function mainConverter(id, conversor) {
    const colorValue = getValue(id).value;
    const arrayVerif = colorValue.replace2("(", ")", "").split(",");
    if (conversor === 1) {
        const numberVerif = nbmVerifRgb(arrayVerif);
        if (numberVerif === true) { return }
        const arrayCmy = converterToCmy(arrayVerif)
        writeResp(id, arrayCmy, "CMY")
    }
    chageColorEx(id, colorValue)
    // getValue(`resultado${id}`).innerHTML = `CMY = ${arrayCmy}`
}

function writeResp(id, resp, cor) {
    return getValue(`resultado${id}`).innerHTML = `${cor} = ${resp}`
}

// função para pegar o id
function getValue(e) {
    return this.document.getElementById(e);
}

// Função para verificar se o array é menor que zero, maior que 255 ou contem letras (RGB)
function nbmVerifRgb(value) {
    let erro = false;
    value.forEach(e => {

        if (e === "000") { return }
        else if (e === "") {
            alert(`ERRO: Você não escreveu um dos valores.`);
            return erro = true;
        } else if (!Number(e)) {
            alert(`ERRO: O valor ${e} contém uma letra.`);
            return erro = true;
        } else if (e > 255 || e < 0) {
            alert(`ERRO: O valor ${e} não condiz com o modelo de cor.`);
            return erro = true;
        }
    });
    return erro;
}


function converterToCmy(value) {
    const novoArrayCmy = value.map(e => {
        const test = 1 - (e / 255);
        const resposta = parseFloat(test.toFixed(5))
        return ` ${resposta}`
    })
    return novoArrayCmy;
}

function chageColorEx(id, color) {
    const typeColor = id.replace("'", "")
    document.getElementById(`colorEx${typeColor}`).style.backgroundColor = `${typeColor}${color}`

}


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