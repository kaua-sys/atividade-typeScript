console.log("Sistema iniciado")

// PEGA O FORMULÁRIO
const formulario = document.getElementById("cadastro-aluno") as HTMLFormElement
const pesquisa = document.getElementById("campo-pesquisa") as HTMLInputElement

// INTERFACE
interface Aluno {
    nome: string
    matricula: number
    turma: string
    turno: string
}

// ARRAY DE ALUNOS E CONTROLE DE EDIÇÃO
let alunos: Aluno[] = []
let indiceEdicao: number | null = null

// --- FUNÇÕES DE PERSISTÊNCIA (LOCALSTORAGE) ---

function salvarAlunos(): void {
    localStorage.setItem("alunos", JSON.stringify(alunos))
}

function carregarAlunos(): void {
    const dados = localStorage.getItem("alunos")
    if (dados) {
        alunos = JSON.parse(dados)
    }
}

// --- FUNÇÕES DE NEGÓCIO ---

function cadastrarAluno(nome: string, matricula: number, turma: string, turno: string): void {
    const existe = alunos.find(aluno => aluno.matricula === matricula)

    if (existe) {
        alert("Matrícula já cadastrada!")
        return
    }

    const novoAluno: Aluno = {
        nome,
        matricula,
        turma,
        turno
    }

    alunos.push(novoAluno)
    salvarAlunos()
}

function listarAlunos(): Aluno[] {
    return alunos
}

// MOSTRAR OS CARDS NA TELA
function mostrarAlunos(filtro: string = ""): void {
    const lista = document.getElementById("lista-alunos") as HTMLDivElement
    lista.innerHTML = ""

    const alunosFiltrados = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(filtro.toLowerCase())
    )

    alunosFiltrados.forEach((aluno) => {
        const indice = alunos.findIndex(a => a.matricula === aluno.matricula)

        const card = document.createElement("div")
        card.className = "card"

        card.innerHTML = `
            <h3>${aluno.nome}</h3>
            <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
            <p><strong>Turma:</strong> ${aluno.turma}</p>
            <p><strong>Turno:</strong> ${aluno.turno}</p>

            <button class="editar">Editar</button>
            <button class="excluir">Excluir</button>
        `

        const btnEditar = card.querySelector(".editar") as HTMLButtonElement
        const btnExcluir = card.querySelector(".excluir") as HTMLButtonElement

        btnEditar.addEventListener("click", () => {
            (document.getElementById("nome") as HTMLInputElement).value = aluno.nome
            ;(document.getElementById("matricula") as HTMLInputElement).value = aluno.matricula.toString()
            ;(document.getElementById("turma") as HTMLSelectElement).value = aluno.turma
            ;(document.getElementById("turno") as HTMLSelectElement).value = aluno.turno

            indiceEdicao = indice
        })

        btnExcluir.addEventListener("click", () => {
            alunos.splice(indice, 1)
            salvarAlunos()
            mostrarAlunos(pesquisa.value)
        })

        lista.appendChild(card)
    })

    console.log("Alunos cadastrados:", alunos)
}

// EVENTO DA PESQUISA
pesquisa.addEventListener("input", () => {
    mostrarAlunos(pesquisa.value)
})

// --- EVENTO DO FORMULÁRIO ---

formulario.addEventListener("submit", function (event) {
    event.preventDefault()

    const nome = (document.getElementById("nome") as HTMLInputElement).value.trim()
    const matricula = Number((document.getElementById("matricula") as HTMLInputElement).value)
    const turma = (document.getElementById("turma") as HTMLSelectElement).value
    const turno = (document.getElementById("turno") as HTMLSelectElement).value

    if (nome === "" || turma === "" || matricula === 0) {
        alert("Preencha todos os campos!")
        return
    }

    if (indiceEdicao !== null) {
        alunos[indiceEdicao] = {
            nome,
            matricula,
            turma,
            turno
        }

        indiceEdicao = null
        salvarAlunos()
    } else {
        cadastrarAluno(nome, matricula, turma, turno)
    }

    mostrarAlunos(pesquisa.value)
    formulario.reset()
})

// INICIALIZAÇÃO
carregarAlunos()
mostrarAlunos()

export { cadastrarAluno, listarAlunos }