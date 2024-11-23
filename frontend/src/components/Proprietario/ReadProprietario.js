import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Proprietario.css';  // Importando o arquivo CSS

const ReadProprietario = () => {
    const { id } = useParams();  // id da URL
    const [proprietario, setProprietario] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8087/proprietario/${id}`)
            .then((res) => {
                setProprietario(res.data);  // Armazena os dados do proprietário
            })
            .catch((err) => console.log(err));
    }, [id]);  // Executa novamente caso o id da URL mude

    if (!proprietario) return <div>Carregando...</div>;

    const formatDate = (date) => {
        if (date) {
            const formattedDate = new Date(date);
            return formattedDate.toLocaleDateString(); // Formato de data
        }
        return '-'; // Caso a data não exista
    };

    return (
        <div className="read-proprietario-container">
            <h2 className="read-proprietario-title">Detalhes do Proprietário</h2>
            <div className="read-proprietario-wrapper">
                <table className="read-proprietario-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data Cadastro</th>
                            <th>Data Alteração</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{proprietario._id}</td> 
                            <td>{proprietario.nome}</td>
                            <td>{proprietario.cpf}</td>
                            <td>{formatDate(proprietario.data_cadastro)}</td>
                            <td>{formatDate(proprietario.data_alteracao)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReadProprietario;
