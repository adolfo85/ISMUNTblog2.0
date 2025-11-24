import { useState, useEffect } from 'react'
import { contentService } from '../services/contentService'
import { Calendar } from 'lucide-react'
import WeatherWidget from '../components/WeatherWidget'
import './Home.css'

export default function Home() {
    const [content, setContent] = useState(null)

    useEffect(() => {
        const loadContent = async () => {
            const data = await contentService.getSection('home')
            setContent(data)
        }
        loadContent()
    }, [])

    if (!content) return null

    return (
        <div className="home-page">
            {/* Hero Section */}
            <div className="container" style={{ marginTop: '3rem' }}>
                {/* General Info */}
                <div className="general-info animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="section-header">
                        <Calendar size={32} />
                        <h2>Información General</h2>
                    </div>
                    <div className="info-box">
                        <div dangerouslySetInnerHTML={{ __html: content.generalInfo }} />
                    </div>
                </div>

                {/* Tools Section */}
                <div className="tools-section animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="tools-container">
                        <div className="tool-card chord-builder-card">
                            <div className="card-content">
                                <div className="text-content">
                                    <h3>Constructor de Acordes</h3>
                                    <p className="description-text">Diseña, escucha y experimenta con tus acordes en esta herramienta externa.</p>
                                    <a
                                        href="https://deboeckchordbuilderv2.netlify.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-button"
                                    >
                                        Abrir herramienta &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="tool-card weather-card">
                            <WeatherWidget />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
