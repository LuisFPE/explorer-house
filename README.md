# Explorer House

## Información General

Explorer House es un portal inmobiliario el cual permite ver y publicar todo tipo de propiedades inmobiliarias de manera facil y sencilla para todos los usuarios de la aplicacion idependientemente de si quieren ver diferentes propiedades o publicar una propiedad.

## Funcionalidades Principales

- **Registrase y Loguearse :** El sitio web permite registrar y loguear usuarios.

- **Ver Propiedades :** El sitio web permite ver las diferentes propiedade publicadas.

- **Publicar Propiedades :** El sitio web permite publicar tus propias propiedades.

- **Agendar Citas :** El sitio web permite publicar agendar una cita con el dueño de una propiedad para verla en persona o negociar.

## Notas Adicionales

- Este sitio web esta construida con React y Sass.
- Los términos de uso y la política de privacidad son decididos por los creadores del sitio web.

### Instalación

1. Clonar el repositorio en terminal:
   git clone <URL-del-repositorio>
   cd <nombre-del-proyecto>

2. Instalar las dependencias:
    npm install
    Configurar las variables de entorno:
    Crear un archivo .env en la raíz del proyecto con el siguiente contenido (actualizar con sus propios valores):

3. Crear en raiz .env 

    DB_HOST = explorerHouse
    DB_PORT = 270
    DB_USER = nombre_de_usuario
    DB_PASSWORD = tu_contraseña
    DB_NAME = explorerHouse
    
    JWT_SECRET = donpitojuanotocaelpiano
    SESSION_SECRET = donpitojuanotocaelpiano
    
    APP_PORT = 3016
    APP_HOST = explorerHouse
   

4.  Iniciar el servidor y el front desde la terminal:
   
   - **Servidor**:
   
      ```bash
      cd backend
      docker compose up
      ```
       
   - **Cliente**:
   
      ```bash
      cd frontend
      npm run dev
      ```


## Autor

Este sitio web fue desarrollado por Ivan, Luis y Aitor.
