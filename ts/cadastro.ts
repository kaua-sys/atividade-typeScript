
// PEGA O FORMULÁRIO

const formulario = document.getElementById("cadastro-aluno") as HTMLFormElement;


// CRIANDO OS ELEMENTOS DO ARRAY ALUNO
interface Aluno {
    nome: string;
    matricula: number;
    turma: string;
    turno: string;
}


// CRIANDO O ARRAY ALUNO
let alunos: Aluno[] = [];


// FUNÇÃO PARA CADASTRAR ALUNO

function cadastrarAluno(nome: string, matricula: number, turma: string, turno: string): void {


    const novoAluno: Aluno = {
        nome,
        matricula,
        turma,
        turno 
    };

    alunos.push(novoAluno);
    console.log("Aluno cadastrado com sucesso!");
}

function listarAlunos(): void {
    const lista = document.getElementById("lista-alunos") as HTMLDivElement;
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

    const nome = (document.getElementById("nome") as HTMLInputElement).value.trim();
    const matricula = Number((document.getElementById("matricula") as HTMLInputElement).value);
    const turma = (document.getElementById("turma") as HTMLInputElement).value.trim();
    const turno = (document.getElementById("turno") as HTMLInputElement).value;

    if (nome === "" || turma === "" || matricula === 0 || turno === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Passa o turno como 4º parâmetro
    cadastrarAluno(nome, matricula, turma, turno);
    listarAlunos();
    formulario.reset();
});
