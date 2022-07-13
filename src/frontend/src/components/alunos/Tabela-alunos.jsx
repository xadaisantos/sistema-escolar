import React from 'react'
import Aluno from './Aluno'

const TabelaAlunos = ({ alunos, getAlunos }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>DATA DE NASCIMENTO</th>
                    <th>EMAIL</th>
                    <th>TELEFONE</th>
                    <th>GÊNERO</th>
                    <th>OPÇÕES</th>
                </tr>
            </thead>
            <tbody>
                { (alunos && alunos.length > 0) ? alunos.map((aluno) => { return <Aluno getAlunos={getAlunos} key={aluno.id} aluno={aluno} />}) : <tr><td colSpan="7">Nenhum aluno cadastrado.</td></tr>}
            </tbody>
        </table>
    );
}

export default TabelaAlunos