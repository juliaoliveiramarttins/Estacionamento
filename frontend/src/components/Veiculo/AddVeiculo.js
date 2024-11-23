import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Veiculo.css';  // Importando o arquivo CSS

const AddVeiculo = () => {
    const [veiculo, setVeiculo] = useState({
        placa: "",
        ano: "",
        marca: "",
        modelo: "",
        mensalidade: "",
        id_proprietario: "",  // Referência ao proprietário
    });

    const [proprietarios, setProprietarios] = useState([]); // Para armazenar os proprietários
    const [placaError, setPlacaError] = useState("");
    const [anoError, setAnoError] = useState("");
    const [mensalidadeError, setMensalidadeError] = useState("");
    const [proprietarioError, setProprietarioError] = useState(""); // Para o erro do proprietário
    const navigate = useNavigate();

    useEffect(() => {
        // Carregar a lista de proprietários da API
        axios.get("http://localhost:8087/proprietario")
            .then((response) => {
                setProprietarios(response.data);  // Supondo que a resposta seja um array de proprietários
            })
            .catch((error) => {
                console.error("Erro ao buscar proprietários:", error);
            });
    }, []);

    const handleChange = (e) => {
        setVeiculo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        // Resetando os erros se os campos forem alterados
        if (e.target.name === "placa") {
            setPlacaError("");
        } else if (e.target.name === "ano") {
            setAnoError("");
        } else if (e.target.name === "mensalidade") {
            setMensalidadeError("");
        } else if (e.target.name === "id_proprietario") {
            setProprietarioError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

        // Validação do campo placa
        if (veiculo.placa.length === 0) {
            setPlacaError("A placa não pode estar vazia.");
            valid = false;
        }

        // Validação do ano (4 dígitos)
        if (veiculo.ano.length !== 4) {
            setAnoError("O ano deve ter 4 dígitos.");
            valid = false;
        }

        // Validação da mensalidade
        if (veiculo.mensalidade <= 0) {
            setMensalidadeError("A mensalidade deve ser um valor positivo.");
            valid = false;
        }

        // Validação do campo proprietário
        if (!veiculo.id_proprietario) {
            setProprietarioError("O proprietário deve ser selecionado.");
            valid = false;
        }

        if (!valid) {
            return;  // Impede o envio se houver erros
        }

        try {
            // Envio de dados para o servidor
            await axios.post("http://localhost:8087/veiculos", veiculo);
            navigate("/veiculos");  // Redireciona para a página de listagem de veículos
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="add-veiculo-form-container">
            <h2 className="add-veiculo-form-title">Adicionando Veículo</h2>
            <div className="add-veiculo-form-wrapper">
                <form onSubmit={handleSubmit} className="add-veiculo-form">
                    <div className="add-veiculo-form-group">
                        <label htmlFor="placa" className="add-veiculo-form-label">Placa:</label>
                        <input
                            type="text"
                            className="add-veiculo-form-input"
                            id="placa"
                            placeholder="Digite a placa do veículo"
                            name="placa"
                            value={veiculo.placa}
                            onChange={handleChange}
                        />
                        {placaError && <span className="add-veiculo-form-error-message">{placaError}</span>}
                    </div>

                    <div className="add-veiculo-form-group">
                        <label htmlFor="ano" className="add-veiculo-form-label">Ano:</label>
                        <input
                            type="text"
                            className="add-veiculo-form-input"
                            id="ano"
                            placeholder="Digite o ano do veículo"
                            name="ano"
                            value={veiculo.ano}
                            onChange={handleChange}
                        />
                        {anoError && <span className="add-veiculo-form-error-message">{anoError}</span>}
                    </div>

                    <div className="add-veiculo-form-group">
                        <label htmlFor="marca" className="add-veiculo-form-label">Marca:</label>
                        <input
                            type="text"
                            className="add-veiculo-form-input"
                            id="marca"
                            placeholder="Digite a marca do veículo"
                            name="marca"
                            value={veiculo.marca}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="add-veiculo-form-group">
                        <label htmlFor="modelo" className="add-veiculo-form-label">Modelo:</label>
                        <input
                            type="text"
                            className="add-veiculo-form-input"
                            id="modelo"
                            placeholder="Digite o modelo do veículo"
                            name="modelo"
                            value={veiculo.modelo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="add-veiculo-form-group">
                        <label htmlFor="mensalidade" className="add-veiculo-form-label">Mensalidade:</label>
                        <input
                            type="number"
                            className="add-veiculo-form-input"
                            id="mensalidade"
                            placeholder="Digite o valor da mensalidade"
                            name="mensalidade"
                            value={veiculo.mensalidade}
                            onChange={handleChange}
                        />
                        {mensalidadeError && <span className="add-veiculo-form-error-message">{mensalidadeError}</span>}
                    </div>

                    <div className="add-veiculo-form-group">
                        <label htmlFor="id_proprietario" className="add-veiculo-form-label">Proprietário:</label>
                        <select
                            className="add-veiculo-form-input"
                            name="id_proprietario"
                            value={veiculo.id_proprietario}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o Proprietário</option>
                            {proprietarios.map((proprietario) => (
                                <option key={proprietario._id} value={proprietario._id}>
                                    {proprietario.nome}
                                </option>
                            ))}
                        </select>
                        {proprietarioError && <span className="add-veiculo-form-error-message">{proprietarioError}</span>}
                    </div>

                    <div className="add-veiculo-form-actions">
                        <button type="submit" className="add-veiculo-submit-button">
                            Cadastrar
                        </button>
                        <Link to="/veiculos" className="add-veiculo-link">Listar Veículos</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVeiculo;
