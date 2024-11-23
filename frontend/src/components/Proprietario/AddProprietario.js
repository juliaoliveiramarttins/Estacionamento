import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Proprietario.css';  // Importando o arquivo CSS

const AddProprietario = () => {
    const [proprietario, setProprietario] = useState({
        nome: "",
        cpf: "",
    });
    const [nomeError, setNomeError] = useState(""); // Para armazenar o erro de nome
    const [cpfError, setCpfError] = useState(""); // Para armazenar o erro de CPF
    const navigate = useNavigate();

    // Função para manipular mudanças nos inputs
    const handleChange = (e) => {
        setProprietario((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        // Resetando os erros se os campos forem alterados
        if (e.target.name === "nome") {
            setNomeError("");
        } else if (e.target.name === "cpf") {
            setCpfError("");
        }
    };

    // Função para manipular o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação do nome (mínimo 3 caracteres)
        if (proprietario.nome.length < 3) {
            setNomeError("O nome deve ter pelo menos 3 caracteres.");
            return;  // Não envia o formulário se o nome estiver incorreto
        }

        // Validação do tamanho do CPF (11 caracteres)
        if (proprietario.cpf.length !== 11) {
            setCpfError("O CPF deve ter 11 caracteres.");
            return;  // Não envia o formulário se o CPF estiver incorreto
        }

        try {
            // Envio de dados para o servidor
            await axios.post("http://localhost:8087/proprietario", proprietario);
            // Navegação para a página de listagem
            navigate("/proprietario");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form-container-add-proprietario">
            <h2 className="form-title-add-proprietario">Adicionando Proprietário</h2>
            <div className="form-wrapper-add-proprietario">
                <form onSubmit={handleSubmit} className="form-add-proprietario">
                    <div className="form-group-add-proprietario">
                        <label htmlFor="nome" className="form-label-add-proprietario">Nome:</label>
                        <input
                            type="text"
                            className="form-input-add-proprietario"
                            id="nome"
                            placeholder="Digite o nome do Proprietário"
                            name="nome"
                            value={proprietario.nome}
                            onChange={handleChange}
                        />
                        {/* Exibe a mensagem de erro se o nome não for válido */}
                        {nomeError && <span className="error-message-add-proprietario">{nomeError}</span>}
                    </div>
                    <div className="form-group-add-proprietario">
                        <label htmlFor="cpf" className="form-label-add-proprietario">CPF:</label>
                        <input
                            type="text"
                            className="form-input-add-proprietario"
                            id="cpf"
                            placeholder="Digite o CPF do Proprietário"
                            name="cpf"
                            value={proprietario.cpf}
                            onChange={handleChange}
                        />
                        {/* Exibe a mensagem de erro se o CPF não for válido */}
                        {cpfError && <span className="error-message-add-proprietario">{cpfError}</span>}
                    </div>
                    <div className="form-actions-add-proprietario">
                        <button type="submit" className="btn-submit-add-proprietario">
                            Cadastrar
                        </button>
                        <Link to="/proprietario" className="btn-link-add-proprietario">Listar Proprietários</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProprietario;
