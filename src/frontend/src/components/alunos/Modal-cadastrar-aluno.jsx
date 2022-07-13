import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalCadastrarAluno = ({ getAlunos }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ehVazio = campo => !campo
    const handleCadastrarAluno = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let aluno = {
            nome: document.getElementById('nome').value,
            data_de_nascimento: document.getElementById('data_de_nascimento').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            genero: document.getElementById('genero').value
        }
        
        if ( ehVazio(aluno.nome) ){
            alert('Preencha o campo "Nome".')
        } else if ( ehVazio(aluno.email) ){
            alert('Preencha o campo "Email".')
        } else if ( !ehVazio(aluno.data_de_nascimento) && !aluno.data_de_nascimento.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) ){
            alert('Preencha o campo "Data de Nascimento" com uma data válida ou deixe-o em branco.')
        } else if ( !ehVazio(aluno.telefone) && !aluno.telefone.match(/^\d{8,11}$/) ){
            alert('Preencha o campo "Telefone" com um número válido ou deixe-o em branco. (Apenas números, mínimo 8 e máximo 11)')
        } else {
            return enviarDados(aluno)
        }
    }

    const enviarDados = (dados) => {
        let url = `http://${window.location.hostname}:8088/api/alunos`
        let method = 'post'
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
                res.text().then(error => {
                    throw new Error(error)
                })
            }
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Cadastrar Aluno
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div>
                            <label htmlFor="nome">Nome: </label>
                            <input className="form-control" type="text" name="nome" id="nome" />
                        </div>
                        <div>
                            <label htmlFor="data_de_nascimento">Data de Nascimento: </label>
                            <input className="form-control" type="text" name="data_de_nascimento" id="data_de_nascimento" />
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input className="form-control" type="text" name="email" id="email" />
                        </div>
                        <div>
                            <label htmlFor="telefone">Telefone: </label>
                            <input className="form-control" type="text" name="telefone" id="telefone" />
                        </div>
                        <div>
                            <label htmlFor="genero">Genero: </label>
                            <select className="form-control" name="genero" id="genero">
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                                <option value="Não Informado">Não Informado</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleCadastrarAluno.bind(this)}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCadastrarAluno