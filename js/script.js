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
    searchByNameButton.addEventListener("click", () => consultarUsuarios("nombre", nameSearch.value.trim()));
    // Buscar por equipo
    searchByequipoButton.addEventListener("click", () => consultarUsuarios("equipo", equipoSearch.value.trim()));
    // Buscar por nacionalidad
    searchBynacionalidadButton.addEventListener("click", () => consultarUsuarios("nacionalidad", nacionalidadSearch.value.trim()));
    // Eventos de búsqueda
    showAllButton.addEventListener("click", () => consultarUsuarios()); // Mostrar todos los usuarios
});
document.addEventListener("DOMContentLoaded", () => {
    const opciones = ["alaves", "athletic", "atletico", "barça", "betis", "celta", "espayol", "getafe", "girona", "leganes", "madrid",
        "mallorca", "osasuna", "palmas", "rayo", "real_sociedad", "sevilla", "valencia", "valladolid", "villareal"];

    function mostrarEquipoAleatoria() {
        const equipoAleatorio = opciones[Math.floor(Math.random() * opciones.length)];

        const imagenesDiv = document.getElementById("div_equipo");
        imagenesDiv.innerHTML = '<img class="imagen_equipo_adivinar" src="../images/equipos/' + equipoAleatorio + '.png" alt="' + equipoAleatorio + '"><input class="inputAdivinar" id="inputAdivinar" type="text">';
        imagenesDiv.classList.add("div_equipo"); // Clase CSS para estilos
    }

    document.getElementById("jugar_equipo").addEventListener("click", mostrarEquipoAleatoria);

});

document.addEventListener("DOMContentLoaded", () => {
    const opcion = document.getElementById("jugar_jugador");

    const opciones = ["Juanmi Latasa", "Marcos André", "Sylla, Chuki", "Robert Kenedy", "Anuar Tuhami", "Selim Amallah", "Stanko Jurić", "Amath Ndiaye", "Darwin Machís", "Mario Martín", "Raúl Moro", "Iván Sanchez", "Florian Grillitsch", "Nikitscher", "Adam Aznou", "Antonio Candela", "Lucas Henrique", "Joseph Aidoo", "Eray Cömert", "Cenk Özkacar", "Javi Sánchez", "David Torres", "Luis Pérez", "Karl Hein", "André Ferreira", "Fábio Silva", "Sandro Ramírez", "Jaime Mata", "Oli McBurnie", "Benito Ramírez", "Marc Cardona", "Dário Essugo", "Adnan Januzaj", "Stefan Bajcetic", "Kirian Rodríguez", "Viti Rozada", "Manu Fuster", "Enzo Loiodice", "Alberto Moleiro", "José Gómez Campaña", "Javi Muñoz", "Juanma Herzog", "Álex Muñoz", "Scott McKenna", "Andy Pelmard", "Álex Suárez", "Mika Mármol", "Marvin Park", "Dinko Horkaš", "Jasper Cillessen", "Pau Cabanes", "Kike García", "Carlos Martín", "Toni Martínez", "Asier Villalibre", "Joan Jordán", "Carlos Protesoni", "Carles Aleñá", "Jon Guridi", "Tomás Conechny", "Antonio Blanco", "Carlos Vicente", "Ander Guevara", "Moussa Diarra",
        , "Hugo Novoa", "Nahuel Tenaglia", "Santiago Mouriño", "Abdel Abqar", "Aleksandar Sedlar", "Manu Sánchez", "Facundo Garcés", "Adrián Rodríguez", "Jesús Owono", "Antonio Sivera", "Munir", "Diego García", "Duk", "Dani Raba", "Miguel de la Fuente", "Julián Chicco", "Roberto López", "Yvan Neyou", "Darco Brašanac", "Juan Cruz", "Seydouba Cissé", "Óscar Rodríguez", "Renato Tapia", "Matija Nastasić", "Javi Hernández", "Enriq Franquesa", "Valentin Rosier", "Sergio González", "Borna Barišić", "Jorge Sáenz", "Adrià Altamira", "Álvaro Abajas Martín", "Marko Dmitrović", "Juan Soriano", "Diego López", "Umar Sadiq", "Rafa Mir", "Hugo Duro", "Sergi Canós", "Hugo Guillamón", "Enzo Barrenechea", "Fran Pérez", "José Luis García Vayá", "Iván Jaime", "André Almeida", "Yarek Gasiorowski",
        "Jesús Vázquez", "Dimitri Foulquier", "Max Aarons", "César Tárrega", "José Luis Gayà", "Mouctar Diakhaby", "Cristhian Mosquera", "Giorgi Mamardashvili", "Stole Dimitrievski", "Jaume Domènech", "Jofre Carreras", "Walid Cheddira", "Pere Milla", "Alejo Véliz", "Javi Puado", "Roberto Fernández", "Antoniu Roca", "Alex Král", "Urko González de Zárate", "Álvaro aguado", "José Gragera", "Pol Lozano", "Edu Expósito", "Pablo Ramón", "Omar El Hilali", "Carlos Romero", "Brian Oliván", "Álvaro Tejero", "Leandro Cabrera", "Fernando Calero", "Marash Kumbulla", "Sergi Gómez", "Àngel Fortuño", "Fernando Pacheco", "Joan García", "Jose Manuel Arnáiz", "Bryan Zaragoza", "Ante Budimir", "Raúl García", "Iker Muñoz", "Moi Gómez", "Rubén García", "Kike Barja", "Aimar Oroz", "Pablo Ibáñez", "Jon Moncayola", "Lucas Torró", "Alejandro Catena", "Abel Bretones", "Enzo Boyomo", "Rubén Peña", "Jesús Areso", "Jorge Herrando", "Unai García", "Juan Cruz Armada", "Aitor Fernández", "Sergio Herrera",];

    function mostrarJugadorAleatoria() {
        opcion.addEventListener("click", () => consultarJugador("nombre", nameSearch.value.trim()))
        const jugadorAleatorio = opcion[Math.floor(Math.random() * opcion.length)];
        const imagenesDiv = document.getElementById("div_jugador");
        imagenesDiv.innerHTML = '<img src="../images/jugadores/' + jugadorAleatorio + '.png" alt="' + jugadorAleatorio + '"><input class="inputAdivinar" id="inputAdivinar" type="text">';
        div.classList.add("div_jugador"); // Clase CSS para estilos
    }

    document.getElementById("jugar_jugador").addEventListener("click", mostrarJugadorAleatoria);


    /**
    * Muestra los usuarios obtenidos en la página web
    * @param {Array<usuario>} usuarios - Lista de usuarios a mostrar
    * @returns
    */
    function mostrarJugadores(usuarios) {
        output.innerHTML = ""; // Limpiamos el contenedor de resultados

        // Si no hay usuarios encontrados, mostramos un mensaje
        if (usuarios.length === 0) {
            output.innerHTML = "<p>No se encontraron usuarios.</p>";
            return;
        }

        // Recorremos la lista de usuarios y creamos un div para cada uno
        usuarios.forEach(user => {
            let img = document.createElement("img");
            img.classList.add("grid-item"); // Clase CSS para estilos
            img.innerHTML = `'<imgclass="imagen_equipo_adivinar" src="../images/jugadores/' + ${user.nombre} + '.png" alt="' +  ${user.nombre} + '"><input class="inputAdivinar" id="inputAdivinar" type="text">'`
            output.appendChild(div); // Agregamos la imagen al contenedor de salida
        });
    }
    async function consultarJugador(filtro = "todos", valor = "") {
        try {
            let url = `http://localhost:${PORT}/${nombre_coleccion_jugador}`; // URL base de la API

            //Si se ha indicado un filtro, lo agregamos a la URL con parámetros de consulta
            if (filtro === "nombre") {
                url += `?nombre=${encodeURIComponent(valor)}`; // Búsqueda por nombre
            }

            //Realizamos la petición al servidor con Fetch
            const response = await fetch(url);
            const usuarios = await response.json(); // Convertimos la respuesta a JSON

            // Mostramos los usuarios en la página
            mostrarJugadores(usuarios);

        } catch (error) {
            console.error("Error consultando usuarios:", error); // Mostramos el error en la consola
            output.innerHTML = `<p>Error consultando usuarios: ${error}</p>`; // Mostramos mensaje de error en la interfaz
        }
    }
});
