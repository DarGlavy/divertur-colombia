
console.log("Divertur Colombia está funcionando 🚀");

// Buscar los elementos del formulario
const formulario = document.getElementById("reservation-form");
const selectorTour = document.getElementById("tour");
const campoPersonas = document.getElementById("personas");

const totalElemento = document.getElementById("total");
const anticipoElemento = document.getElementById("anticipo");
const saldoElemento = document.getElementById("saldo");

// Formatear los valores como pesos colombianos
function formatoCOP(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });
}

// Calcular el precio total, el anticipo y el saldo
function actualizarResumen() {
    const precioPorPersona = Number(selectorTour.value);
    const personas = Math.max(1, Number(campoPersonas.value) || 1);

    const total = precioPorPersona * personas;
    const anticipo = Math.round(total * 0.30);
    const saldo = total - anticipo;

    totalElemento.textContent = formatoCOP(total);
    anticipoElemento.textContent = formatoCOP(anticipo);
    saldoElemento.textContent = formatoCOP(saldo);
}

// Actualizar los valores cuando cambie el tour o la cantidad
selectorTour.addEventListener("change", actualizarResumen);
campoPersonas.addEventListener("input", actualizarResumen);

// Mostrar los precios correctos al cargar la página
actualizarResumen();

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const tourSeleccionado =
        selectorTour.options[selectorTour.selectedIndex].text;

    const fecha = document.getElementById("fecha").value;
    const personas = Number(campoPersonas.value);
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();

    if (!fecha || !nombre || !telefono || personas < 1) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const precioPorPersona = Number(selectorTour.value);
    const total = precioPorPersona * personas;
    const anticipo = Math.round(total * 0.30);
    const saldo = total - anticipo;

    const mensaje = `
¡Hola, Divertur Colombia! Quiero solicitar una reserva.

Tour: ${tourSeleccionado}
Fecha deseada: ${fecha}
Número de personas: ${personas}

Responsable: ${nombre}
Celular: ${telefono}
Correo: ${correo || "No proporcionado"}

Total del tour: ${formatoCOP(total)}
Anticipo del 30 %: ${formatoCOP(anticipo)}
Saldo para el día del tour: ${formatoCOP(saldo)}

Por favor, confirmen la disponibilidad antes de indicarme cómo realizar el anticipo.
    `.trim();

    const url =
        "https://wa.me/573207797182?text=" +
        encodeURIComponent(mensaje);

    window.open(url, "_blank");
});
