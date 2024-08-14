import { createPropiedad } from "../../api/apiPropiedad";
import "./CreateHouse.scss"
const CreateHouse = ({onCreate})=>{

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const tipo = e.target.tipo.value;    
        const ciudad = e.target.ciudad.value;  
        const descripcion = e.target. descripcion.value;      
        const habitaciones = e.target.habitaciones.value;  
        const metros = e.target.metros.value;  
        const altura = e.target.altura.value;  
        const precio = e.target.precio.value;   

        const data = {tipo, ciudad, descripcion, habitaciones, metros, altura, precio};
        console.log("name",data)
        const result = await createPropiedad(data);
        console.log("result",result)
        onCreate();
        window.location.reload()
    }
    return (
        <form action="" className="create-house" onSubmit={handleSubmit}>
            <label htmlFor="tipo" >Tipo:</label>
            <input type="text" name="tipo"/>
            <label htmlFor="ciudad" >Ciudad:</label>
            <input type="text" name="ciudad"/>
            <label htmlFor="descripcion" >Descripcion</label>
            <textarea name="descripcion"></textarea>
            <label htmlFor="habitaciones" >Habitaciones:</label>
            <input type="number" name="habitaciones"/>
            <label htmlFor="metros" >Metros:</label>
            <input type="number" name="metros"/>
            <label htmlFor="altura" >Altura:</label>
            <input type="number" name="altura"/>
            <label htmlFor="precio" >Precio:</label>
            <input type="text" name="precio"/>

            <button type="submit" className="btn-create-house">Publicar</button>
        </form>
    )
}
export default CreateHouse;