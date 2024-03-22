import React, { useState, useEffect } from 'react';
import './styles.css';

function ClimaCiudad({ ciudad, apiKey }) {
    const [temperatura, setTemperatura] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const obtenerTemperatura = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}`);
                const data = await response.json();
                setTemperatura(data.main.temp);

                if (data.main.temp > 30) {
                    setMensaje('Hace mucho calor');
                } else if (data.main.temp < 10) {
                    setMensaje('Hace mucho frío');
                } else {
                    setMensaje('');
                }
            } catch (error) {
                console.error('Error al obtener la temperatura:', error);
            }
        };

        obtenerTemperatura();
    }, [ciudad, apiKey]);

    return (
        <div className="ciudad">
            {temperatura !== null && (
                <div>
                    <p>Temperatura actual en {ciudad}: {temperatura}°C</p>
                    {mensaje && <p>{mensaje}</p>}
                </div>
            )}
        </div>
    );
}

function SelectorCiudad() {
    const [ciudad, setCiudad] = useState('BUE');

    const handleChangeCiudad = (e) => {
        setCiudad(e.target.value);
    };

    return (
        <div className="selector">
            <h2>Selecciona una ciudad:</h2>
            <select value={ciudad} onChange={handleChangeCiudad}>
                <option value="BUE">Buenos Aires</option>
                <option value="MVD">Montevideo</option>
                <option value="BSB">Brasilia</option>
            </select>
            <ClimaCiudad ciudad={ciudad} apiKey={c1566c171b6362337607ba460485b386} />
        </div>
    );
}

function App() {
    return (
        <div className="container">
            <h1>Temperatura en Ciudades</h1>
            <SelectorCiudad />
        </div>
    );
}

export default App;