import { useLocation } from "react-router-dom";
import { useState } from "react";

import GoatActionPanel from "../../Components/dash-animal-info/GoatActionPanel";
import GoatInfoCard from "../../Components/goat-info-card/GoatInfoCard";
import GoatGenealogyTree from "../../Components/goat-genealogy/GoatGenealogyTree";
import PageHeader from "../../Components/pages-headers/PageHeader";
import SearchInputBox from "../../Components/searchs/SearchInputBox";
import { getGenealogyByRegistration } from "../../api/GenealogyAPI/genealogy";
import type { GoatGenealogyDTO } from "../../Models/goatGenealogyDTO";

import "../../index.css";
import "./animalDashboard.css";

export default function AnimalDashboard() {
  const location = useLocation();
  const goat = location.state?.goat ?? null;

  const [genealogyData, setGenealogyData] = useState<GoatGenealogyDTO | null>(null);

  const showGenealogy = () => {
    if (goat?.registrationNumber) {
      getGenealogyByRegistration(goat.registrationNumber)
        .then(setGenealogyData)
        .catch((error) => {
          console.error("Erro ao buscar genealogia:", error);
        });
    }
  };

  return (
    <div className="content-in">
      <PageHeader title="Cabras" />
      <SearchInputBox onSearch={() => {}} />

      {goat ? (
        <div className="goat-panel">
          <div className="goat-info-card">
            <GoatInfoCard goat={goat} />
          </div>
          <GoatActionPanel
            registrationNumber={goat.registrationNumber}
            onShowGenealogy={showGenealogy}
          />
        </div>
      ) : (
        <div className="empty-dashboard">
          <h3>Nenhuma cabra selecionada</h3>
          <p>Use a barra de busca acima ou clique em "Detalhes" de alguma cabra para visualizar suas informações.</p>
          <div className="goat-placeholder">🐐</div>
        </div>
      )}

      {/* Exibe a genealogia abaixo do card */}
      {genealogyData && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ textAlign: "center" }}>🧬 Árvore Genealógica</h3>
          <GoatGenealogyTree data={genealogyData} />
        </div>
      )}
    </div>
  );
}
