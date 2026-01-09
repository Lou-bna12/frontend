// src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { api } from './services/api'
import './App.css'

function App() {
  const [apiStatus, setApiStatus] = useState('Vérification...')

  useEffect(() => {
    checkApi()
  }, [])

  const checkApi = async () => {
    try {
      await api.test()
      setApiStatus('✅ Connecté')
    } catch {
      setApiStatus('❌ Déconnecté')
    }
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo">
              🛒 Marketplace Alger
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Accueil</Link>
              <Link to="/register" className="nav-link">S'inscrire</Link>
              <Link to="/login" className="nav-link">Se connecter</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage apiStatus={apiStatus} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2024 Marketplace Alger</p>
          <div className="footer-links">
            <span>API: {apiStatus}</span>
            <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </div>
        </footer>
      </div>
    </Router>
  )
}

// Page d'accueil
function HomePage({ apiStatus }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await api.getProducts()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Marketplace Alger 🚀</h1>
        <p>La première marketplace algérienne avec livraison express</p>
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{products.length}</span>
            <span className="stat-label">Produits</span>
          </div>
          <div className="stat">
            <span className="stat-value">{apiStatus.includes('✅') ? 'En ligne' : 'Hors ligne'}</span>
            <span className="stat-label">Statut</span>
          </div>
        </div>
      </section>

      <section className="products-section">
        <h2>Produits disponibles</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : products.length === 0 ? (
          <p>Aucun produit disponible.</p>
        ) : (
          <div className="products-grid">
            {products.slice(0, 6).map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-info">
                  <span className="product-price">{product.price} DA</span>
                  <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="cta-section">
        <h2>Rejoignez-nous !</h2>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">
            Devenir client
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Devenir fournisseur
          </Link>
        </div>
      </section>
    </div>
  )
}

// Page d'inscription
function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: 'customer'
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const result = await api.register(formData)
      if (result.success) {
        setMessage('✅ Inscription réussie !')
        // Stocker les infos utilisateur
        localStorage.setItem('userEmail', result.user.email)
        localStorage.setItem('userRole', result.user.role)
      } else {
        setMessage(`❌ ${result.detail || 'Erreur d\'inscription'}`)
      }
    } catch (error) {
      setMessage('❌ Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <h2>Créer un compte</h2>
      
      <form onSubmit={handleSubmit} className="register-form">
        {message && <div className="message">{message}</div>}

        <div className="form-group">
          <label>Type de compte</label>
          <div className="role-selector">
            {['customer', 'shop'].map(role => (
              <button
                key={role}
                type="button"
                className={`role-btn ${formData.role === role ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role})}
              >
                {role === 'customer' ? '👤 Client' : '🏪 Fournisseur'}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Nom complet</label>
          <input
            type="text"
            required
            value={formData.full_name}
            onChange={e => setFormData({...formData, full_name: e.target.value})}
            placeholder="Votre nom"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            placeholder="votre@email.com"
          />
        </div>

        <div className="form-group">
          <label>Téléphone (optionnel)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            placeholder="+213 XX XX XX XX"
          />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>

        <p className="login-link">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  )
}

// Page de connexion
function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const result = await api.login(email, password)
      if (result.success) {
        setMessage('✅ Connexion réussie !')
        // Stocker les infos utilisateur
        localStorage.setItem('userEmail', result.email)
        localStorage.setItem('userRole', result.role)
        // Rediriger après 1 seconde
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      } else {
        setMessage(`❌ ${result.detail || 'Erreur de connexion'}`)
      }
    } catch (error) {
      setMessage('❌ Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <h2>Connexion</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        {message && <div className="message">{message}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
          />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>

        <p className="register-link">
          Pas de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </form>
    </div>
  )
}

export default App