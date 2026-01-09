import {
  cargarRubys,
  guardarRuby,
  borrarRuby,
  cargarNoticias,
  guardarNoticia
} from "./firebase.js";

let admin = false;
const PASSWORD = "TRRoyal653";

// ---------- LOGIN ----------
function login() {
  const pass = prompt("👑 Contraseña real:");
  if (pass === PASSWORD) {
    admin = true;
    alert("✨ Modo admin activado");
  } else {
    alert("❌ Contraseña incorrecta");
  }
}

// ---------- INICIO ----------
document.addEventListener("DOMContentLoaded", async () => {
  mostrarRubys(await cargarRubys());
  mostrarNoticias(await cargarNoticias());
});

// ---------- RUBYS ----------
async function agregarFila() {
  if (!admin) return alert("🔒 Solo admin");

  await guardarRuby({
    integrante: "Integrante",
    actividad: "Actividad",
    rubys: 0
  });

  mostrarRubys(await cargarRubys());
}

function mostrarRubys(rubys) {
  const tabla = document.getElementById("tabla");
  document.querySelectorAll("#tabla tr:not(:first-child)").forEach(f => f.remove());

  rubys.forEach(r => {
    const fila = tabla.insertRow();

    crearCelda(fila, r.integrante);
    crearCelda(fila, r.actividad);
    crearCelda(fila, r.rubys, true);

    const del = fila.insertCell();
    del.innerHTML = `<button onclick="eliminarRuby('${r.id}')">🗑️</button>`;
  });
}

function crearCelda(fila, texto, ruby = false) {
  const celda = fila.insertCell();
  celda.innerText = texto;
  celda.contentEditable = admin;
  if (ruby) celda.classList.add("rubys");
}

async function eliminarRuby(id) {
  if (!admin) return alert("🔒 Solo admin");
  await borrarRuby(id);
  mostrarRubys(await cargarRubys());
}

// ---------- BLOG ----------
async function nuevaNoticia() {
  if (!admin) return alert("🔒 Solo admin");

  const titulo = prompt("Título:");
  const contenido = prompt("Contenido:");
  if (!titulo || !contenido) return;

  await guardarNoticia({ titulo, contenido });
  mostrarNoticias(await cargarNoticias());
}

function mostrarNoticias(noticias) {
  const cont = document.getElementById("posts");
  cont.innerHTML = "";

  noticias.forEach(n => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<h3>${n.titulo}</h3><p>${n.contenido}</p>`;
    cont.appendChild(div);
  });
}

// Hacer accesible desde HTML
window.login = login;
window.agregarFila = agregarFila;
window.nuevaNoticia = nuevaNoticia;
window.eliminarRuby = eliminarRuby;
