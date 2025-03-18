// Importamos los módulos necesarios
const express = require("express"); // Framework para crear el servidor web
const { MongoClient } = require("mongodb"); // Cliente para conectarnos a MongoDB
const cors = require("cors"); // Middleware para evitar problemas de CORS

// Creamos una instancia de Express
const app = express();

// Definimos constantes necesarias
const PORT = 3000; // Puerto donde correrá nuestro servidor
const MONGO_URI = "mongodb://localhost:27017"; // Dirección del servidor MongoDB
const nombre_BD = "BD_Jugadores"; // Nombre de la base de datos que nos conectamos
const nombre_coleccion_jugador = "Jugador"; // Nombre de la colección que queremos recuperar
const nombre_coleccion_equipo = "Equipo"; // Nombre de la colección que queremos recuperar

// Middleware para permitir peticiones desde el frontend
app.use(cors()); // Habilita CORS para evitar bloqueos en las peticiones del navegador
app.use(express.json()); // Permite recibir datos en formato JSON en las peticiones

/**
* Función asíncrona para conectarse a la base de datos de MongoDB
* @returns Colección "usuario" dentro de la BD "BD_usuarios"
*/
async function conectarJugador() {
const client = new MongoClient(MONGO_URI); // Creamos un nuevo cliente de MongoDB
await client.connect(); // Nos conectamos al servidor de MongoDB
console.log("Conectado a MongoDB"); // Confirmamos la conexión en la consola
return client.db(nombre_BD).collection(nombre_coleccion_jugador); // Devolvemos la colección "usuario" dentro de la BD "BD_usuarios"
}
async function conectarEquipo() {
    const client = new MongoClient(MONGO_URI); // Creamos un nuevo cliente de MongoDB
    await client.connect(); // Nos conectamos al servidor de MongoDB
    console.log("Conectado a MongoDB"); // Confirmamos la conexión en la consola
    return client.db(nombre_BD).collection(nombre_coleccion_equipo); // Devolvemos la colección "usuario" dentro de la BD "BD_usuarios"
    }

// Funcionalidad GET de la base de datos para obtener los usuarios
// Sería el equivalente a escribir en el navegador: http://localhost:3000/usuario
app.get("/usuario", async (req, res) => {
try {
const collection = await conectarJugador(); // Obtenemos la colección de usuarios
 let filtro = {}; // Creamos un objeto vacío para aplicar filtros opcionales

// Si hay un parámetro "nombre" en la URL, lo usamos como filtro con búsqueda flexible
 if (req.query.nombre) {
 filtro.nombre = { $regex: req.query.nombre, $options: "i" }; // Búsqueda insensible a mayúsculas/minúsculas
 }
// Si hay un parámetro "equipo" en la URL, lo usamos como filtro con búsqueda flexible
 else if (req.query.equipo) {
 filtro.equipo = { $regex: req.query.equipo, $options: "i" };
 }
 // Si hay un parámetro "posicion" en la URL, lo usamos como filtro con búsqueda flexible
 else if (req.query.posicion) {
    filtro.posicion = { $regex: req.query.posicion, $options: "i" };
    }
    // Si hay un parámetro "nacionalidad" en la URL, lo usamos como filtro con búsqueda flexible
 else if (req.query.nacionalidad) {
    filtro.nacionalidad = { $regex: req.query.nacionalidad, $options: "i" };
    }

 // Buscamos en la colección los usuarios que coincidan con el filtro
 const usuarios = await collection.find(filtro).toArray();

 // Enviamos la lista de usuarios como respuesta en formato JSON
 res.json(usuarios);
 } catch (error) {
 console.error("Error consultando MongoDB:", error); // Mostramos el error en la consola
 res.status(500).json({ error: "Error al obtener los datos." }); // Enviamos un error 500 al frontend
 }
 });

 // Iniciamos el servidor en el puerto especificado
 app.listen(PORT, () => {
 console.log(`Servidor corriendo en http://localhost:${PORT}`); // Confirmación en la consola
 });