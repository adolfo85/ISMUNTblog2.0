import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showMaterias, setShowMaterias] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const materias = [
        { id: 'tecnicas', name: 'Técnicas compositivas desde el Siglo XX' },
        { id: 'lectura', name: 'Lectura e interpretación de la Música Contemporánea' },
        { id: 'contrapunto', name: 'Contrapunto Tonal' },
        { id: 'historia2', name: 'Historia de la Música II' },
        { id: 'historia3', name: 'Historia de la Música III' }
    ]

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="brand-wrapper">
                    <Link to="/" className="navbar-brand">
                        ISMUNT
                    </Link>
                    <div className="brand-separator"></div>
                    <div className="brand-subtitle">
                        <span className="subtitle-line">Cartelera ismunt</span>
                        <span className="subtitle-separator"> - </span>
                        <span className="subtitle-line">A De Boeck</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-menu desktop">
                    <div
                        className="navbar-dropdown"
                        onMouseEnter={() => setShowMaterias(true)}
                        onMouseLeave={() => setShowMaterias(false)}
                    >
                        <button className="navbar-link">
                            Materias
                            <ChevronDown size={16} />
                        </button>
                        {showMaterias && (
                            <div className="dropdown-menu">
                                {materias.map((materia) => (
                                    <Link
                                        key={materia.id}
                                        to={`/materia/${materia.id}`}
                                        className="dropdown-item"
                                        onClick={() => setShowMaterias(false)}
                                    >
                                        {materia.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to="/admin/login" className="admin-link">
                        Admin
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="navbar-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="navbar-mobile">
                        <div className="mobile-menu">
                            <div className="mobile-section">
                                <h4>Materias</h4>
                                {materias.map((materia) => (
                                    <Link
                                        key={materia.id}
                                        to={`/materia/${materia.id}`}
                                        className="mobile-link"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {materia.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="mobile-section">
                                <h4>Administración</h4>
                                <Link
                                    to="/admin/login"
                                    className="mobile-link"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Acceso Admin
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
