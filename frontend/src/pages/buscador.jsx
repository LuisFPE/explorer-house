import React from "react";
import { useState, useEffect } from "react";

import { Navbar } from "../componentes/navbar.jsx";

import "../scss/buscador.scss"


function Buscador() {




    return (
        <>
            <Navbar />
                <div id='buscador-global'>
                    <h1>Buscador de propiedades</h1>
                </div>
        </>
    )
}


export {
    Buscador
}