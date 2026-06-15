import { useEffect, useState } from 'react';
import './Home.css';

import bannerImg from '../assets/home-banner.png';
import knightImg from '../assets/home-knight.png';
import questoesImg from '../assets/card-questoes.png';
import decksImg from '../assets/card-decks.png';
import jogosImg from '../assets/card-jogos.png';
import relatoriosImg from '../assets/card-relatorios.png';

export default function Home({ onNavigate }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadUser() {
            try {
                const raw = localStorage.getItem('aulafront_auth');
                const stored = raw ? JSON.parse(raw) : null;

                if (!stored?.token || !stored?.user?.id) {
                    throw new Error('Usuário não encontrado. Faça login novamente.');
                }

                const response = await fetch(`http://localhost:3000/users/view/${stored.user.id}`, {
                    headers: {
                        Authorization: `Bearer ${stored.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Não foi possível carregar os dados do usuário.');
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    const menuCards = [
        { key: 'questoes', label: 'Questões', img: questoesImg, screen: 'questoes' },
        { key: 'jogos', label: 'Jogos', img: jogosImg, screen: 'jogos' },
        { key: 'decks', label: 'Decks', img: decksImg, screen: 'decks' },
        { key: 'relatorios', label: 'Relatórios', img: relatoriosImg, screen: 'relatorios' },
    ];

    return (
        <div className="home-page">
            <div className="home-top">
                <header className="home-header">
                    <nav className="home-header__nav">
                        <button className="home-header__link home-header__link--active" onClick={() => onNavigate?.('home')}>
                            Home
                        </button>
                        <span className="home-header__divider">|</span>
                        <button className="home-header__link" onClick={() => onNavigate?.('rank')}>
                            Rank
                        </button>
                        <span className="home-header__divider">|</span>
                        <button className="home-header__link" onClick={() => onNavigate?.('help')}>
                            Help
                        </button>
                    </nav>

                    <div className="home-header__user">
                        <div className="home-header__profile">
                            <span className="home-header__coins">
                                🪙 {loading ? '...' : (user?.pontos ?? 0).toLocaleString('pt-BR')}
                            </span>
                            <span className="home-header__avatar">👤</span>
                            <span className="home-header__name">
                                {loading ? 'Carregando...' : (user?.nome ?? 'Visitante')}
                            </span>
                        </div>
                    </div>
                </header>

                <div className="home-banner">
                    <img src={bannerImg} alt="Knight of Questions" className="home-banner__img" />
                </div>

                <img src={knightImg} alt="" className="home-knight" />
            </div>

            {error && <p className="home-error">{error}</p>}

            <div className="home-content">
                <aside className="home-recent">
                    <h3 className="home-recent__title">Acessos Recentes</h3>
                    <div className="home-recent__grid">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <button key={i} className="home-recent__item" aria-label={`Acesso recente ${i + 1}`} />
                        ))}
                    </div>
                </aside>

                <main className="home-menu">
                    {menuCards.map((card) => (
                        <button
                            key={card.key}
                            className="home-menu__card"
                            onClick={() => onNavigate?.(card.screen)}
                        >
                            <img src={card.img} alt={card.label} className="home-menu__img" />
                        </button>
                    ))}
                </main>
            </div>
        </div>
    );
}