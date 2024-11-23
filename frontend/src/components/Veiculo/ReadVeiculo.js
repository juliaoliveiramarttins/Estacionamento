import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Veiculo.css';  // Importando o arquivo CSS para o veículo

const ReadVeiculo = () => {
    const { id } = useParams();  // id da URL
    const [veiculo, setVeiculo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8087/veiculos/${id}`)
            .then((res) => {
                setVeiculo(res.data);  // Armazena os dados do veículo
            })
            .catch((err) => console.log(err));
    }, [id]);  // Executa novamente caso o id da URL mude

    if (!veiculo) return <div>Carregando...</div>;

    const formatDate = (date) => {
        if (date) {
            const formattedDate = new Date(date);
            return formattedDate.toLocaleDateString(); // Formato de data
        }
        return '-'; // Caso a data não exista
    };

    return (
        <div className="read-veiculo-container">
            <h2 className="read-veiculo-title">Detalhes do Veículo</h2>
            <div className="read-veiculo-wrapper">
                <table className="read-veiculo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Placa</th>
                            <th>Ano</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Mensalidade</th>
                            <th>Id do Proprietário</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{veiculo._id}</td>
                            <td>{veiculo.placa}</td>
                            <td>{veiculo.ano}</td>
                            <td>{veiculo.marca}</td>
                            <td>{veiculo.modelo}</td>
                            <td>{veiculo.mensalidade}</td>
                            <td>{veiculo.id_proprietario}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReadVeiculo;
