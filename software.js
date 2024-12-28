// Funciones para mostrar y ocultar el spinner
function mostrarSpinner() {
    document.getElementById("spinner").style.display = "flex";
}

function ocultarSpinner() {
    document.getElementById("spinner").style.display = "none";
}
const logosPath = {
    "Opción Desactivada por el Cliente": "logos/1Q.png", // FALTA LOGO
};


const positions = {
    logo: [
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [2090, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
    ],
    equipo: [
        [950, 745], [950, 830], [950, 920], [950, 1010],
        [950, 1100], [950, 1190], [950, 1280], [950, 1365],
        [950, 1450], [950, 1540], [950, 1630], [950, 1710],
        [950, 1805], [950, 1895], [950, 1985], [950, 2070],
    ],
    kills: [
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [2090, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
    ],
    top: [
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [2090, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
        [99999, 99999], [99999, 99999], [99999, 99999], [99999, 99999],
    ],
    total: [
        [1770, 745], [1770, 830], [1770, 920], [1770, 1010],
        [1770, 1100], [1770, 1190], [1768, 1280], [1768, 1365],
        [1765, 1450], [1765, 1540], [1765, 1630], [1765, 1710],
        [1765, 1805], [1765, 1895], [1765, 1985], [1765, 2070],
    ],
        // Nueva sección para el Top 1 (nombre y total)
    top1: {
        nombre: [2650, 1480], // Coordenadas del nombre del Top 1
        total: [3530, 1200], // Coordenadas del total del Top 1
    }
};

class Equipo {
    constructor(nombre) {
        this.nombre = nombre;
        this.kills = Array(4).fill(0);
        this.top = Array(4).fill(0);
        this.totalKills = 0;
        this.totalTop = 0;
        this.totalPuntaje = 0;
    }

    calcularTotales() {
        this.totalKills = this.kills.reduce((a, b) => a + b, 0);
        this.totalTop = this.top.reduce((a, b) => a + this.calcularPuntosTop(b), 0);
        this.totalPuntaje = this.totalKills + this.totalTop;
    }

    calcularPuntosTop(posicion) {
        const puntos = {
            1: 40, 
            2: 35, 
            3: 32, 
            4: 30,
            5: 28, 
            6: 26, 
            7: 24,
            8: 10,
            9: 10,
            10: 10,
            11: 10,
            12: 10,
            13: 10,
            14: 10,
            15: 10,
        };
        return puntos[posicion] || 0;
    }
}

let equipos = [];
let numEquipos = 0;
const abecedario = "ABCDEFGHIJKLMNOP"; // Letras del abecedario

function iniciar() {
    numEquipos = parseInt(document.getElementById("numEquipos").value);
    if (numEquipos >= 1 && numEquipos <= 16) {
        const form = document.getElementById("equiposForm");
        form.innerHTML = "";  // Limpiar entradas anteriores

        for (let i = 0; i < numEquipos; i++) {
            const equipoDiv = document.createElement("div");
            equipoDiv.className = "equipo";

            // Crear etiqueta con la letra correspondiente
            const letraEquipo = abecedario[i]; // Obtener letra del abecedario
            const nombreLabel = document.createElement("label");
            nombreLabel.textContent = `Equipo ${i + 1} - ${letraEquipo}:`;
            equipoDiv.appendChild(nombreLabel);

            // Input para el nombre del equipo
            const nombreInput = document.createElement("input");
            nombreInput.placeholder = `Nombre del equipo ${letraEquipo}`;
            nombreInput.className = "nombre-equipo"; // Asigna la clase para el nombre del equipo
            equipoDiv.appendChild(nombreInput);

            // Crear un contenedor para las 4 salas (Kills y Tops)
            const salasDiv = document.createElement("div");
            salasDiv.className = "salas";

            for (let j = 0; j < 4; j++) {
                const salaDiv = document.createElement("div");
                salaDiv.className = "sala";

                // Crear inputs para Kills
                const killsLabel = document.createElement("label");
                killsLabel.textContent = `Sala ${j + 1} Kills:`;
                salaDiv.appendChild(killsLabel);

                const killsInput = document.createElement("input");
                killsInput.type = "number"; // Cambiar a number para validar la entrada
                killsInput.placeholder = `Kills Sala ${j + 1}`;
                killsInput.className = "kills-top"; // Asigna la clase para kills
                salaDiv.appendChild(killsInput);

                // Crear inputs para Tops
                const topLabel = document.createElement("label");
                topLabel.textContent = `Top:`;
                salaDiv.appendChild(topLabel);

                const topInput = document.createElement("input");
                topInput.type = "number"; // Cambiar a number para validar la entrada
                topInput.placeholder = `Top Sala ${j + 1} (1-16)`;
                topInput.className = "kills-top"; // Asigna la clase para tops
                salaDiv.appendChild(topInput);

                salasDiv.appendChild(salaDiv);
            }
            
            equipoDiv.appendChild(salasDiv);
            form.appendChild(equipoDiv);
        }
        document.getElementById("resultadosButton").disabled = false;
    } else {
        alert("El número de equipos debe estar entre 1 y 16.");
    }
}


function generarResultados() {
    mostrarSpinner(); // Mostrar el spinner al inicio
    equipos.length = 0;  // Reiniciar el array de equipos
    const inputs = document.querySelectorAll(".equipo");
    inputs.forEach(input => {
        const nombre = input.querySelector("input[placeholder^='Nombre del equipo']").value;
        
        const equipo = new Equipo(nombre);
        for (let j = 0; j < 4; j++) {
            equipo.kills[j] = parseInt(input.querySelector(`input[placeholder='Kills Sala ${j + 1}']`).value) || 0;
            equipo.top[j] = parseInt(input.querySelector(`input[placeholder='Top Sala ${j + 1} (1-16)']`).value) || 0;
        }
        equipo.calcularTotales();
        equipos.push(equipo);
    });

    equipos.sort((a, b) => b.totalPuntaje - a.totalPuntaje);
    equipos.splice(16);  // Limitar a los 16 mejores equipos

    const resultsText = equipos.map(e => `${e.nombre},${e.totalKills},${e.totalTop},${e.totalPuntaje}`).join("\n");
    localStorage.setItem('resultados', resultsText);
    document.getElementById("imagenButton").disabled = false;
    ocultarSpinner(); // Ocultar el spinner al finalizar
}

function crearImagen() {
    mostrarSpinner(); // Mostrar el spinner al inicio
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "Plantilla/Tabla.png";  // Ruta a la imagen de la plantilla

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        let logosCargados = 0;

        equipos.forEach((equipo, index) => {
            const logo = new Image();
            logo.src = logosPath[equipo.nombre] || "logos/default.png"; 

            logo.onload = function () {
                ctx.drawImage(logo, ...positions.logo[index], 170, 170);

                // Nombres de equipos con negrita
                ctx.fillStyle = "black"; // Nombres en negro
                ctx.font = "bold 75px Anton"; // Aplicar negrita
                ctx.textAlign = "center"; // Centrar el texto
                ctx.fillText(equipo.nombre, positions.equipo[index][0], positions.equipo[index][1]);

                // Kills en negrita
                ctx.fillStyle = "black"; // Kills en negro
                ctx.font = "bold 105px Anton"; // Aplicar negrita
                ctx.textAlign = "center";
                ctx.fillText(equipo.totalKills, positions.kills[index][0], positions.kills[index][1]);

                // Top y Total en blanco (sin negrita si prefieres)
                ctx.fillStyle = "black";
                ctx.font = "bold 85px Anton"; // Aplicar negrita
                ctx.fillText(equipo.totalTop, positions.top[index][0], positions.top[index][1]);

                // Cambiar el color a blanco para el Total
                ctx.fillStyle = "#ff0789";
                ctx.font = "bold 75px Anton"; // Aplicar negrita
                ctx.fillText(equipo.totalPuntaje, positions.total[index][0], positions.total[index][1]);

                // Dibujo extra para el Top 1 con rotación
                const top1Equipo = equipos[0]; // El primer equipo es el Top 1 (asumiendo orden descendente)
                const rotationAngle = (-20 * Math.PI) / 180; // Convertir 40 grados a radianes

                // Dibujar nombre del Top 1
                ctx.save(); // Guardar el estado actual del contexto
                ctx.translate(positions.top1.nombre[0], positions.top1.nombre[1]); // Mover al punto de rotación
                ctx.rotate(rotationAngle); // Rotar el contexto 40 grados
                ctx.fillStyle = "black"; // Color dorado
                ctx.font = "bold 125px Anton"; // Tamaño de fuente más grande
                ctx.textAlign = "center";
                ctx.fillText(top1Equipo.nombre, 0, 0); // Dibujar el texto en la posición actual
                ctx.restore(); // Restaurar el estado del contexto

                // Dibujar puntaje total del Top 1
                ctx.save(); // Guardar el estado actual del contexto
                ctx.translate(positions.top1.total[0], positions.top1.total[1]); // Mover al punto de rotación
                ctx.rotate(rotationAngle); // Rotar el contexto 40 grados
                ctx.fillStyle = "#ff0789"; // Color llamativo
                ctx.font = "bold 125px Anton"; // Aplicar negrita
                ctx.fillText(top1Equipo.totalPuntaje, 0, 0); // Dibujar el texto en la posición actual
                ctx.restore(); // Restaurar el estado del contexto


                logosCargados++;
                if (logosCargados === equipos.length) {
                    const imgURL = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.href = imgURL;
                    link.download = "Tabla_Resultados.png";
                    link.click();
                    ocultarSpinner(); // Ocultar el spinner al finalizar
                }
            };

            // Error de carga del logo
            logo.onerror = function () {
                ctx.fillStyle = "black"; // Nombres en negro
                ctx.font = "bold 75px Anton"; // Aplicar negrita
                ctx.textAlign = "center"; // Centrar el texto
                ctx.fillText(equipo.nombre, positions.equipo[index][0], positions.equipo[index][1]);

                ctx.fillStyle = "black"; // Kills en negro
                ctx.font = "bold 105px Anton"; // Aplicar negrita
                ctx.textAlign = "center";
                ctx.fillText(equipo.totalKills, positions.kills[index][0], positions.kills[index][1]);

                ctx.fillStyle = "black"; // Top y Total en blanco
                ctx.font = "bold 85px Anton"; // Aplicar negrita
                ctx.fillText(equipo.totalTop, positions.top[index][0], positions.top[index][1]);

                // Cambiar el color a blanco para el Total
                ctx.fillStyle = "#ff0789";
                ctx.font = "bold 75px Anton"; // Aplicar negrita
                ctx.fillText(equipo.totalPuntaje, positions.total[index][0], positions.total[index][1]);
                // Dibujo extra para el Top 1 con rotación
                const top1Equipo = equipos[0]; // El primer equipo es el Top 1 (asumiendo orden descendente)
                const rotationAngle = (-10 * Math.PI) / 180; // Convertir 40 grados a radianes

                // Dibujar nombre del Top 1
                ctx.save(); // Guardar el estado actual del contexto
                ctx.translate(positions.top1.nombre[0], positions.top1.nombre[1]); // Mover al punto de rotación
                ctx.rotate(rotationAngle); // Rotar el contexto 40 grados
                ctx.fillStyle = "black"; // Color dorado
                ctx.font = "bold 160px Anton"; // Tamaño de fuente más grande
                ctx.textAlign = "center";
                ctx.fillText(top1Equipo.nombre, 0, 0); // Dibujar el texto en la posición actual
                ctx.restore(); // Restaurar el estado del contexto

                // Dibujar puntaje total del Top 1
                ctx.save(); // Guardar el estado actual del contexto
                ctx.translate(positions.top1.total[0], positions.top1.total[1]); // Mover al punto de rotación
                ctx.rotate(rotationAngle); // Rotar el contexto 40 grados
                ctx.fillStyle = "#ff0789"; // Color llamativo
                ctx.font = "bold 145px Anton"; // Aplicar negrita
                ctx.fillText(top1Equipo.totalPuntaje, 0, 0); // Dibujar el texto en la posición actual
                ctx.restore(); // Restaurar el estado del contexto


                logosCargados++;
                if (logosCargados === equipos.length) {
                    const imgURL = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.href = imgURL;
                    link.download = "Tabla_Resultados.png";
                    link.click();
                    ocultarSpinner(); // Ocultar el spinner al finalizar
                }
            };
        });
    };
}



document.getElementById("iniciarButton").onclick = iniciar;
document.getElementById("resultadosButton").onclick = generarResultados;
document.getElementById("imagenButton").onclick = crearImagen;
