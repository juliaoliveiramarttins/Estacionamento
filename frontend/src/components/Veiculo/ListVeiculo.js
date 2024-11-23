import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importando o ícone da lixeira
import './Veiculo.css';  // Importando o arquivo CSS

const ListVeiculo = () => {
    const [veiculos, setVeiculos] = useState([]);

    // Listar Veículos
    useEffect(() => {
        const fetchAllVeiculos = async () => {
            try {
                const res = await axios.get("http://localhost:8087/veiculos");
                setVeiculos(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllVeiculos();
    }, []);

    // Deletar Veículo
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8087/veiculos/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="list-veiculo-container">
            <h2 className="list-veiculo-title">Listando Veículos</h2>

            {/* Botão de adicionar veículo */}
            <div className="list-veiculo-add-btn-container">
                <Link to="/addVeiculo" className="list-veiculo-add-btn">
                    + Adicionar Veículo
                </Link>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="list-veiculo-table-responsive">
                        <table className="list-veiculo-table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Placa</th>
                                    <th>Ano</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Mensalidade</th>
                                    <th>ID do Proprietário</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {veiculos.map((veiculo) => (
                                    <tr key={veiculo._id}>
                                        <td>{veiculo.placa}</td>
                                        <td>{veiculo.ano}</td>
                                        <td>{veiculo.marca}</td>
                                        <td>{veiculo.modelo}</td>
                                        <td>{veiculo.mensalidade}</td>
                                        <td>{veiculo.id_proprietario}</td>
                                        <td className="list-veiculo-actions">
                                            <Link
                                                to={`/readVeiculo/${veiculo._id}`}
                                                className="list-veiculo-action-btn list-veiculo-view-btn mx-2">
                                                <FontAwesomeIcon icon={faEye} />
                                            </Link>

                                            <Link
                                                to={`/updateVeiculo/${veiculo._id}`}
                                                className="list-veiculo-action-btn list-veiculo-edit-btn mx-2">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(veiculo._id)}
                                                className="list-veiculo-action-btn list-veiculo-delete-btn">
                                                <FontAwesomeIcon icon={faTrash} /> {/* Ícone de lixeira */}
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

export default ListVeiculo;
