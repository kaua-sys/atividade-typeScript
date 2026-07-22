console.log("Sistema iniciado");
// PEGA O FORMULÁRIO
const formulario = document.getElementById("cadastro-aluno");
// ARRAY DE ALUNOS E CONTROLE DE EDIÇÃO
let alunos = [];
let indiceEdicao = null;
// --- FUNÇÕES DE PERSISTÊNCIA (LOCALSTORAGE) ---
function salvarAlunos() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
}
function carregarAlunos() {
    const dados = localStorage.getItem("alunos");
    if (dados) {
        alunos = JSON.parse(dados);
    }
}
// --- FUNÇÕES DE NEGÓCIO ---
function cadastrarAluno(nome, matricula, turma, turno) {
    const existe = alunos.find(aluno => aluno.matricula === matricula);
    if (existe) {
        alert("Matrícula já cadastrada!");
        return;
    }
    const novoAluno = {
        nome,
        matricula,
        turma,
        turno
    };
    alunos.push(novoAluno);
    salvarAlunos();
}
function listarAlunos() {
    return alunos;
}
// MOSTRAR OS CARDS NA TELA
function mostrarAlunos() {
    const lista = document.getElementById("lista-alunos");
    lista.innerHTML = "";
    alunos.forEach((aluno, indice) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${aluno.nome}</h3>
            <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
            <p><strong>Turma:</strong> ${aluno.turma}</p>
            <p><strong>Turno:</strong> ${aluno.turno}</p>

            <button class="editar">Editar</button>
            <button class="excluir">Excluir</button>
        `;
        const btnEditar = card.querySelector(".editar");
        const btnExcluir = card.querySelector(".excluir");
        btnEditar.addEventListener("click", () => {
            document.getElementById("nome").value = aluno.nome;
            document.getElementById("matricula").value = aluno.matricula.toString();
            document.getElementById("turma").value = aluno.turma;
            document.getElementById("turno").value = aluno.turno;
            indiceEdicao = indice;
        });
        btnExcluir.addEventListener("click", () => {
            alunos.splice(indice, 1);
            salvarAlunos();
            mostrarAlunos();
        });
        lista.appendChild(card);
    });
    // Exibe no console a lista atualizada toda vez que os cards redesenham
    console.log("Alunos cadastrados:", alunos);
}
// --- EVENTO DO FORMULÁRIO ---
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const matricula = Number(document.getElementById("matricula").value);
    const turma = document.getElementById("turma").value;
    const turno = document.getElementById("turno").value;
    if (nome === "" || turma === "" || matricula === 0) {
        alert("Preencha todos os campos!");
        return;
    }
    if (indiceEdicao !== null) {
        alunos[indiceEdicao] = {
            nome,
            matricula,
            turma,
            turno
        };
        indiceEdicao = null;
        salvarAlunos();
    }
    else {
        cadastrarAluno(nome, matricula, turma, turno);
    }
    mostrarAlunos();
    formulario.reset();
});
// --- INICIALIZAÇÃO ---
// Carrega os dados salvos e renderiza na tela assim que o script abre
carregarAlunos();
mostrarAlunos();
export { cadastrarAluno, listarAlunos };
//# sourceMappingURL=cadastro.js.map