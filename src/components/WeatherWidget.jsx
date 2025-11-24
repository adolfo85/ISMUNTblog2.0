import { useState, useEffect } from 'react'
import { Cloud, Droplets, Thermometer, AlertTriangle, Info } from 'lucide-react'
import './WeatherWidget.css'

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Coordinates for San Miguel de Tucumán
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=-26.82&longitude=-65.22&current=temperature_2m,relative_humidity_2m&timezone=America%2FArgentina%2FTucuman'
                )

                if (!response.ok) throw new Error('Error al obtener datos del clima')

                const data = await response.json()
                setWeather({
                    temp: Math.round(data.current.temperature_2m),
                    humidity: data.current.relative_humidity_2m
                })
            } catch (err) {
                console.error(err)
                setError('No se pudo cargar el clima')
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
        // Refresh every 30 minutes
        const interval = setInterval(fetchWeather, 30 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    const getHumidityMessage = (humidity) => {
        if (humidity >= 75) return {
            text: "¡Humedad Alta! Protege tu instrumento.",
            type: "warning",
            detail: "Guarda instrumentos de madera en su estuche con silica gel."
        }
        if (humidity <= 30) return {
            text: "Ambiente muy seco.",
            type: "warning",
            detail: "Usa humidificadores para evitar grietas en la madera."
        }
        return {
            text: "Condiciones ideales para tocar.",
            type: "success",
            detail: "¡A estudiar se ha dicho!"
        }
    }

    if (loading) return <div className="weather-widget loading">Cargando clima...</div>
    if (error) return null // Hide widget on error to not clutter UI

    const status = getHumidityMessage(weather.humidity)

    return (
        <div className="weather-widget">
            <div className="weather-header">
                <h3><Cloud size={20} /> Clima en el ISMUNT</h3>
                <span className="location">San Miguel de Tucumán</span>
            </div>

            <div className="weather-stats">
                <div className="stat-item">
                    <Thermometer size={24} className="icon-temp" />
                    <span className="value">{weather.temp}°C</span>
                    <span className="label">Temp</span>
                </div>
                <div className="stat-item">
                    <Droplets size={24} className="icon-humidity" />
                    <span className="value">{weather.humidity}%</span>
                    <span className="label">Humedad</span>
                </div>
            </div>

            <div className={`weather-alert ${status.type}`}>
                <div className="alert-header">
                    {status.type === 'warning' ? <AlertTriangle size={18} /> : <Info size={18} />}
                    <span className="alert-title">{status.text}</span>
                </div>
                <p className="alert-detail">{status.detail}</p>
            </div>
        </div>
    )
}
