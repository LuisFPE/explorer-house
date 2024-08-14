import React, { useState } from 'react';
import TarjetaInmueble from './tarjetainmueble/TarjetaInmueble';
 import './Inmuebles.css'; 

const Inmuebles = ({inmuebles}) => {




  return (
    <div className="inmuebles-container">
      {inmuebles.map((inmueble, id) => (
        <TarjetaInmueble
          id={index}
          type={inmueble.type}
          ciudad={inmueble.ciudad}
          descripcion={inmueble.descripcion}
          habitaciones={inmueble.habitaciones}
          metros={inmueble.metros}
          altura={inmueble.altura}
          precio={inmueble.precio}
          imagen={inmueble.imagen}
        />
      ))}
    </div>
  );
};

export default Inmuebles;
