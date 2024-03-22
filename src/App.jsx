import React, { useState, useEffect } from 'react';
import './styles.css';

const API_KEY = 'c1566c171b6362337607ba460485b386';

function ClimaCiudad({ ciudad, nombre }) {
    const [temperatura, setTemperatura] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const obtenerTemperatura = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${API_KEY}`);
                const data = await response.json();
                setTemperatura(data.main.temp);

                if (data.main.temp > 30) {
                    setMensaje('Hace mucho calor');
                } else if (data.main.temp < 30) {
                    setMensaje('Hace mucho frío');
                } else {
                    setMensaje('');
                }
            } catch (error) {
                console.error('Error al obtener la temperatura:', error);
            }
        };

        obtenerTemperatura();
    }, [ciudad]);

    return (
        <div className="ciudad">
            {temperatura !== null && (
                <div>
                    <p>Temperatura actual en {nombre}: {temperatura}°C</p>
                    {mensaje && <p>{mensaje}</p>}
                </div>
            )}
        </div>
    );
}

function App() {
    const ciudades = [
        { id: 'BUE', nombre: 'Buenos Aires' },
        { id: 'MAD', nombre: 'Madrid' },
    ];

    return (
        <div className="container">
            <h1>Clima por el mundo</h1>
            <div className="ciudades">
                {ciudades.map(ciudad => (
                    <ClimaCiudad key={ciudad.id} ciudad={ciudad.id} nombre={ciudad.nombre} />
                ))}
            </div>
        </div>
    );
}

export default App;