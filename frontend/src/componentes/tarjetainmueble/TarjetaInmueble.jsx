import React, { useState } from 'react';
import './TarjetaInmueble.css';

// Estilos en línea para la tarjeta
const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgb(100, 200, 250)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    maxwidth: '300px', // Ancho fijo para la tarjeta
    margin: '10px'
};

const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
};

// Componente PropertyCard
const TarjetaInmueble = ({ type, ciudad, descripcion, habitaciones, metros, altura, precio, imagen }) => (
    <div style={cardStyle}>
        <h2>{type} en {ciudad}</h2>
        <p>{descripcion}</p>
        <img src={imagen} alt={type}    />
        <ul>
            <li>Habitaciones: {habitaciones}</li>
            <li>Metros cuadrados: {metros} m²</li>
            <li>Altura: {altura} m</li>
            <li>Precio: ${precio.toLocaleString()}</li>
        </ul>
        <button style={buttonStyle} onClick={() => alert('Solicitud para pedir cita enviada')}>
            Pedir Cita
        </button>
    </div>
);

export default TarjetaInmueble;