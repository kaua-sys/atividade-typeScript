// Interface do aluno
interface Aluno {
    nome: string; 
    matricula: number;
    turma: string;
}

// CRIA O ARRAY ALNO
let alunos: Aluno[] = [];

// FUNÇÃO CADASTRO
function cadastrarAluno(nome: string, matricula: number, turma: string): void {

    // VERIFICA SE A MATRICULA JA EXISTE (PARA NÃO TER ALUNO DUPLICADO)
    const existe = alunos.find(aluno => aluno.matricula === matricula);

    if (existe) {
        console.log("Matrícula já cadastrada");
        return;
    }

    const novoAluno: Aluno = {
        nome,
        matricula,
        turma
    };

    alunos.push(novoAluno);

    console.log("Aluno cadastrado com sucesso");
}

// FUNÇÃO LISTAR
function listarAlunos(): void {

    if (alunos.length === 0) {
        console.log("Nenhum aluno cadastrado.");
        return;
    }

    console.log("===== LISTA DE ALUNOS =====");

    alunos.forEach((aluno, index) => {

        console.log(`${index + 1} Nome: ${aluno.nome} Matrícula: ${aluno.matricula} Turma: ${aluno.turma} -------------------------`);

    });
}