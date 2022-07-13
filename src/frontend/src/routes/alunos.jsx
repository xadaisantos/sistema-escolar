import React, { useState, useEffect } from 'react'
import TabelaAlunos from '../components/alunos/Tabela-alunos'
import ModalCadastrarAluno from '../components/alunos/Modal-cadastrar-aluno'

const Alunos = () => {
    const [alunos, setAlunos] = useState()
    useEffect(() => {
        getAlunos()
    }, [])

    const getAlunos = () => {
        let url = `http://${window.location.hostname}:8088/api/alunos`
        let method = 'get'
        let headers = { 'Content-Type': 'application/json' }
        fetch(url, {
            method: method,
            headers: headers
        }).then(res => {
            if (res.ok){
                console.log('Alunos carregados com sucesso. ')
                res.json().then(data => {
                    setAlunos(data.alunos)
                })
            } else {
                console.log('Não foi possível carregar os alunos. ' )
                res.json().then(data => { throw new Error(data) })
            }
        }).catch(error => alert(error))
    }

    return (
        <main style={{ padding: "1rem 0" }}>
            <ModalCadastrarAluno getAlunos={getAlunos} />
            <TabelaAlunos alunos={alunos} getAlunos={getAlunos} />
        </main>
    );
}

export default Alunos