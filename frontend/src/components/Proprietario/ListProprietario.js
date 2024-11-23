import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Proprietario.css';  // Importando o arquivo CSS

const ListProprietario = () => {
    const [proprietarios, setProprietarios] = useState([]);

    // Listar Proprietários
    useEffect(() => {
        const fetchAllProprietarios = async () => {
            try {
                const res = await axios.get("http://localhost:8087/proprietario");
                setProprietarios(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProprietarios();
    }, []);

    // Deletar Proprietário
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8087/proprietario/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="list-proprietario-container">
            <h2 className="list-proprietario-title">Listando Proprietários</h2>
            
            {/* Botão para adicionar novo proprietário */}
            <div className="list-proprietario-add-btn-container">
                <Link to="/addProprietario" className="list-proprietario-add-btn">
                    <button className="btn-add-proprietario">
                        + Adicionar Proprietário
                    </button>
                </Link>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table className="list-proprietario-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Data Cadastro</th>
                                    <th>Data Alteração</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proprietarios.map((proprietario) => (
                                    <tr key={proprietario._id}>
                                        <td>{proprietario._id}</td>
                                        <td>{proprietario.nome}</td>
                                        <td>{proprietario.cpf}</td>
                                        <td>{new Date(proprietario.data_cadastro).toLocaleDateString()}</td>
                                        <td>{new Date(proprietario.data_alteracao).toLocaleDateString()}</td>
                                        <td className="list-proprietario-actions">
                                            <Link
                                                to={`/readProprietario/${proprietario._id}`}
                                                className="list-proprietario-action-btn list-proprietario-view-btn">
                                                <FontAwesomeIcon icon={faEye} />
                                            </Link>

                                            <Link
                                                to={`/updateProprietario/${proprietario._id}`}
                                                className="list-proprietario-action-btn list-proprietario-edit-btn">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(proprietario._id)}
                                                className="list-proprietario-action-btn list-proprietario-delete-btn">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProprietario;
