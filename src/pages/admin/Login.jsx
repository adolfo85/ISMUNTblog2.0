import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../../services/authService'
import { Lock, AlertCircle } from 'lucide-react'
import './Login.css'

export default function Login() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const result = authService.login(password)

        if (result.success) {
            navigate('/admin')
        } else {
            setError(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-icon">
                            <Lock size={32} />
                        </div>
                        <h1>Panel de Administrador</h1>
                        <p>Ingresa la contraseña de acceso</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && (
                            <div className="error-message">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa la contraseña"
                                required
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Verificando...' : 'Ingresar'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <Link to="/" className="back-link">
                            ← Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
