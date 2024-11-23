import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Veiculo.css';  // Importando o arquivo CSS


function UpdateVeiculo() {
    const { id } = useParams();
    const [veiculo, setVeiculo] = useState({
        placa: "",
        ano: "",
        marca: "",
        modelo: "",
        mensalidade: "",
        id_proprietario: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8087/veiculos/${id}`)
            .then(res => {
                setVeiculo(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        setVeiculo((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!veiculo.placa) {
            newErrors.placa = "Placa é obrigatória!";
        }
        if (!veiculo.ano || veiculo.ano < 1900 || veiculo.ano > new Date().getFullYear()) {
            newErrors.ano = "Ano inválido!";
        }
        if (!veiculo.marca) {
            newErrors.marca = "Marca é obrigatória!";
        }
        if (!veiculo.modelo) {
            newErrors.modelo = "Modelo é obrigatório!";
        }
        if (!veiculo.mensalidade || veiculo.mensalidade <= 0) {
            newErrors.mensalidade = "Mensalidade inválida!";
        }
        if (!veiculo.id_proprietario) {
            newErrors.id_proprietario = "ID do proprietário é obrigatório!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;  // Retorna true se não houver erros
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Não envia o formulário se houver erros
        }

        try {
            await axios.put(`http://localhost:8087/veiculos/${id}`, veiculo);
            navigate("/veiculo"); // Navega para a lista de veículos
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="update-veiculo-container">
            <h1 className="update-veiculo-title">Formulário para Editar o Veículo</h1>
            <form className="update-veiculo-form">
                <div className="update-veiculo-form-group">
                    <label className="update-veiculo-form-label"> ID:</label>
                    <input type="text" className="update-veiculo-form-input" id="id"
                        placeholder="ID"
                        name="id" value={veiculo._id}
                        disabled onChange={handleChange} />
                </div>

                <div className="update-veiculo-form-group">
                    <label className="update-veiculo-form-label"> Placa:</label>
                    <input type="text"
                        className="update-veiculo-form-input"
                        id="placa"
                        placeholder="Placa do Veículo"
                        name="placa" value={veiculo.placa}
                        onChange={handleChange} />
                    {errors.placa && <span className="error-message">{errors.placa}</span>}
                </div>

                <div className="update-veiculo-form-group">
                    <label className="update-veiculo-form-label"> Ano:</label>
                    <input type="number" className="update-veiculo-form-input"
                        id="ano"
                        placeholder="Ano do Veículo"
                        name="ano" value={veiculo.ano}
                        onChange={handleChange} />
                    {errors.ano && <span className="error-message">{errors.ano}</span>}
                </div>

                <div className="update-veiculo-form-group">
                    <label className="update-veiculo-form-label"> Marca:</label>
                    <input type="text" className="update-veiculo-form-input"
                        id="marca"
                        placeholder="Marca do Veículo"
                        name="marca" value={veiculo.marca}
                        onChange={handleChange} />
                    {errors.marca && <span className="error-message">{errors.marca}</span>}
                </div>

                <div className="update-veiculo-form-group">
                    <label className="update-veiculo-form-label"> Modelo:</label>
                    <input type="text" className="update-veiculo-form-input"
                        id="modelo"
                        placeholder="Modelo do Veículo"
                        name="modelo" value={veiculo.modelo}
                        onChange={handleChange} />
                    {errors.modelo && <span className="error-message">{errors.modelo}</span>}
                </div>

                <div className="update-veiculo-form-group">
                    <label className="update-veiculo-form-label"> Mensalidade:</label>
                    <input type="number" className="update-veiculo-form-input"
                        id="mensalidade"
                        placeholder="Mensalidade do Veículo"
                        name="mensalidade" value={veiculo.mensalidade}
                        onChange={handleChange} />
                    {errors.mensalidade && <span className="error-message">{errors.mensalidade}</span>}
                </div>

                <div className="update-veiculo-form-group">
                    <label className="update-veiculo-form-label"> ID do Proprietário:</label>
                    <input type="text" className="update-veiculo-form-input"
                        id="id_proprietario"
                        placeholder="ID do Proprietário"
                        name="id_proprietario" value={veiculo.id_proprietario}
                        disabled onChange={handleChange} />
                        
                    {errors.id_proprietario && <span className="error-message">{errors.id_proprietario}</span>}
                </div>

                <button type="submit" className="update-veiculo-submit-button"
                    onClick={handleClick}>Alterar</button>
            </form>
            <div className="update-veiculo-link-container">
                <Link to="/veiculos" className="update-veiculo-view-all-link">Veja todos os veículos</Link>
            </div>
        </div>
    );
}

export default UpdateVeiculo;
