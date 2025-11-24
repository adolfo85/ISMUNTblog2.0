import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { contentService } from '../services/contentService'
import { BookOpen, FileText, Link as LinkIcon } from 'lucide-react'
import './Materia.css'

export default function Materia() {
    const { materiaId } = useParams()
    const [materia, setMateria] = useState(null)

    useEffect(() => {
        const loadMateria = async () => {
            const data = await contentService.getMateria(materiaId)
            setMateria(data)
        }
        loadMateria()
    }, [materiaId])

    if (!materia) {
        return (
            <div className="materia-page">
                <div className="container">
                    <div className="not-found">
                        <h1>Materia no encontrada</h1>
                        <p>La materia que buscas no existe.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="materia-page">
            {/* Header */}
            <div className="materia-header">
                <div className="container">
                    <div className="header-content">
                        <BookOpen size={48} className="header-icon" />
                        <h1>{materia.name}</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container">
                <div className="materia-content">
                    {materia.content ? (
                        <div className="content-box">
                            <div dangerouslySetInnerHTML={{ __html: materia.content }} />
                        </div>
                    ) : (
                        <div className="empty-state">
                            <FileText size={64} />
                            <h3>Sin contenido disponible</h3>
                            <p>El administrador aún no ha agregado contenido para esta materia.</p>
                        </div>
                    )}

                    {/* Resources */}
                    {materia.resources && materia.resources.length > 0 && (
                        <div className="resources-section">
                            <h2>Recursos y Enlaces</h2>
                            <div className="resources-grid">
                                {materia.resources.map((resource, index) => (
                                    <a
                                        key={index}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="resource-card"
                                    >
                                        <LinkIcon size={24} />
                                        <div>
                                            <h4>{resource.title}</h4>
                                            {resource.description && (
                                                <p>{resource.description}</p>
                                            )}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
