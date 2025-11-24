import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import {
    LayoutDashboard,
    FileEdit,
    Image,
    LogOut,
    Home,
    Calendar,
    BookOpen
} from 'lucide-react'
import './Dashboard.css'

export default function Dashboard() {
    const navigate = useNavigate()
    const session = authService.getSession()

    const handleLogout = () => {
        authService.logout()
        navigate('/admin/login')
    }

    const quickActions = [
        {
            icon: <Home size={32} />,
            title: 'Editar Home',
            description: 'Modificar contenido de la página principal',
            action: () => navigate('/admin/editor?section=home')
        },
        {
            icon: <BookOpen size={32} />,
            title: 'Editar Materias',
            description: 'Actualizar contenido de las materias',
            action: () => navigate('/admin/editor?section=materias')
        }
    ]

    return (
        <div className="dashboard-page">
            {/* Header */}
            <div className="dashboard-header">
                <div className="container">
                    <div className="header-top">
                        <div className="header-info">
                            <LayoutDashboard size={40} />
                            <div>
                                <h1>Panel de Administrador</h1>
                                <p>Bienvenido, {session?.username}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="logout-button">
                            <LogOut size={20} />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="container">
                <section className="quick-actions">
                    <h2>Acciones Rápidas</h2>
                    <div className="actions-grid">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className="action-card"
                                onClick={action.action}
                            >
                                <div className="action-icon">{action.icon}</div>
                                <h3>{action.title}</h3>
                                <p>{action.description}</p>
                            </button>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}
