function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const escolhas = document.getElementById("escolhas");
const notas = escolhas.querySelectorAll("button");
const notify = document.getElementById("acertou");

function showNotify() {
    notify.style.display = "flex";

    setTimeout(() => {
        notify.style.display = "none";

    }, 2000);
}

const list = {
    line1: "mi",
    line2: "sol",
    line3: "si",
    line4: "re",
    line5: "fa",

    space1: "fa",
    space2: "la",
    space3: "do",
    space4: "mi"
};

let resposta;
let ultimaJogada = null;
function gerar() {
    let linha;
    let espaco;
    let escolha;
    let jogada;

    // Gera até ser diferente da anterior
    do {
        linha = random(1, 5);
        espaco = random(1, 4);
        escolha = random(1, 2) === 1 ? "linha" : "espaco";

        jogada = `${escolha}${escolha === "linha" ? linha : espaco}`;
    } while (jogada === ultimaJogada);

    ultimaJogada = jogada;

    // Remove nota anterior
    document.querySelectorAll(".nota").forEach(nota => nota.remove());

    if (escolha === "linha") {
        let el = document.querySelector(`#linha${linha} > div`);

        el.innerHTML = `<div class="nota"></div>`;

        resposta = list[`line${linha}`];
    }

    if (escolha === "espaco") {
        let el = document.querySelector(`#espaco${espaco} > div`);

        el.innerHTML = `<div class="nota"></div>`;

        resposta = list[`space${espaco}`];
    }

    console.log("Jogada:", jogada);
    console.log("Resposta:", resposta);

    notas.forEach((nota) => {
        nota.style.backgroundColor = "";
    });
}
notas.forEach(nota => {
    nota.addEventListener("click", () => {
        if (nota.value === resposta) {
            console.log("Acertou!");


            notas.forEach((nota) => {
                nota.style.backgroundColor = ""
            });

            showNotify();

            setTimeout(() => {
                gerar();
            }, 1000);
        } else {
            notas.forEach((nota) => {
                nota.style.backgroundColor = ""
            });
            nota.style.backgroundColor = "red"
            setTimeout(() => {
                nota.style.backgroundColor = "orange"
            }, 1000);
        }
    });
});

gerar();