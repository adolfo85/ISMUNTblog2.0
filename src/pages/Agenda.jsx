import { useState, useEffect } from 'react'
import { contentService } from '../services/contentService'
import { Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import './Agenda.css'

export default function Agenda() {
    const [content, setContent] = useState(null)
    const [expandedMonth, setExpandedMonth] = useState(null)

    useEffect(() => {
        const agendaContent = contentService.getSection('agenda')
        setContent(agendaContent)
    }, [])

    if (!content) return null

    // Sample events structure
    const sampleEvents = [
        {
            month: 'Noviembre 2024',
            events: [
                {
                    date: '25',
                    name: 'Orquesta Sinfónica UNT - Brahms',
                    time: '21:00 hs',
                    location: 'Teatro Alberdi'
                },
                {
                    date: '28',
                    name: 'Concierto de Música de Cámara',
                    time: '20:30 hs',
                    location: 'Centro Cultural Virla'
                }
            ]
        },
        {
            month: 'Diciembre 2024',
            events: [
                {
                    date: '05',
                    name: 'Recital de Graduación',
                    time: '19:00 hs',
                    location: 'Capilla Lourdes'
                }
            ]
        }
    ]

    const toggleMonth = (month) => {
        setExpandedMonth(expandedMonth === month ? null : month)
    }

    return (
        <div className="agenda-page">
            {/* Header */}
            <div className="agenda-header">
                <div className="container">
                    <div className="header-content">
                        <Calendar size={48} className="header-icon" />
                        <div>
                            <h1>{content.title}</h1>
                            <p className="header-subtitle">{content.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Event */}
            <div className="container">
                <div className="submit-banner glass-effect">
                    <p>¿Querés publicar tu evento en la agenda?</p>
                    <a
                        href={content.submitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="submit-button"
                    >
                        <span>Click aquí</span>
                        <ExternalLink size={16} />
                    </a>
                </div>

                {/* Events Accordion */}
                <div className="events-section">
                    <h2 className="section-title">Próximos Eventos</h2>

                    {sampleEvents.map((monthData) => (
                        <div key={monthData.month} className="month-accordion">
                            <button
                                className={`month-header ${expandedMonth === monthData.month ? 'expanded' : ''}`}
                                onClick={() => toggleMonth(monthData.month)}
                            >
                                <span>{monthData.month}</span>
                                {expandedMonth === monthData.month ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>

                            {expandedMonth === monthData.month && (
                                <div className="month-content">
                                    <table className="events-table">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Evento</th>
                                                <th>Horario</th>
                                                <th>Lugar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {monthData.events.map((event, index) => (
                                                <tr key={index}>
                                                    <td className="event-date">{event.date}</td>
                                                    <td className="event-name">{event.name}</td>
                                                    <td>{event.time}</td>
                                                    <td>{event.location}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
