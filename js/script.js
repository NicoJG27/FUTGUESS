// Definimos constantes necesarias
const PORT = 3000; // Puerto donde correrá nuestro servidor
const nombre_coleccion_jugador = "Jugador"; // Nombre de la colección que queremos recuperar
const nombre_coleccion_equipo = "Equipo"; // Nombre de la colección que queremos recuperar

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Captura de elementos del HTML por su ID
    const nameSearch = document.getElementById("nameSearch"); // Input de búsqueda por nombre
    const equipoSearch = document.getElementById("equipoSearch"); // Input de búsqueda por equipo
    const posicionSearch = document.getElementById("posicionSearch"); // Input de búsqueda por posicion
    const nacionalidadSearch = document.getElementById("nacionalidadSearch"); // Input de búsqueda por nacionalidad
    const searchByNameButton = document.getElementById("searchByNameButton"); // Botón para buscar por nombre
    const searchByequipoButton = document.getElementById("searchByequipoButton"); // Botón para buscar por equipo
    const searchByposicionButton = document.getElementById("searchByposicionButton"); // Botón para buscar por posicion
    const searchBynacionalidadButton = document.getElementById("searchBynacionalidadButton"); // Botón para buscar por nacionalidad
    const showAllButton = document.getElementById("showAllButton"); // Botón para mostrar todos los jugadores
    const output = document.getElementById("output"); // Contenedor donde se mostrarán los resultados
    /**
    * Función para consultar usuarios en el servidor. Si no se pasa ningún filtro devuelve todos los usuarios.
    * @param {string} filtro - Filtro que queremos aplicar a la búsqueda
    * @param {string} valor - Valor del filtro
   */
    async function consultarUsuarios(filtro = "todos", valor = "") {
        try {
            let url = `http://localhost:${PORT}/${nombre_coleccion_jugador}`; // URL base de la API

            //Si se ha indicado un filtro, lo agregamos a la URL con parámetros de consulta
            if (filtro === "nombre") {
                url += `?nombre=${encodeURIComponent(valor)}`; // Búsqueda por nombre
            } else if (filtro === "equipo") {
                url += `?equipo=${encodeURIComponent(valor)}`; // Búsqueda por equipo
            }
            else if (filtro === "nacionalidad") {
                url += `?nacionalidad=${encodeURIComponent(valor)}`; // Búsqueda por nacionalidad
            }

            //Realizamos la petición al servidor con Fetch
            const response = await fetch(url);
            const usuarios = await response.json(); // Convertimos la respuesta a JSON

            // Mostramos los usuarios en la página
            mostrarUsuarios(usuarios);
            console.log("HOLA");

        } catch (error) {
            console.error("Error consultando usuarios:", error); // Mostramos el error en la consola
            output.innerHTML = `<p>Error consultando usuarios: ${error}</p>`; // Mostramos mensaje de error en la interfaz
        }
    }

    /**
    * Muestra los usuarios obtenidos en la página web
    * @param {Array<usuario>} usuarios - Lista de usuarios a mostrar
    * @returns
    */
    function mostrarUsuarios(usuarios) {
        output.innerHTML = ""; // Limpiamos el contenedor de resultados

        // Si no hay usuarios encontrados, mostramos un mensaje
        if (usuarios.length === 0) {
            output.innerHTML = "<p>No se encontraron usuarios.</p>";
            return;
        }

        // Recorremos la lista de usuarios y creamos un div para cada uno
        usuarios.forEach(user => {
            let div = document.createElement("div");
            div.classList.add("grid-item"); // Clase CSS para estilos
            div.innerHTML = `<p><strong><u>Nombre:</u></strong> <span>${user.nombre}</span></p>
                             <p><strong><u>Edad:</u></strong> <span>${user.edad}</span></p>
                             <p><strong><u>Nacionalidad:</u></strong> <span>${user.nacionalidad}</span></p>
                             <p><strong><u>Equipo:</u></strong> <span>${user.equipo}</span></p>
                             <p><strong><u>Dorsal:</u></strong> <span>${user.dorsal}</span></p>
                             <p><strong><u>Posicion:</u></strong> <span>${user.posicion}</span></p>`;
            output.appendChild(div); // Agregamos el div al contenedor de salida
        });
    }

    // Buscar por nombre
    //searchByNameButton.addEventListener("click", () => consultarUsuarios("nombre", nameSearch.value.trim()));
    // Buscar por equipo
    //searchByequipoButton.addEventListener("click", () => consultarUsuarios("equipo", equipoSearch.value.trim()));
    // Buscar por nacionalidad
   // searchBynacionalidadButton.addEventListener("click", () => consultarUsuarios("nacionalidad", nacionalidadSearch.value.trim()));
    // Eventos de búsqueda
  // showAllButton.addEventListener("click", () => consultarUsuarios()); // Mostrar todos los usuarios



    //************************************************************************************************************ */
    //************************************************************************************************************ */
    //************************************************************************************************************ */
    //************************************************************************************************************ */
    //************************************************************************************************************ */
    //************************************************************************************************************ */
    //************************************************************************************************************ */
    const opciones = ["alaves", "athletic", "atletico", "barça", "betis", "celta", "espayol", "getafe", "girona", "leganes", "madrid",
        "mallorca", "osasuna", "palmas", "rayo", "real_sociedad", "sevilla", "valencia", "valladolid", "villareal"];

    function mostrarImagenAleatoria() {
        const equipoAleatorio = opciones[Math.floor(Math.random() * opciones.length)];
        const imagenesDiv = document.getElementById("imagenes");

        imagenesDiv.innerHTML = '<img src="../images/' + equipoAleatorio + '.png" alt="' + equipoAleatorio + '">';   
    }

    document.getElementById("jugar").addEventListener("click", mostrarImagenAleatoria);

});
