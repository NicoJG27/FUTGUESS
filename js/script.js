// Definimos constantes necesarias
const PORT = 3000; // Puerto donde correrá nuestro servidor
const nombre_coleccion_jugador = "Jugador"; // Nombre de la colección que queremos recuperar
const nombre_coleccion_equipo = "Equipo"; // Nombre de la colección que queremos recuperar

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
//DOM de la pagina del index
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
    try {
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
    } catch { }
});
//DOM de la pagina de los equipos  //////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const equipos = [
        { nombre: "alaves", nombreCompleto: "Deportivo Alavés", fundacion: "23 de enero de 1921", estadio: "Estadio de Mendizorroza", titulos: "0" },
        { nombre: "athletic", nombreCompleto: "Athletic Club", fundacion: "1898", estadio: "Estadio de San Mamés", titulos: "35" },
        { nombre: "atletico", nombreCompleto: "Club Atlético de Madrid", fundacion: "26 de abril de 1903", estadio: "Riyadh Air Metropolitano", titulos: "43" },
        { nombre: "barça", nombreCompleto: "Futbol Club Barcelona", fundacion: "29 de noviembre de 1899", estadio: "Spotify Camp Nou", titulos: "100" },
        { nombre: "betis", nombreCompleto: "Real Betis Balompié", fundacion: "12 de septiembre de 1907", estadio: "Estadio Benito Villamarín", titulos: "4" },
        { nombre: "celta", nombreCompleto: "Real Club Celta de Vigo", fundacion: "23 de agosto de 1923", estadio: "Estadio Abanca Balaídos", titulos: "1" },
        { nombre: "espayol", nombreCompleto: "RCD Espanyol de Barcelona", fundacion: "28 de octubre de 1900", estadio: "RCDE Stadium", titulos: "4" },
        { nombre: "getafe", nombreCompleto: "Getafe Club de Fútbol", fundacion: "8 de julio de 1983", estadio: "Coliseum", titulos: "0" },
        { nombre: "girona", nombreCompleto: "Girona Fútbol Club", fundacion: "23 de julio de 1930", estadio: "Estadio Montilivi", titulos: "0" },
        { nombre: "leganes", nombreCompleto: "Club Deportivo Leganés", fundacion: "23 de junio de 1928", estadio: "Estadio Municipal Butarque", titulos: "0" },
        { nombre: "madrid", nombreCompleto: "Real Madrid Club de Fútbol", fundacion: "6 de marzo de 1902", estadio: "Santiago Bernabéu", titulos: "106" },
        { nombre: "mallorca", nombreCompleto: "Real Club Deportivo Mallorca", fundacion: "5 de marzo de 1916", estadio: "Campo de fútbol de Son Moix", titulos: "2" },
        { nombre: "osasuna", nombreCompleto: "Club Atlético Osasuna", fundacion: "24 de octubre de 1920", estadio: "El SADAR", titulos: "0" },
        { nombre: "palmas", nombreCompleto: "Unión Deportiva Las Palmas", fundacion: "6 de marzo de 1902", estadio: "Estadio de Gran Canaria", titulos: "0" },
        { nombre: "rayo", nombreCompleto: "Rayo Vallecano de Madrid", fundacion: "29 de mayo de 1924", estadio: "Estadio de Vallecas", titulos: "0" },
        { nombre: "real_sociedad", nombreCompleto: "Real Sociedad de Fútbol", fundacion: "6 de marzo de 1902", estadio: "Reale Arena", titulos: "6" },
        { nombre: "sevilla", nombreCompleto: "Sevilla Fútbol Club", fundacion: "7 de septiembre de 1909", estadio: "Ramón Sanchéz Pizjuán", titulos: "15" },
        { nombre: "valencia", nombreCompleto: "Valencia Club de Fútbol", fundacion: "6 de marzo de 1902", estadio: "Estadio de Mestalla", titulos: "18" },
        { nombre: "valladolid", nombreCompleto: "Real Valladolid Club de Fútbol", fundacion: "20 de junio de 1928", estadio: "Estadio José Zorrilla", titulos: "0" },
        { nombre: "villareal", nombreCompleto: "Villarreal Club de Fútbol", fundacion: "10 de marzo de 1923", estadio: "Estadi de la Ceràmica", titulos: "3" }
    ];

    try {
        let intentosMaximos = 3;
        let intentosRestantes = intentosMaximos;

        function mostrarEquipoAleatorio() {
            const equipo = equipos[Math.floor(Math.random() * equipos.length)];
            const imagenesDiv = document.getElementById("div_equipo");
            intentosRestantes = intentosMaximos;

            const nombreImagen = equipo.nombre;

            imagenesDiv.innerHTML = `
                <img class="imagen_equipo_adivinar" src="../images/equipos/${nombreImagen}.png" alt="${equipo.nombre}">
                <input class="inputAdivinar" id="inputAdivinarEquipo" type="text" placeholder="¿Qué equipo es este?" autocomplete="off">
                <div id="sugerenciasEquipo" class="sugerencias"></div>
                <button id="comprobarEquipo">Comprobar</button>
                <div id="mensajeResultadoEquipo" class="mensajeResultado"></div>
                <div id="intentosRestantesEquipo">Intentos restantes: ${intentosRestantes}</div>
                <div id="infoEquipo"></div>
            `;
            imagenesDiv.classList.add("div_equipo");

            const input = document.getElementById("inputAdivinarEquipo");
            const sugerenciasDiv = document.getElementById("sugerenciasEquipo");
            const mensajeDiv = document.getElementById("mensajeResultadoEquipo");
            const intentosDiv = document.getElementById("intentosRestantesEquipo");
            const infoDiv = document.getElementById("infoEquipo");

            input.addEventListener("input", () => {
                const texto = input.value.toLowerCase();
                sugerenciasDiv.innerHTML = "";

                if (texto.length > 0) {
                    const sugerencias = equipos.filter(e =>
                        e.nombre.toLowerCase().includes(texto) || 
                        e.nombreCompleto.toLowerCase().includes(texto)
                    );

                    sugerencias.forEach(e => {
                        const opcion = document.createElement("div");
                        opcion.textContent = e.nombreCompleto;
                        opcion.classList.add("sugerencia-opcion");
                        opcion.addEventListener("click", () => {
                            input.value = e.nombreCompleto;
                            sugerenciasDiv.innerHTML = "";
                        });
                        sugerenciasDiv.appendChild(opcion);
                    });
                }
            });

            document.getElementById("comprobarEquipo").addEventListener("click", () => {
                const respuesta = input.value.trim();
                if (respuesta.toLowerCase() === equipo.nombre.toLowerCase() || 
                    respuesta.toLowerCase() === equipo.nombreCompleto.toLowerCase()) {
                    mensajeDiv.textContent = "✅ ¡Correcto!";
                    mensajeDiv.style.color = "green";
                    input.disabled = true;
                    mostrarInfoEquipo(equipo);
                } else {
                    intentosRestantes--;
                    if (intentosRestantes > 0) {
                        mensajeDiv.textContent = `❌ Incorrecto. Intenta de nuevo.`;
                        mensajeDiv.style.color = "red";
                        intentosDiv.textContent = `Intentos restantes: ${intentosRestantes}`;
                    } else {
                        mensajeDiv.textContent = `❌ Has perdido. El equipo era: ${equipo.nombreCompleto}`;
                        mensajeDiv.style.color = "red";
                        input.disabled = true;
                        intentosDiv.textContent = `Intentos restantes: 0`;
                        mostrarInfoEquipo(equipo);
                    }
                }
            });

            function mostrarInfoEquipo(equipo) {
                infoDiv.innerHTML = `
                    <p><strong>Nombre completo:</strong> ${equipo.nombreCompleto}</p>
                    <p><strong>Fecha de fundación:</strong> ${equipo.fundacion}</p>
                    <p><strong>Estadio:</strong> ${equipo.estadio}</p>
                    <p><strong>Títulos:</strong> ${equipo.titulos}</p>
                `;
                // Añadir margen inferior para evitar que el footer oculte la información
                const extraSpace = document.createElement("div");
                extraSpace.style.height = "100px"; // Espacio adicional de 100px
                extraSpace.style.marginBottom = "100px";
                infoDiv.appendChild(extraSpace);
                
                // Hacer scroll para mostrar la información completa
                infoDiv.scrollIntoView({behavior: "smooth", block: "start"});
            }
        }

        document.getElementById("jugar_equipo").addEventListener("click", mostrarEquipoAleatorio);
    } catch {
    }
});


//DOM de la pagina de los jugadores////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const opcionesJugadores = ["Juanmi Latasa", "Marcos André", "Sylla, Chuki", "Robert Kenedy", "Anuar Tuhami", "Selim Amallah", "Stanko Jurić", "Amath Ndiaye", "Darwin Machís", "Mario Martín", "Raúl Moro", "Iván Sánchez", "Florian Grillitsch", "Nikitscher", "Adam Aznou", "Antonio Candela", "Lucas Henrique", "Joseph Aidoo", "Eray Cömert", "Cenk Özkacar", "Javi Sánchez", "David Torres", "Luis Pérez", "Karl Hein", "André Ferreira", "Fábio Silva", "Sandro Ramírez", "Jaime Mata", "Oli McBurnie", "Benito Ramírez", "Marc Cardona", "Dário Essugo", "Adnan Januzaj", "Stefan Bajcetic", "Kirian Rodríguez", "Viti Rozada", "Manu Fuster", "Enzo Loiodice", "Alberto Moleiro", "José Gómez Campaña", "Javi Muñoz", "Juanma Herzog", "Álex Muñoz", "Scott McKenna", "Andy Pelmard", "Álex Suárez", "Mika Mármol", "Marvin Park",
        "Dinko Horkaš", "Jasper Cillessen", "Pau Cabanes", "Kike García", "Carlos Martín", "Toni Martínez", "Asier Villalibre", "Joan Jordán", "Carlos Protesoni", "Carles Aleñá", "Jon Guridi", "Tomás Conechny", "Antonio Blanco", "Carlos Vicente", "Ander Guevara", "Moussa Diarra",
        "Hugo Novoa", "Nahuel Tenaglia", "Santiago Mouriño", "Abdel Abqar", "Aleksandar Sedlar", "Manu Sánchez", "Facundo Garcés", "Adrián Rodríguez", "Jesús Owono", "Antonio Sivera", "Munir", "Diego García", "Duk", "Dani Raba", "Miguel de la Fuente", "Julián Chicco", "Roberto López", "Yvan Neyou", "Darco Brašanac", "Juan Cruz", "Seydouba Cissé", "Óscar Rodríguez", "Renato Tapia", "Matija Nastasić", "Javi Hernández", "Enriq Franquesa", "Valentin Rosier", "Sergio González", "Borna Barišić", "Jorge Sáenz", "Adrià Altamira", "Álvaro Abajas Martín", "Marko Dmitrović", "Juan Soriano", "Diego López", "Umar Sadiq", "Rafa Mir", "Hugo Duro", "Sergi Canós", "Hugo Guillamón", "Enzo Barrenechea", "Fran Pérez", "José Luis García Vayá", "Iván Jaime", "André Almeida", "Yarek Gasiorowski",
        "Jesús Vázquez", "Dimitri Foulquier", "Max Aarons", "César Tárrega", "José Luis Gayà", "Mouctar Diakhaby", "Cristhian Mosquera", "Giorgi Mamardashvili", "Stole Dimitrievski", "Jaume Domènech", "Jofre Carreras", "Walid Cheddira", "Pere Milla", "Alejo Véliz", "Javi Puado", "Roberto Fernández", "Antoniu Roca", "Alex Král", "Urko González de Zárate", "Álvaro aguado", "José Gragera", "Pol Lozano", "Edu Expósito", "Pablo Ramón", "Omar El Hilali", "Carlos Romero", "Brian Oliván", "Álvaro Tejero", "Leandro Cabrera", "Fernando Calero", "Marash Kumbulla", "Sergi Gómez", "Àngel Fortuño", "Fernando Pacheco", "Joan García", "Jose Manuel Arnáiz", "Bryan Zaragoza", "Ante Budimir", "Raúl García", "Iker Muñoz", "Moi Gómez", "Rubén García", "Kike Barja", "Aimar Oroz", "Pablo Ibáñez",
        "Jon Moncayola", "Lucas Torró", "Alejandro Catena", "Abel Bretones", "Enzo Boyomo", "Rubén Peña", "Jesús Areso", "Jorge Herrando", "Unai García", "Juan Cruz Armada", "Aitor Fernández", "Sergio Herrera", "Gabriel Misehouy", "Portu", "Bryan Gil", "Bojan Miovski", "Arnaut Danjuma", "Yaser Asprilla", "Abel Ruiz", "Viktor Tsygankov", "Cristhian Stuani", "Iván Martín", "Jhon Solís", "Yangel Herrera", "Oriol Romeu", "Arthur", "Donny van de Beek", "Ladislav Krejčí", "Daley Blind", "Alejandro Francés", "Juanpe", "David López", "Arnau Martínez", "Miguel Gutiérrez", "Vladyslav Krapyvtsov", "Paulo Gazzaniga", "Juan Carlos", "Juanmi Jiménez", "Peter Federico", "Álvaro Rodríguez", "Carles Pérez", "Bertug Yildirim", "Borja Mayoral", "Yellu", "Ramón Terrats", "Mauro Arambarri",
        "Álex Sola", "Christantus Uche", "Luis Milla", "Domingos Duarte", "Juan Iglesias", "Diego Rico", "Omar Alderete", "Juan Bernat", "Allan Nyom", "Juan Berrocal", "Djené Dakonam", "David Soria", "Jiri Letáček", "Sergio Gómez", "Sheraldo Becker", "Orri Óskarsson", "Takefusa Kubo", "Mikel Oyarzabal", "Ander Barrenetxea", "Pablo Marín", "Luka Sučić", "Brais Méndez", "Beñat Turrientes", "Jon Ander Olasagasti", "Arsen Zakharyan", "Martín Zubimendi", "Nayef Aguerd", "Jon Pacheco", "Jon Mikel Aramburu", "Hamari Traoré", "Javi López", "Aritz Elustondo", "Igor Zubeldia", "Aihen Muñoz", "Álvaro Odriozola", "Unai Marrero Larrañaga", "Álex Remiro", "Akor Adams", "Rubén Vargas", "Stanis Idumbo", "Chidera Ejuke", "Peque Fernández", "Dodi Lukébakio", "Suso", "Isaac Romero", "Lucien Agoumé",
        "Albert Sambi", "Saúl Ñìguez", "Djibril Sow", "Nemanja Gudelj", "Andrià Pedrosa", "Tanguy Nianzou", "Marcao", "Jose Ángel Carmona", "Kike Salas", "Loïc Badé", "Juanlu Sánchez", "Álvaro Ferllo", "Ørjan Nyland", "Adrian Embarba", "Jorge de Frutos",
        "Sergio Camello", "Sergi Guardiola", "Randy Nteka", "Raúl de Tomás", "Joni Montiel", "Óscar Valentín", "Álvaro García", "Unai López", "Gerard Gumbau", "Oscar Trejo", "Isi Palazón", "Pathé Ciss", "Pedro Díaz", "Pelayo Fernández", "Florian Lejeune", "Pacha", "Iván Balliu", "Abdul Mumin", "Aridane Hernández", "Pep Chavarría", "Andrei Ratiu", "Augusto Batalla", "Dani Cárdenas", "Pablo Duran Fernandez", "Williot Theo Swedberg", "Hugo Alvarez Antuner", "Franco Emanuel Cervi", "Iago Aspas Juncal", "Jailson Marques Siquiera", "Damian Rodriguez Sousa", "Iker Losada Aragunde", "Francisco Jose Beltran Peinado", "Moriba Kourouma", "Hugo sotelo Gomez", "Mihailo Ristic", "Javier Mantillo Gaitan", "Carlos Dominguez Caceres", "Marcos Alonso", "Sergio Carreira Vilariño", "Oscar Mingueza Garcia",
        "Carl Anders Theodor Starfelt", "Vicente Guaita Panadero", "Ivan Villar Martinez", "Cyle Larin", "Takuma Asano", "Vedat Muriqi", "Chiquinho", "Abdon Prats Bastidas", "Antonio Sanchez Navarro", "Omar Mascarell", "Valery Fernández", "Sergi Darder", "Dani Rodriguez", "Manu Morlanes", "Samuel Costa", "Mateu Morey", "Jose Manuel Arias Copete", "Johan Mojica", "Pablo Maffeo", "Martin Valjent", "Antonio Raillo", "Ivan Cuellar", "Donimik Greif", " Jesus Rodriguez Caraballo", "Cucho hernandez", "Cedric bakambu", "Ez Abde", "Chimy Avila", "Isco Alarcon", "Marc Roca", "Giovani Lo Celso", "Pablo Fornals", "Sergi Altamira", "William Carvalho", "Johnny Cardoso", "Nobel Mendy", "Aitor Ruibal", "Youssouf Sabaly", "Romain Perraud", "Ricardo Rodriguez", "Natan Bernardo", "Marc Bartra", "Diego Llorente", "Hector Bellerin", "Adrián", "Antony dos Santos", "Pau Navarro", "Alfonso Pedraza", "Sergi Cardona", "Ayoze Pérez", "Yeremy Pino", "Nicolas Pepe", "Pape Gueye", "Kiko Femenía", "Álex Baena", "Thierno Barry", "Santi Comesaña Veiga", "Diego Conde", "Ilias Akhomach", "Dani Parejo", "Tajon Trevor Buchanan", "Juan Foyth", "Gerard Moreno", "Denis Suárez", "Willy Kambwala", "Eric Bailly", "Raúl Albiol", "Costa", "Luiz Lúcio Reis Júnior", "Gorka Guruzeta", "Álvaro Djaló", "Nico Williams", "Iñaki Williams", "Alejandro Berenguer", "Peio Canales", "Beñat Prados", "Mikel Jauregizar", "Unai Gómez", "Iñigo Ruiz de Galarreta", "Oihan Sancet", "Mikel Vesga", "Adama Boiro", "Óscar de Marcos", "Yuri Berchiche", "Íñigo Lekue", "Unai Núñez", "Yeray Álvarez", "Aitor Paredes", "Daniel Vivian", "Andoni Gorosabel", "Julen Agirrezabala", "Unai Simón", "Giuliano Simeone", "Julián Álvarez", "Ángel Correa", "Alexander Sørloth", "Antoine Griezmann", "Rodrigo Riquelme", "Marcos Llorente", "Samuel Lino", "Thomas Lemar", "Pablo Barrios",
        "Koke Resurrección", "Rodrigo de Paul", "Conor Gallagher", "Robin Le Normand", "Reinildo Mandava", "Javi Galán", "Axel Witsel", "Nahuel Molina", "Clement Lenglet", "César Azpilicueta", "José María Giménez", "Jan Oblak", "Juan Musso", "Pau Victor", "Lamine Yamal", "Raphinha", "Robert Lewandowski", "Ansu Fati", "Ferran Torres", "Dani Olmo", "Fermín López", "Marc Casadó", "Pablo Torre", "Pedri", "Gavi", "Frenkie de Jong", "Eric García", "Andreas Christensen", "Alejandro Balde", "Ronald Araújo", "Iñigo Martínez", "Pau Cubarsí", "Jules Koundé", "Marc-André ter Stegen", "Iñaki Peña", "Wojciech Szczęsny", "Raul Asencio", "Brahim Díaz", "Endrick Felipe", "Rodrygo Goes", "Kylian Mbappé", "Vinícius Júnior", "Dani Ceballos", "Arda Güler", "Aurélien Tchouaméni", "Luka Modrić", "Federico Valverde", "Eduardo Camavinga", "Jude Bellingham", "Ferland Mendy", "Antonio Rüdiger", "Fran García", "Jesús Vallejo", "Lucas Vázquez", "David Alaba", "Éder Militão", "Dani Carvajal", "Andriy Lunin", "Thibaut Courtois",];
    try {
        let intentosMaximos = 3;
        let intentosRestantes = intentosMaximos;
        function mostrarJugadorAleatorio() {
            const jugadorAleatorio = opcionesJugadores[Math.floor(Math.random() * opcionesJugadores.length)];
            const imagenesDiv = document.getElementById("div_jugador");
            intentosRestantes = intentosMaximos; // Reiniciar intentos

            const nombreImagen = jugadorAleatorio.replace(/ /g, "%20");

            imagenesDiv.innerHTML = `
                <img class="imagen_jugador_adivinar" src="../images/jugadores/${nombreImagen}.png" alt="${jugadorAleatorio}">
                <input class="inputAdivinar" id="inputAdivinarJugador" type="text" autocomplete="off">
                <div id="sugerencias" class="sugerencias"></div>
                <button id="comprobarJugador">Comprobar</button>
                <div id="mensajeResultado" class="mensajeResultado"></div>
                <div id="intentosRestantes">Intentos restantes: ${intentosRestantes}</div>
            `;
            imagenesDiv.classList.add("div_equipo");

            const input = document.getElementById("inputAdivinarJugador");
            const sugerenciasDiv = document.getElementById("sugerencias");
            const mensajeDiv = document.getElementById("mensajeResultado");
            const intentosDiv = document.getElementById("intentosRestantes");

            input.addEventListener("input", () => {
                const texto = input.value.toLowerCase();
                sugerenciasDiv.innerHTML = "";

                if (texto.length > 0) {
                    const sugerencias = opcionesJugadores.filter(j =>
                        j.toLowerCase().includes(texto)
                    );

                    sugerencias.forEach(jugador => {
                        const opcion = document.createElement("div");
                        opcion.textContent = jugador;
                        opcion.classList.add("sugerencia-opcion");
                        opcion.addEventListener("click", () => {
                            input.value = jugador;
                            sugerenciasDiv.innerHTML = "";
                        });
                        sugerenciasDiv.appendChild(opcion);
                    });
                }
            });

            document.getElementById("comprobarJugador").addEventListener("click", () => {
                const respuesta = input.value.trim();
                if (respuesta.toLowerCase() === jugadorAleatorio.toLowerCase()) {
                    mensajeDiv.textContent = "✅ ¡Correcto!";
                    mensajeDiv.style.color = "green";
                    input.disabled = true;
                } else {
                    intentosRestantes--;
                    if (intentosRestantes > 0) {
                        mensajeDiv.textContent = `❌ Incorrecto. Intenta de nuevo.`;
                        mensajeDiv.style.color = "red";
                        intentosDiv.textContent = `Intentos restantes: ${intentosRestantes}`;
                    } else {
                        mensajeDiv.textContent = `❌ Has perdido. El jugador era: ${jugadorAleatorio}`;
                        mensajeDiv.style.color = "red";
                        input.disabled = true;
                        intentosDiv.textContent = `Intentos restantes: 0`;
                    }
                }
            });
        }

        document.getElementById("jugar_jugador").addEventListener("click", mostrarJugadorAleatorio)
    } catch {

    }
});

//DOM de la pagina de los estadios  //////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const estadios = [
        { nombre: "Abanca Balaídos", capacidad: 29000, año: 1928 },
        { nombre: "Benito Villamarín", capacidad: 60721, año: 1929 },
        { nombre: "Spotify Camp Nou", capacidad: 99354, año: 1957 },
        { nombre: "Santiago Bernabeu", capacidad: 81044, año: 1947 },
        { nombre: "Butarque", capacidad: 12000, año: 1998 },
        { nombre: "Coliseum", capacidad: 17393, año: 1998 },
        { nombre: "El Sadar", capacidad: 23816, año: 1967 },
        { nombre: "Gran Canaria", capacidad: 32000, año: 2003 },
        { nombre: "José Zorrilla", capacidad: 27846, año: 1982 },
        { nombre: "La Cerámica", capacidad: 23500, año: 1923 },
        { nombre: "Mendizorroza", capacidad: 19840, año: 1924 },
        { nombre: "Mestalla", capacidad: 49430, año: 1923 },
        { nombre: "Montilivi", capacidad: 14786, año: 1970 },
        { nombre: "RCDE Stadium", capacidad: 40500, año: 2009 },
        { nombre: "Reale Arena", capacidad: 39800, año: 1993 },
        { nombre: "Riyadh Air Metropolitano", capacidad: 68456, año: 2017 },
        { nombre: "San Mames", capacidad: 53289, año: 2013 },
        { nombre: "Sanchez Pizjuan", capacidad: 43883, año: 1958 },
        { nombre: "Son Moix", capacidad: 23142, año: 1999 },
        { nombre: "Vallecas", capacidad: 14708, año: 1976 }
    ];

    try {
        let intentosMaximos = 3;
        let intentosRestantes = intentosMaximos;

        function mostrarEstadioAleatorio() {
            const estadio = estadios[Math.floor(Math.random() * estadios.length)];
            const imagenesDiv = document.getElementById("div_estadio");
            intentosRestantes = intentosMaximos;

            const nombreImagen = estadio.nombre.replace(/ /g, "%20");

            imagenesDiv.innerHTML = `
                <img class="imagen_estadio_adivinar" src="../images/estadio/${nombreImagen}.png" alt="${estadio.nombre}">
                <input class="inputAdivinar" id="inputAdivinarEstadio" type="text" placeholder="¿Qué estadio es este?" autocomplete="off">
                <div id="sugerenciasEstadio" class="sugerencias"></div>
                <button id="comprobarEstadio">Comprobar</button>
                <div id="mensajeResultadoEstadio" class="mensajeResultado"></div>
                <div id="intentosRestantesEstadio">Intentos restantes: ${intentosRestantes}</div>
                <div id="infoEstadio"></div>
            `;
            imagenesDiv.classList.add("div_estadio");

            const input = document.getElementById("inputAdivinarEstadio");
            const sugerenciasDiv = document.getElementById("sugerenciasEstadio");
            const mensajeDiv = document.getElementById("mensajeResultadoEstadio");
            const intentosDiv = document.getElementById("intentosRestantesEstadio");
            const infoDiv = document.getElementById("infoEstadio");

            input.addEventListener("input", () => {
                const texto = input.value.toLowerCase();
                sugerenciasDiv.innerHTML = "";

                if (texto.length > 0) {
                    const sugerencias = estadios.filter(e =>
                        e.nombre.toLowerCase().includes(texto)
                    );

                    sugerencias.forEach(e => {
                        const opcion = document.createElement("div");
                        opcion.textContent = e.nombre;
                        opcion.classList.add("sugerencia-opcion");
                        opcion.addEventListener("click", () => {
                            input.value = e.nombre;
                            sugerenciasDiv.innerHTML = "";
                        });
                        sugerenciasDiv.appendChild(opcion);
                    });
                }
            });

            document.getElementById("comprobarEstadio").addEventListener("click", () => {
                const respuesta = input.value.trim();
                if (respuesta.toLowerCase() === estadio.nombre.toLowerCase()) {
                    mensajeDiv.textContent = "✅ ¡Correcto!";
                    mensajeDiv.style.color = "green";
                    input.disabled = true;
                    mostrarInfoEstadio(estadio);
                } else {
                    intentosRestantes--;
                    if (intentosRestantes > 0) {
                        mensajeDiv.textContent = `❌ Incorrecto. Intenta de nuevo.`;
                        mensajeDiv.style.color = "red";
                        intentosDiv.textContent = `Intentos restantes: ${intentosRestantes}`;
                    } else {
                        mensajeDiv.textContent = `❌ Has perdido. El estadio era: ${estadio.nombre}`;
                        mensajeDiv.style.color = "red";
                        input.disabled = true;
                        intentosDiv.textContent = `Intentos restantes: 0`;
                        mostrarInfoEstadio(estadio);
                    }
                }
            });

            function mostrarInfoEstadio(estadio) {
                infoDiv.innerHTML = `
                    <p><strong>Capacidad:</strong> ${estadio.capacidad.toLocaleString()} espectadores</p>
                    <p><strong>Año de construcción:</strong> ${estadio.año}</p>
                `;
                // Añadir clase CSS para el espaciado
                infoDiv.classList.add("info-con-espacio");
                
                // Hacer scroll para mostrar la información completa
                infoDiv.scrollIntoView({behavior: "smooth", block: "start"});
            }
        }

        document.getElementById("jugar_estadio").addEventListener("click", mostrarEstadioAleatorio);
    } catch (error){

    }
});

document.addEventListener("DOMContentLoaded", () => {
    const categoriaSelect = document.getElementById("categoria");
    const chisteBox = document.getElementById("chiste");
    const botonChiste = document.getElementById("obtenerChiste");

    async function obtenerCategorias() {
        try {
            let response = await fetch("https://api.chucknorris.io/jokes/categories");
            let categorias = await response.json();
            categoriaSelect.innerHTML = '<option value="">Selecciona una categoría</option>';
            categorias.forEach(categoria => {
                let option = document.createElement("option");
                option.value = categoria;
                option.textContent = categoria;
                categoriaSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error al obtener categorías", error);
            chisteBox.textContent = "Error al cargar categorías.";
        }
    }

    async function obtenerChiste() {
        const categoria = categoriaSelect.value;
        if (!categoria) {
            chisteBox.textContent = "Por favor selecciona una categoría";
            return;
        }

        botonChiste.disabled = true;
        botonChiste.textContent = "Cargando…";

        try {
            let response = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`);
            let data = await response.json();
            chisteBox.textContent = data.value;
        } catch (error) {
            console.error("Error al obtener chiste", error);
            chisteBox.textContent = "Error al obtener chiste.";
        } finally {
            botonChiste.disabled = false;
            botonChiste.textContent = "Mostrar chiste";
        }
    }

    
    botonChiste.addEventListener("click", obtenerChiste);
    obtenerCategorias();
});
