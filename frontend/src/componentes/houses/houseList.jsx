import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "../../componentes/modal/Modal";
import CreateHouse from "./CreateHouse";
import "./houseList.scss";

const HousesList = () => {
    const [houses,setHouses] = useState(useLoaderData());
    const [creatingHouse,setCreatingHouse] = useState(false);
    const housesHtml = houses.map(house => {
        return (
            <article className="houses-list-element" key={house._id}>
                <h2>{house.precio}</h2>       
                <p>Ciudad: {house.ciudad}</p>
                <p>Metros: {house.metros}</p>
                <Link className="btn-ver" to={`/house/${house._id}`}>Ver Propiedad</Link>
            </article>
        )
    })
    return (
        <>
        <section id="houseList">
            {creatingHouse ?
                <Modal onClose={()=>setCreatingHouse(false)}>
                    <CreateHouse onCreate={()=>setCreatingHouse(false)} />
                </Modal>
                :
                <button onClick={()=>setCreatingHouse(true)} id="btn-create">Publicar Propiedad</button>
            }

            <section className="house-list">
                {housesHtml}

            </section>
         
        </section>
        </>   
    )
}

export default HousesList