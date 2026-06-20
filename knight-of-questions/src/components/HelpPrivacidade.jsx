import React from 'react';
import './Help.css';
import Header from './Header/Header.jsx';

export default function HelpPrivacidade({ onBack, currentUser, logout, perfilPontos }) {
  return (
    <div className="help-page-layout">
      <Header currentUser={currentUser} logout={logout} perfilPontos={perfilPontos} />
      
      <main className="help-content-container">
        <div className="help-back-area">
          <button className="help-back-btn" onClick={onBack} title="Voltar">
            <span className="help-back-icon">◀</span>
          </button>
        </div>

        <section className="help-section-title">
          <div className="help-section-icon">🛡️</div>
          <h1 className="pixel-text">PRIVACIDADE E SEGURANÇA</h1>
          <p>Gerencie seus dados e mantenha sua conta protegida.</p>
        </section>

        <section className="help-cards-list">
          <div className="help-card-item">
            <h2>COMO PROTEGEMOS SEUS DADOS</h2>
            <p>Seus dados são armazenados com segurança e usados apenas para melhorar sua experiência.</p>
          </div>

          <div className="help-card-item">
            <h2>EXPORTAR OU EXCLUIR SEUS DADOS</h2>
            <p>Você pode solicitar a exportação ou exclusão dos seus dados nas configurações da conta.</p>
          </div>

          <div className="help-card-item">
            <h2>AUTENTICAÇÃO EM DUAS ETAPAS</h2>
            <p>Ative a autenticação em duas etapas para deixar sua conta mais segura.</p>
          </div>
        </section>

        <section className="help-support">
          <p className="help-support-text">Não encontrou o que procurava?</p>
          <button className="help-support-btn">
            <span>💬</span> Falar com o suporte
          </button>
        </section>
      </main>
    </div>
  );
}