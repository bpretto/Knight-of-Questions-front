import { useState } from 'react';

export default function LoginForm({ onLogin, loading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const normalizedEmail = email.trim();
        const normalizedPassword = password.trim();

        if (!normalizedEmail || !normalizedPassword) {
            window.alert('Preencha e-mail e senha.');
            return;
        }

        await onLogin({ email: normalizedEmail, password: normalizedPassword });
    }

    return (
        <form className="card" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <p>Entre com usuário cadastrado na API para acessar as demais telas.</p>

            <label htmlFor="email">E-mail</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="aluno@jwt.com"
            />

            <label htmlFor="password">Senha</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="123456"
            />

            <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    );
}
