import React from 'react'
import ModalEditarAluno from './Modal-editar-aluno';

const Aluno = ({ aluno, getAlunos }) => {
    const excluirAluno = id => {
        if ( !window.confirm("Você tem certeza que deseja excluir o aluno?") ){
            return false;
        }
        let url = `http://${window.location.hostname}:8088/api/alunos/${id}`
        let method = 'delete'
        let headers = { 'Content-Type': 'application/json' }
        fetch(url, {
            method: method,
            headers: headers
        }).then(res => {
            if (res.ok){
                res.json().then(data => {
                    alert(data)
                    getAlunos()
                })
            } else {
                res.json().then(error => {
                    throw new Error(error)
                })
            }
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <tr>
            <td>{aluno.id}</td>
            <td>{aluno.nome}</td>
            <td>{aluno.data_de_nascimento || ''}</td>
            <td>{aluno.email}</td>
            <td>{aluno.telefone}</td>
            <td>{aluno.genero}</td>
            <td>
                <ModalEditarAluno aluno={aluno} getAlunos={getAlunos} />
                <button className="btn btn-danger" onClick={excluirAluno.bind(this, aluno.id)} style={{width: "80px", marginBottom: "5px"}}>Excluir</button>
            </td>
        </tr>
    )
}

export default Aluno