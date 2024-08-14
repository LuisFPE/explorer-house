import "./house.scss";


const House = ()=>{
    const house = useLoaderData();
    console.log("house: ", house)

    return (
        <article>
 
            <section className="house-card">
                    <h2>{house.precio}</h2>
                    <div id="house-info">
                        <p> <span>Dueño: </span> {house.owner.username}</p>
                        <p> <span>Tipo: </span> {house.tipo}</p>
                        <p> <span>Descripcion: </span> {house.descripcion}</p>
                        <p> <span>Habitaciones: </span> {house.habitaciones}</p>
                        <p> <span>Metros Cuadrados: </span> {house.metros}</p>
                        <p> <span>Altura: </span> {house.altura}</p>
                         
                    </div>
            </section>
        </article>
    )
}

export default House;