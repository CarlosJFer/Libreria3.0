# Librería 3.0

## Descripción
**Librería 3.0** es una plataforma web moderna diseñada para gestionar de manera eficiente el catálogo y las operaciones de una librería. 
Este proyecto ofrece una solución completa para administrar libros, clientes y transacciones, optimizando la experiencia tanto para 
los usuarios como para los administradores.

## Funcionalidades

### 1. Login/Registro
- **Descripción**: Módulo para la creación de cuentas de usuario y autenticación.
- **Funcionalidades**:
  - Registro de nuevos usuarios con datos básicos (nombre, correo electrónico, contraseña).
  - Validación de correo electrónico para evitar duplicados.
  - Autenticación con credenciales (correo electrónico y contraseña).

### 2. Búsqueda de Productos
- **Descripción**: Permitir a los usuarios encontrar libros por criterio.
- **Funcionalidades**:
  - Buscador rápido por nombre del libro.

### 3. Carrito de Compras
- **Descripción**: Sistema para gestionar la compra de libros.
- **Funcionalidades**:
  - Agregar productos al carrito.
  - Visualizar el carrito en la barra de navegación.
  - Mostrar la cantidad de artículos en el carrito en tiempo real.
  - Actualizar las cantidades de los productos en el carrito.
  - Eliminar artículos del carrito.

### 4. Pasarela de Pagos
- **Descripción**: Integración con un servicio de pago seguro para procesar transacciones.
- **Funcionalidades**:
  - Sistema de pago seguro.
  - Sistema utilizado: Mercado Pago.

### 5. Entrega de E-books
- **Descripción**: Sistema para enviar e-books a los usuarios.
- **Funcionalidades**:
  - Acceso automático a e-books en formato PDF del usuario tras la compra.

### 6. Sistema de Perfiles con Rangos
- **Descripción**: Sistema de perfiles de usuario con diferentes niveles de acceso.
- **Funcionalidades**:
  - Perfiles con rangos: Administrador (realizar CRUD de componentes, gestión de órdenes, productos, usuarios) y Usuario (accesibilidad y privilegios limitados).

### Funcionalidades Próximamente
- Agregar más servicios de pago a la Pasarela de Pagos:
  - Wee!Pagos, PayPal, Google Pay.
- Foro de Discusiones:
  - Espacio para que los usuarios registrados debatan sobre libros.
  - Posibilidad de crear y responder hilos.
- Sistema de Suscripciones:
  - Sistema de suscripción mensual para recibir libros físicos (Estilo “Mystery Box”).
  - Sistema de rangos de usuarios, suscripciones mensuales, cobro automático, envío de facturas, elección aleatoria de libros, seguimiento del envío.
- Sistema de Venta de Libros por Parte de Usuarios:
  - Permite a los usuarios crear y vender sus propios libros digitales.
  - Sistema de carga de archivos en formato PDF, previsualización del contenido, cobro mensual para los "Creadores".
- Sistema de Entregas de Libros Físicos con Contador de Stock:
  - Gestión de entrega de libros físicos, envío de facturas y códigos de seguimiento, visualización del stock.
- Sistema de Recopilación de Libros Recomendados:
  - Mostrar libros recomendados por la comunidad, recopilación de datos de libros con mejor calificación.
- Sistema de Recopilación de Libros Más Vendidos:
  - Mostrar libros más vendidos, recopilación de datos de libros más vendidos.
- **Contacto**:
  - **Descripción**: Formulario para que los usuarios puedan realizar consultas.
  - **Funcionalidades**:
    - Sección dedicada al formulario de contacto.

## Tecnologías Utilizadas
- **Editor de Código**: Visual Studio Code.
- **Backend**:
  - Lenguaje: JavaScript.
  - Entorno de Ejecución: Node.js.
  - Administrador de Paquetes: npm.
  - Dependencias:

    - axios
    - bcryptjs
    - cors
    - dotenv
    - express
    - joi
    - jsonwebtoken
    - mercadopago
    - mongoose
    - morgan

- **Frontend**:
  - Libreria: React.
  - Herramienta de Construcción: Vite.
  - Dependencias:
    - @mercadopago/sdk-react
    - @reduxjs/toolkit
    - axios
    - bootstrap
    - jsonwebtoken
    - jwt-decode
    - mercadopago
    - prop-types
    - react
    - react-bootstrap
    - react-dom
    - react-hook-form
    - react-icons
    - react-redux
    - react-router-dom
    - redux-thunk

Puedes encontrar las dependencias y sus versiones detalladas en los archivos del proyecto.

## Instalación y Ejecución

### Backend

1. Clona el repositorio:
  
   git clone https://github.com/CarlosJFer/Libreria3.0_Back.git

2. Abre el proyecto en una nueva ventana de editor de código.

3. Instala las dependencias por terminal en editor de codigo ejecutando el siguiente comando:

	npm install	

4.Crea un archivo .env en la raíz del proyecto y declara las siguientes variables de entorno (datos a modo de ejemplo):

	PORT=	4000
	DB_URI=<tu_url_de_base_de_datos>
	JWT_SECRET=<tu_clave_secreta>
	MERCADOPAGO_ACCESS_TOKEN=<tu_token_de_mercadopago>

5.Inicia el servidor:

	npm start


6. Ejecutar nodemon.js para optimiar experiencia de desarrollo:
	
	npm run dev


### Frontend 

1.Clona el repositorio:

	https://github.com/CarlosJFer/Libreria3.0_Front.git


2.Instala las dependencias necesarias:

	npm install 

3.Inicia el modo de desarrollo:
	
	npm run dev

4.Accede a la aplicación en tu navegador en http://localhost:5173


## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Esto significa que eres libre de usar, modificar y distribuir el código, siempre y cuando incluyas la atribución original.  

Puedes leer más detalles en el archivo [LICENSE](./LICENSE) o en el siguiente enlace:  
[Licencia MIT](https://opensource.org/licenses/MIT).

## Autores

- **Alegre, Agustín Emiliano**  
- **Fernandez, Carlos Jesús**  
- **Gonzalez, María Clara**  
- **Lopez Gutierrez, Daniel Benjamín**  
- **Reyes Hiroz, Emilio Sebastián** 

## Contacto
Si tienes preguntas o sugerencias, no dudes en contactarnos:
- Email:holalibreria3.0@gmail.com


## Contribuciones
Las contribuciones son bienvenidas. Por favor, sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama con tus cambios (`git checkout -b feature/nueva-funcionalidad`).
3. Haz un commit (`git commit -m "Agregada nueva funcionalidad"`).
4. Haz un push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.


