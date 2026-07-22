interface Aluno {
    nome: string;
    matricula: number;
    turma: string;
    turno: string;
}
declare function cadastrarAluno(nome: string, matricula: number, turma: string, turno: string): void;
declare function listarAlunos(): Aluno[];
export { cadastrarAluno, listarAlunos };
//# sourceMappingURL=cadastro.d.ts.map