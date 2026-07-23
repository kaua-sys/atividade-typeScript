// Apenas exibe uma mensagem no console do navegador.
// Muito usado para testes e depuração (debug).
console.log("Sistema iniciado")

// --------------------------------------------------------------------
// PEGA ELEMENTOS DO HTML
// --------------------------------------------------------------------

// "const" cria uma constante, ou seja, a variável não pode receber outro valor.
// "document" representa toda a página HTML.
// "getElementById()" procura um elemento pelo atributo id.
// "as HTMLFormElement" é uma asserção de tipo (Type Assertion),
// informando ao TypeScript que esse elemento é um formulário.
const formulario = document.getElementById("cadastro-aluno") as HTMLFormElement

// O mesmo acontece aqui, dizendo que o elemento encontrado é um input.
const pesquisa = document.getElementById("campo-pesquisa") as HTMLInputElement

// --------------------------------------------------------------------
// INTERFACE
// --------------------------------------------------------------------

// Interface é um contrato.
// Ela define como deve ser um objeto do tipo Aluno.
// Não cria objetos, apenas define sua estrutura.
interface Aluno {
    nome: string
    matricula: number
    turma: string
    turno: string
}

// --------------------------------------------------------------------
// VARIÁVEIS
// --------------------------------------------------------------------

// "let" permite alterar o valor da variável durante o programa.

// "Aluno[]" significa um vetor (array) que aceita apenas objetos do tipo Aluno.
let alunos: Aluno[] = []

// "number | null" é uma Union Type.
// Essa variável pode ser um número ou null.
let indiceEdicao: number | null = null

// --------------------------------------------------------------------
// LOCALSTORAGE
// --------------------------------------------------------------------

// ": void" significa que essa função não retorna nenhum valor.
function salvarAlunos(): void {

    // localStorage só salva texto.
    // JSON.stringify() transforma o array em uma String JSON.
    localStorage.setItem("alunos", JSON.stringify(alunos))
}

function carregarAlunos(): void {

    // Busca os dados salvos.
    const dados = localStorage.getItem("alunos")

    // Verifica se existe algum dado salvo.
    if (dados) {

        // JSON.parse() faz o processo inverso:
        // transforma a String novamente em um array de objetos.
        alunos = JSON.parse(dados)
    }
}

// --------------------------------------------------------------------
// CADASTRO
// --------------------------------------------------------------------

function cadastrarAluno(
    nome: string,
    matricula: number,
    turma: string,
    turno: string
): void {

    // find() percorre o vetor procurando o primeiro elemento
    // que satisfaça a condição.
    const existe = alunos.find(aluno => aluno.matricula === matricula)

    // Se encontrar um aluno com a mesma matrícula,
    // interrompe a função usando "return".
    if (existe) {
        alert("Matrícula já cadastrada!")
        return
    }

    // Cria um objeto seguindo exatamente a interface Aluno.
    const novoAluno: Aluno = {
        nome,
        matricula,
        turma,
        turno
    }

    // push() adiciona o objeto no final do vetor.
    alunos.push(novoAluno)

    salvarAlunos()
}

// Retorna um vetor de Alunos.
// O retorno é indicado por ": Aluno[]".
function listarAlunos(): Aluno[] {
    return alunos
}

// --------------------------------------------------------------------
// EXIBIR ALUNOS
// --------------------------------------------------------------------

function mostrarAlunos(filtro: string = ""): void {

    // Procura a div onde os cards serão inseridos.
    const lista = document.getElementById("lista-alunos") as HTMLDivElement

    // Limpa os cards antigos antes de criar novos.
    lista.innerHTML = ""

    // filter() cria um novo vetor apenas com os alunos
    // cujo nome contém o texto digitado.

    // toLowerCase() transforma tudo em minúsculo,
    // evitando diferença entre maiúsculas e minúsculas.

    // includes() verifica se um texto contém outro.

    // sort() ordena o vetor.

    // localeCompare() compara Strings corretamente,
    // respeitando o idioma e os acentos.
    const alunosFiltrados = alunos
        .filter(aluno => aluno.nome.toLowerCase().includes(filtro.toLowerCase()))
        .sort((a, b) => a.nome.localeCompare(b.nome))

    // forEach() percorre todos os elementos do vetor.
    alunosFiltrados.forEach((aluno) => {

        // findIndex() retorna a posição do aluno no vetor.
        const indice = alunos.findIndex(a => a.matricula === aluno.matricula)

        // Cria dinamicamente uma div.
        const card = document.createElement("div")

        // Define uma classe CSS.
        card.className = "card"

        // Template String permite inserir variáveis
        // usando ${ } dentro de um texto.
        card.innerHTML = `
            <h3>${aluno.nome}</h3>
            <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
            <p><strong>Turma:</strong> ${aluno.turma}</p>
            <p><strong>Turno:</strong> ${aluno.turno}</p>

            <button class="editar">Editar</button>
            <button class="excluir">Excluir</button>
        `

        // querySelector() procura elementos dentro do card.
        const btnEditar = card.querySelector(".editar") as HTMLButtonElement
        const btnExcluir = card.querySelector(".excluir") as HTMLButtonElement

        // addEventListener() registra um evento.
        // A função passada é chamada de callback.
        btnEditar.addEventListener("click", () => {

            // Preenche o formulário com os dados do aluno.
            (document.getElementById("nome") as HTMLInputElement).value = aluno.nome

            // toString() converte o número para texto,
            // pois o input trabalha com Strings.
            ;(document.getElementById("matricula") as HTMLInputElement).value = aluno.matricula.toString()

            ;(document.getElementById("turma") as HTMLSelectElement).value = aluno.turma
            ;(document.getElementById("turno") as HTMLSelectElement).value = aluno.turno

            // Guarda o índice do aluno que será editado.
            indiceEdicao = indice
        })

        btnExcluir.addEventListener("click", () => {

            // splice() remove elementos do vetor.
            // Primeiro parâmetro = posição.
            // Segundo parâmetro = quantidade de elementos removidos.
            alunos.splice(indice, 1)

            salvarAlunos()

            mostrarAlunos(pesquisa.value)
        })

        // Adiciona o card na div principal.
        lista.appendChild(card)
    })

    console.log("Alunos cadastrados:", alunos)
}

// --------------------------------------------------------------------
// PESQUISA
// --------------------------------------------------------------------

// O evento "input" acontece toda vez que o usuário digita.
// Assim a pesquisa acontece em tempo real.
pesquisa.addEventListener("input", () => {
    mostrarAlunos(pesquisa.value)
})

// --------------------------------------------------------------------
// FORMULÁRIO
// --------------------------------------------------------------------

// O evento "submit" acontece quando o formulário é enviado.
formulario.addEventListener("submit", function (event) {

    // Impede que a página seja recarregada.
    event.preventDefault()

    // trim() remove espaços no início e no fim da String.
    const nome = (document.getElementById("nome") as HTMLInputElement).value.trim()

    // Number() converte texto para número.
    const matricula = Number((document.getElementById("matricula") as HTMLInputElement).value)

    const turma = (document.getElementById("turma") as HTMLSelectElement).value
    const turno = (document.getElementById("turno") as HTMLSelectElement).value

    // "===" compara valor e tipo.
    // "||" significa OU.
    if (nome === "" || turma === "" || matricula === 0) {
        alert("Preencha todos os campos!")
        return
    }

    // Se indiceEdicao tiver um número,
    // significa que estamos editando um aluno.
    if (indiceEdicao !== null) {

        // Atualiza o objeto existente.
        alunos[indiceEdicao] = {
            nome,
            matricula,
            turma,
            turno
        }

        indiceEdicao = null

        salvarAlunos()

    } else {

        // Caso contrário, cria um novo aluno.
        cadastrarAluno(nome, matricula, turma, turno)
    }

    mostrarAlunos(pesquisa.value)

    // Limpa os campos do formulário.
    formulario.reset()
})

// --------------------------------------------------------------------
// INICIALIZAÇÃO
// --------------------------------------------------------------------

// Primeiro carrega os dados salvos.
carregarAlunos()

// Depois mostra os alunos na tela.
mostrarAlunos()

// export permite que essas funções sejam utilizadas
// em outros arquivos através do import.
export { cadastrarAluno, listarAlunos }