import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalEditarAluno = ({ aluno, getAlunos }) => {
    const [alunoEdit, setAlunoEdit] = useState()
    const [visible, setVisible] = useState(false)
    const handleClose = () => {
        setVisible(false)
        setAlunoEdit(null)
    }
    const handleShow = () => setVisible(true)
    const ehVazio = campo => !campo
    const getAlunoParaEditar = () => {
        setAlunoEdit(aluno)
        handleShow()
    }
    const handleUpdateAluno = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let alunoEditado = {
            nome: document.getElementById('editarNome').value,
            data_de_nascimento: document.getElementById('editarData_de_nascimento').value,
            email: document.getElementById('editarEmail').value,
            telefone: document.getElementById('editarTelefone').value,
            genero: document.getElementById('editarGenero').value,
            id: document.getElementById('editarId').value
        }
        
        if ( ehVazio(alunoEditado.nome) ){
            alert('Preencha o campo "Nome".')
        } else if ( ehVazio(alunoEditado.email) ){
            alert('Preencha o campo "Email".')
        } else if ( !ehVazio(alunoEditado.data_de_nascimento) && !alunoEditado.data_de_nascimento.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) ){
            alert('Preencha o campo "Data de Nascimento" com uma data válida ou deixe-o em branco.')
        } else if ( !ehVazio(alunoEditado.telefone) && !alunoEditado.telefone.match(/^\d{8,11}$/) ){
            alert('Preencha o campo "Telefone" com um número válido ou deixe-o em branco. (Apenas números, mínimo 8 e máximo 11)')
        } else {
            return enviarDados(alunoEditado)
        }
    }

    const enviarDados = (dados) => {
        let url = `http://${window.location.hostname}:8088/api/alunos/${dados.id}`
        let method = 'PUT'
        let headers = { 'Content-Type': 'application/json' }
        let body = JSON.stringify(dados)
        fetch(url, {
            method: method,
            headers: headers,
            body: body
        }).then(res => {
            if (res.ok){
                res.json().then(data => {
                    alert(data)
                    getAlunos()
                    handleClose()
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
        <>
            <Button variant="primary" onClick={ () => { getAlunoParaEditar() } } className="btn btn-warning" style={{width: "80px", marginBottom: "5px", marginRight: "5px"}}>
                Editar
            </Button>

            <Modal show={visible} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Editar Aluno</Modal.Title></Modal.Header>
                <Modal.Body>
                    { alunoEdit ? 
                        <form className="form">
                            <input type="hidden" name="editarId" id="editarId" value={alunoEdit.id} />
                            <div>
                                <label htmlFor="editarNome">Nome: </label>
                                <input onChange={(event) => { setAlunoEdit({...alunoEdit, nome: event.target.value}) }} className="form-control" type="text" name="editarNome" id="editarNome" value={alunoEdit.nome} />
                            </div>
                            <div>
                                <label htmlFor="editarData_de_nascimento">Data de Nascimento: </label>
                                <input onChange={(event) => { setAlunoEdit({...alunoEdit, data_de_nascimento: event.target.value}) }} className="form-control" type="text" name="editarData_de_nascimento" id="editarData_de_nascimento" value={alunoEdit.data_de_nascimento} />
                            </div>
                            <div>
                                <label htmlFor="editarEmail">Email: </label>
                                <input onChange={(event) => { setAlunoEdit({...alunoEdit, email: event.target.value}) }} className="form-control" type="text" name="editarEmail" id="editarEmail" value={alunoEdit.email} />
                            </div>
                            <div>
                                <label htmlFor="editarTelefone">Telefone: </label>
                                <input onChange={(event) => { setAlunoEdit({...alunoEdit, telefone: event.target.value}) }} className="form-control" type="text" name="editarTelefone" id="editarTelefone" value={alunoEdit.telefone} />
                            </div>
                            <div>
                                <label htmlFor="editarGenero">Genero: </label>
                                <select onChange={(event) => { setAlunoEdit({...alunoEdit, genero: event.target.value}) }} className="form-control" name="editarGenero" id="editarGenero" value={alunoEdit.genero}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                    <option value="Não Informado">Não Informado</option>
                                </select>
                            </div>
                        </form> 
                    : <></>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleUpdateAluno.bind(this)}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditarAluno