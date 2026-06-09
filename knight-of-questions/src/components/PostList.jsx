export default function PostList({ posts, loading, onReload }) {
    return (
        <section className="card">
            <div className="title-row">
                <h2>Tela: Posts</h2>
                <button type="button" onClick={onReload} disabled={loading}>
                    {loading ? 'Carregando...' : 'Recarregar'}
                </button>
            </div>

            <ul className="list">
                {posts.length === 0 && <li>Nenhum post encontrado.</li>}

                {posts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                        <br />
                        <span>{post.body}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
