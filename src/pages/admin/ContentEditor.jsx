import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { contentService } from '../../services/contentService'
import { Save, RefreshCw, Plus, Trash2, Layout, BookOpen, ArrowLeft } from 'lucide-react'
import RichTextEditor from '../../components/admin/RichTextEditor'
import defaultContentData from '../../data/content.json'
import './ContentEditor.css'

export default function ContentEditor() {
    // Initialize with default data to prevent blank screens/crashes
    const [content, setContent] = useState(defaultContentData)
    const [searchParams, setSearchParams] = useSearchParams()

    // Get active tab from URL or default to 'home'
    const activeTab = searchParams.get('section') || 'home'

    const [selectedMateria, setSelectedMateria] = useState('tecnicas')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const setActiveTab = (tab) => {
        setSearchParams({ section: tab })
    }

    useEffect(() => {
        loadContent()
    }, [])

    const loadContent = async () => {
        try {
            const data = await contentService.getAll()
            if (data) {
                setContent(data)
            }
        } catch (error) {
            console.error('Error loading content:', error)
            setMessage('Error al cargar datos. Se muestran datos por defecto.')
        }
    }

    const handleSave = async () => {
        setMessage('Guardando en la nube...')
        try {
            await contentService.save(content)
            setMessage('¡Cambios guardados en la nube correctamente!')
            setTimeout(() => setMessage(''), 3000)
        } catch (error) {
            setMessage('Error al guardar. Intenta nuevamente.')
            console.error(error)
        }
    }

    const handleReset = () => {
        if (window.confirm('¿Estás seguro de restablecer el contenido original? Se perderán los cambios no guardados.')) {
            const data = contentService.reset()
            setContent(data)
            setMessage('Contenido restablecido')
        }
    }

    const updateHome = (field, value) => {
        setContent(prev => ({
            ...prev,
            home: { ...prev.home, [field]: value }
        }))
    }

    const updateMateria = (field, value) => {
        setContent(prev => ({
            ...prev,
            materias: {
                ...prev.materias,
                [selectedMateria]: {
                    ...prev.materias[selectedMateria],
                    [field]: value
                }
            }
        }))
    }

    // Resource Management for Materias
    const addResource = () => {
        const newResource = { title: '', url: '', description: '' }
        const currentMateria = content.materias?.[selectedMateria]
        if (!currentMateria) return

        const currentResources = currentMateria.resources || []
        updateMateria('resources', [...currentResources, newResource])
    }

    const updateResource = (index, field, value) => {
        const currentMateria = content.materias?.[selectedMateria]
        if (!currentMateria) return

        const currentResources = [...(currentMateria.resources || [])]
        currentResources[index] = { ...currentResources[index], [field]: value }
        updateMateria('resources', currentResources)
    }

    const removeResource = (index) => {
        const currentMateria = content.materias?.[selectedMateria]
        if (!currentMateria) return

        const currentResources = [...(currentMateria.resources || [])]
        currentResources.splice(index, 1)
        updateMateria('resources', currentResources)
    }

    // Safety check for content structure
    if (!content || !content.home || !content.materias) {
        return <div className="editor-page"><div className="container">Cargando estructura...</div></div>
    }

    return (
        <div className="editor-page">
            <div className="editor-header">
                <div className="container">
                    <div className="header-controls">
                        <div className="header-title-group">
                            <button onClick={() => navigate('/admin')} className="back-button" title="Volver al Panel">
                                <ArrowLeft size={24} />
                            </button>
                            <h1>Editor de Contenido</h1>
                        </div>
                        <div className="actions">
                            <button onClick={handleReset} className="action-button secondary" title="Restablecer">
                                <RefreshCw size={20} />
                            </button>
                            <button onClick={handleSave} className="action-button primary">
                                <Save size={20} />
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                    {message && <div className="message-toast">{message}</div>}
                </div>
            </div>

            <div className="container">
                <div className="editor-container">
                    <div className="editor-tabs">
                        <button
                            className={activeTab === 'home' ? 'active' : ''}
                            onClick={() => setActiveTab('home')}
                        >
                            <Layout size={18} />
                            Página Principal
                        </button>
                        <button
                            className={activeTab === 'materias' ? 'active' : ''}
                            onClick={() => setActiveTab('materias')}
                        >
                            <BookOpen size={18} />
                            Materias
                        </button>
                    </div>

                    <div className="editor-content">
                        {activeTab === 'home' && (
                            <div className="form-section">
                                <h2>Información General</h2>
                                <div className="form-group">
                                    <label>Título Principal</label>
                                    <input
                                        type="text"
                                        value={content.home.title || ''}
                                        onChange={(e) => updateHome('title', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subtítulo</label>
                                    <input
                                        type="text"
                                        value={content.home.subtitle || ''}
                                        onChange={(e) => updateHome('subtitle', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Información General</label>
                                    <p className="help-text">
                                        Escribe y formatea los avisos generales.
                                    </p>
                                    <RichTextEditor
                                        value={content.home.generalInfo || ''}
                                        onChange={(val) => updateHome('generalInfo', val)}
                                        placeholder="Escribe la información general aquí..."
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'materias' && (
                            <div className="form-section">
                                <div className="materia-selector">
                                    <label>Seleccionar Materia:</label>
                                    <select
                                        value={selectedMateria}
                                        onChange={(e) => setSelectedMateria(e.target.value)}
                                    >
                                        {Object.values(content.materias).map(m => (
                                            <option key={m.id} value={m.id}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {content.materias[selectedMateria] ? (
                                    <div className="materia-editor">
                                        <div className="form-group">
                                            <label>Nombre de la Materia</label>
                                            <input
                                                type="text"
                                                value={content.materias[selectedMateria].name || ''}
                                                onChange={(e) => updateMateria('name', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Contenido</label>
                                            <p className="help-text">
                                                Escribe y formatea el contenido de la materia. Puedes pegar imágenes o usar el botón de imagen para subirlas.
                                            </p>
                                            <RichTextEditor
                                                value={content.materias[selectedMateria].content || ''}
                                                onChange={(val) => updateMateria('content', val)}
                                                placeholder="Escribe el contenido de la materia aquí..."
                                            />
                                        </div>

                                        <div className="resources-editor">
                                            <div className="resources-header">
                                                <h3>Recursos y Enlaces</h3>
                                                <button onClick={addResource} className="add-button">
                                                    <Plus size={16} /> Agregar Recurso
                                                </button>
                                            </div>

                                            <div className="resources-list">
                                                {(content.materias[selectedMateria].resources || []).map((resource, index) => (
                                                    <div key={index} className="resource-item">
                                                        <div className="resource-inputs">
                                                            <input
                                                                placeholder="Título del recurso"
                                                                value={resource.title || ''}
                                                                onChange={(e) => updateResource(index, 'title', e.target.value)}
                                                            />
                                                            <input
                                                                placeholder="URL (https://...)"
                                                                value={resource.url || ''}
                                                                onChange={(e) => updateResource(index, 'url', e.target.value)}
                                                            />
                                                            <input
                                                                placeholder="Descripción (opcional)"
                                                                value={resource.description || ''}
                                                                onChange={(e) => updateResource(index, 'description', e.target.value)}
                                                            />
                                                        </div>
                                                        <button onClick={() => removeResource(index)} className="remove-button">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {(!content.materias[selectedMateria].resources || content.materias[selectedMateria].resources.length === 0) && (
                                                    <p className="no-resources">No hay recursos agregados.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="error-message">
                                        Materia no encontrada.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
