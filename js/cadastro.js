"use strict";
// PEGA O FORMULÁRIO
const formulario = document.getElementById("cadastro-aluno");
// CRIANDO O ARRAY ALUNO
let alunos = [];
// FUNÇÃO PARA CADASTRAR ALUNO
function cadastrarAluno(nome, matricula, turma, turno) {
    const novoAluno = {
        nome,
        matricula,
        turma,
        turno
    };
    alunos.push(novoAluno);
    console.log("Aluno cadastrado com sucesso!");
}
function listarAlunos() {
    const lista = document.getElementById("lista-alunos");
    lista.innerHTML = "";
    if (alunos.length === 0) {
        lista.innerHTML = "<p>Nenhum aluno cadastrado.</p>";
        return;
    }
    alunos.forEach((aluno, index) => {
        lista.innerHTML += `
            <div class="card-aluno">
                <h3>Aluno ${index + 1}</h3>
                <p><strong>Nome:</strong> ${aluno.nome}</p>
                <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
                <p><strong>Turma:</strong> ${aluno.turma}</p>
                <p><strong>Turno:</strong> ${aluno.turno}</p> <!-- <-- Adicionado -->
                <hr>
            </div>
        `;
    });
}
// EVENTO DO FORMULÁRIO
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const matricula = Number(document.getElementById("matricula").value);
    const turma = document.getElementById("turma").value.trim();
    const turno = document.getElementById("turno").value; // <-- Captura o turno
    if (nome === "" || turma === "" || matricula === 0 || turno === "") {
        alert("Preencha todos os campos!");
        return;
    }
    // Passa o turno como 4º parâmetro
    cadastrarAluno(nome, matricula, turma, turno);
    listarAlunos();
    formulario.reset();
});
