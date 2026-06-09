import { useEffect, useState } from 'react';

import LoginForm from './components/LoginForm.jsx';
import PostList from './components/PostList.jsx';
import UserForm from './components/UserForm.jsx';
import UserList from './components/UserList.jsx';
import { createUser, getPostsByUserId, getUsers, login } from './services/api.js';

const STORAGE_KEY = 'aulafront_auth';

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed?.token) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export default function App() {
  const storedAuth = readStoredAuth();

  const [token, setToken] = useState(storedAuth?.token || '');
  const [currentUser, setCurrentUser] = useState(storedAuth?.user || null);
  const [screen, setScreen] = useState('users');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  function persistAuth(nextToken, nextUser) {
    setToken(nextToken);
    setCurrentUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: nextToken, user: nextUser }));
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setToken('');
    setCurrentUser(null);
    setUsers([]);
    setPosts([]);
    setScreen('users');
  }

  async function handleLogin(payload) {
    setLoading(true);
    try {
      const data = await login(payload);
      persistAuth(data.accessToken, data.user);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadUsers() {
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const data = await getUsers(token);
      setUsers(data);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadPosts() {
    if (!token || !currentUser?.id) {
      return;
    }

    setLoading(true);
    try {
      const data = await getPostsByUserId(currentUser.id, token);
      setPosts(data);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateUser(payload) {
    setLoading(true);
    try {
      await createUser(payload, token);
      await loadUsers();
    } catch (error) {
      window.alert(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    if (screen === 'users') {
      loadUsers();
      return;
    }

    loadPosts();
  }, [token, screen, currentUser?.id]);

  if (!token) {
    return (
      <main className="container">
        <header className="header">
          <h1>React Web + API com JWT</h1>
          <p>Faça login para acessar as telas protegidas.</p>
        </header>

        <LoginForm onLogin={handleLogin} loading={loading} />
      </main>
    );
  }

  return (
    <main className="container">
      <header className="header">
        <h1>React Web + API de Alunos</h1>
        <p>
          Usuário autenticado: <strong>{currentUser?.name || currentUser?.email}</strong>
        </p>
      </header>

      <section className="card nav-card">
        <button type="button" onClick={() => setScreen('users')} disabled={screen === 'users'}>
          Tela de usuários
        </button>
        <button type="button" onClick={() => setScreen('posts')} disabled={screen === 'posts'}>
          Tela de posts
        </button>
        <button type="button" className="secondary" onClick={logout}>
          Sair
        </button>
      </section>

      {screen === 'users' ? (
        <>
          <UserForm onCreate={handleCreateUser} loading={loading} />
          <UserList users={users} loading={loading} onReload={loadUsers} />
        </>
      ) : (
        <PostList posts={posts} loading={loading} onReload={loadPosts} />
      )}
    </main>
  );
}
