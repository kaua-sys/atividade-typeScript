import { listarAlunos } from "./cadastro.js"

// MONTA A TELA DOS ALUNOS
const montaTelaAlunos = () => {

    const sectionAlunos = document.querySelector("#lista-alunos") as HTMLDivElement

    sectionAlunos.innerHTML = ""

    const alunos = listarAlunos() || []

    alunos.forEach((elem, i) => {

        const sectionAluno = document.createElement("section")
        sectionAluno.setAttribute("class", "card-aluno")

        const h2Nome = document.createElement("h2")
        h2Nome.innerHTML = elem.nome

        const pMatricula = document.createElement("p")
        pMatricula.innerHTML = `Matrícula: ${elem.matricula}`

        const pTurma = document.createElement("p")
        pTurma.innerHTML = `Turma: ${elem.turma}`

        sectionAluno.appendChild(h2Nome)
        sectionAluno.appendChild(pMatricula)
        sectionAluno.appendChild(pTurma)

        sectionAlunos.appendChild(sectionAluno)

    })

}

montaTelaAlunos()