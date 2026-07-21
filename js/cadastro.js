"use strict";
console.log("Sistema iniciado");
// PEGA O FORMULÁRIO
const formulario = document.getElementById("cadastro-aluno");
// CRIANDO O ARRAY ALUNO
let alunos = [];
// FUNÇÃO PARA CADASTRAR ALUNO
function cadastrarAluno(nome, matricula, turma) {
    // Verifica se já existe um aluno com essa matrícula
    const existe = alunos.find(aluno => aluno.matricula === matricula);
    if (existe) {
        alert("Matrícula já cadastrada!");
        return;
    }
    // Cria o objeto do aluno
    const novoAluno = {
        nome,
        matricula,
        turma
    };
    // Adiciona ao array
    alunos.push(novoAluno);
    console.log("Aluno cadastrado com sucesso!");
}
// FUNÇÃO PARA LISTAR ALUNOS
function listarAlunos() {
    const lista = document.getElementById("lista-alunos");
    // Limpa a lista antes de mostrar novamente
    lista.innerHTML = "";
    if (alunos.length === 0) {
        lista.innerHTML = "<p>Nenhum aluno cadastrado.</p>";
        return;
    }
    alunos.forEach((aluno, index) => {
        lista.innerHTML += `
            <div>
                <h3>Aluno ${index + 1}</h3>

                <p><strong>Nome:</strong> ${aluno.nome}</p>

                <p><strong>Matrícula:</strong> ${aluno.matricula}</p>

                <p><strong>Turma:</strong> ${aluno.turma}</p>

                <hr>
            </div>
        `;
    });
}
// EVENTO DO FORMULÁRIO
formulario.addEventListener("submit", function (event) {
    // Impede o recarregamento da página
    event.preventDefault();
    // Pega os valores digitados
    const nome = document.getElementById("nome").value.trim();
    const matricula = Number(document.getElementById("matricula").value);
    const turma = document.getElementById("turma").value.trim();
    // Verifica se os campos foram preenchidos
    if (nome === "" || turma === "" || matricula === 0) {
        alert("Preencha todos os campos!");
        return;
    }
    // Cadastra o aluno
    cadastrarAluno(nome, matricula, turma);
    // Atualiza a lista
    listarAlunos();
    // Limpa os campos do formulário
    formulario.reset();
});
console.log(alunos);
//# sourceMappingURL=cadastro.js.map