import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProprietario from './components/Proprietario/ListProprietario';
import AddProprietario from './components/Proprietario/AddProprietario';
import ReadProprietario from './components/Proprietario/ReadProprietario';
import UpdateProprietario from './components/Proprietario/UpdateProprietario';
import ListVeiculo from './components/Veiculo/ListVeiculo'; // Adicionado
import AddVeiculo from './components/Veiculo/AddVeiculo';   // Adicionado
import ReadVeiculo from './components/Veiculo/ReadVeiculo'; // Adicionado
import UpdateVeiculo from './components/Veiculo/UpdateVeiculo'; // Adicionado
import Header from './components/Header/Header'; // Importe o Header

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Inclua o Header com links de navegação */}
        <Header />
        <header className="App-header">
          <Routes>
            {/* Rotas para Proprietário */}
            <Route path="/proprietario" element={<ListProprietario />} />
            <Route path="/addProprietario" element={<AddProprietario />} />
            <Route path="/readProprietario/:id" element={<ReadProprietario />} />
            <Route path="/updateProprietario/:id" element={<UpdateProprietario />} />

            {/* Rotas para Veículo */}
            <Route path="/veiculos" element={<ListVeiculo />} />
            <Route path="/addVeiculo" element={<AddVeiculo />} />
            <Route path="/readVeiculo/:id" element={<ReadVeiculo />} />
            <Route path="/updateVeiculo/:id" element={<UpdateVeiculo />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
