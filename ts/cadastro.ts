console.log("Sistema iniciado")

// PEGA O FORMULÁRIO
const formulario = document.getElementById("cadastro-aluno") as HTMLFormElement

// INTERFACE
interface Aluno {
    nome: string
    matricula: number
    turma: string
}

// ARRAY DE ALUNOS
let alunos: Aluno[] = []

// CONTROLA A EDIÇÃO
let indiceEdicao: number | null = null

// CADASTRAR ALUNO
function cadastrarAluno(nome: string, matricula: number, turma: string): void {

    const existe = alunos.find(aluno => aluno.matricula === matricula)

    if (existe) {
        alert("Matrícula já cadastrada!")
        return
    }

    const novoAluno: Aluno = {
        nome,
        matricula,
        turma
    }

    alunos.push(novoAluno)
}

// LISTAR ALUNOS
function listarAlunos(): Aluno[] {
    return alunos
}

// MOSTRAR OS CARDS
function mostrarAlunos(): void {

    const lista = document.getElementById("lista-alunos") as HTMLDivElement

    lista.innerHTML = ""

    alunos.forEach((aluno, indice) => {

        const card = document.createElement("div")
        card.className = "card"

        card.innerHTML = `
            <h3>${aluno.nome}</h3>
            <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
            <p><strong>Turma:</strong> ${aluno.turma}</p>

            <button class="editar">Editar</button>
            <button class="excluir">Excluir</button>
        `

        const btnEditar = card.querySelector(".editar") as HTMLButtonElement
        const btnExcluir = card.querySelector(".excluir") as HTMLButtonElement

        btnEditar.addEventListener("click", () => {

            (document.getElementById("nome") as HTMLInputElement).value = aluno.nome,
            (document.getElementById("matricula") as HTMLInputElement).value = aluno.matricula.toString(),
            (document.getElementById("turma") as HTMLSelectElement).value = aluno.turma

            indiceEdicao = indice

        })

        btnExcluir.addEventListener("click", () => {

            alunos.splice(indice, 1)
            mostrarAlunos()

        })

        lista.appendChild(card)

    })
}

// EVENTO DO FORMULÁRIO
formulario.addEventListener("submit", function (event) {

    event.preventDefault()

    const nome = (document.getElementById("nome") as HTMLInputElement).value.trim()

    const matricula = Number(
        (document.getElementById("matricula") as HTMLInputElement).value
    )

    const turma = (document.getElementById("turma") as HTMLSelectElement).value

    if (nome === "" || turma === "" || matricula === 0) {
        alert("Preencha todos os campos!")
        return
    }

    if (indiceEdicao !== null) {

        alunos[indiceEdicao] = {
            nome,
            matricula,
            turma
        }

        indiceEdicao = null

    } else {

        cadastrarAluno(nome, matricula, turma)

    }

    mostrarAlunos()

    formulario.reset()

})

console.log(alunos)

export { cadastrarAluno, listarAlunos }