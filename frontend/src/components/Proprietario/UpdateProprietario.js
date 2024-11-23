import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateProprietario() {
    const { id } = useParams();
    const [proprietario, setProprietario] = useState({
        nome: "",
        cpf: "",
        data_cadastro: "", // Adicionado campo para data_cadastro
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProprietario((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        axios.get(`http://localhost:8087/proprietario/${id}`)
            .then(res => {
                setProprietario(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8087/proprietario/${id}`, proprietario);
            navigate("/proprietario");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="update-proprietario-container">
            <h1 className="update-proprietario-title">Formulário para Editar o Proprietário</h1>
            <form className="update-proprietario-form">
                <div className="update-proprietario-form-group">
                    <label className="update-proprietario-form-label"> ID:</label>
                    <input type="text" className="update-proprietario-form-input" id="id"
                        placeholder="ID"
                        name="id" value={proprietario._id}
                        disabled onChange={handleChange} />
                </div>

                <div className="update-proprietario-form-group">
                    <label className="update-proprietario-form-label"> Nome</label>
                    <input type="text"
                        className="update-proprietario-form-input"
                        id="nome"
                        placeholder="Nome do Proprietário"
                        name="nome" value={proprietario.nome}
                        onChange={handleChange} />
                </div>

                <div className="update-proprietario-form-group">
                    <label className="update-proprietario-form-label"> CPF</label>
                    <input type="text" className="update-proprietario-form-input"
                        id="cpf"
                        placeholder="CPF do Proprietário"
                        name="cpf" value={proprietario.cpf}
                        onChange={handleChange} />
                </div>


                <button type="submit" className="update-proprietario-submit-button"
                    onClick={handleClick}>Alterar</button>
            </form>
            <div className="update-proprietario-link-container">
                <Link to="/proprietario" className="update-proprietario-view-all-link">Veja todos os proprietários</Link>
            </div>
        </div>
    );
}

export default UpdateProprietario;
