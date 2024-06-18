import multer from 'multer'
import fs from 'fs'

const PATH = './uploads/' // ruta raíz donde se guardan los archivos


const storage = multer.diskStorage({

    destination: function (req, file, cb) { // Destino del archivo
        const userId = req.user?._id  // sacamos el usuario de la petición
        if (!userId) return cb(new Error('User not found'))//  Si no hay usuario, devolverá un error
        const path = `${PATH}${userId}` // ruta final donde se guarda el archivo.
        if (!fs.existsSync(path)) { // Crear directorio si no existe
            fs.mkdirSync(path, { recursive: true })
        }
        cb(null, path) // devolvemos la ruta donde se guarda el archivo
    },
    filename: function (req, file, cb) { // Nombre del archivo
        const newFileName = req.body.fileName || file.originalname // si no se envía un nombre, se toma el nombre original del archivo
        const fileName = newFileName.split(' ').join('-') // reemplazar espacios por guiones
        req.fileName = fileName // guardamos el nombre por si lo necesitamos después
        cb(null, fileName) // devolvemos el nombre del archivo
    }
})

const upload = multer({ storage: storage })
export default upload