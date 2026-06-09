export default function UserList({ users, loading, onReload }) {
    return (
        <section className="card">
            <div className="title-row">
                <h2>Tela: Usuários</h2>
                <button type="button" onClick={onReload} disabled={loading}>
                    {loading ? 'Carregando...' : 'Recarregar'}
                </button>
            </div>

            <ul className="list">
                {users.length === 0 && <li>Nenhum usuário encontrado.</li>}

                {users.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong>
                        <br />
                        <span>{user.email}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
