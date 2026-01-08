import {
  cargarRubys,
  guardarRuby,
  cargarNoticias,
  guardarNoticia
} from "./firebase.js";

let admin = false;
const PASSWORD = "TRRoyal653";

// ---------- INICIO ----------
document.addEventListener("DOMContentLoaded", async () => {
  const rubys = await cargarRubys();
  mostrarRubys(rubys);

  const noticias = await cargarNoticias();
  mostrarNoticias(noticias);
});

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

// ---------- RUBYS ----------
async function agregarFila() {
  if (!admin) return alert("🔒 Solo admin puede editar");

  await guardarRuby({
    integrante: "Integrante",
    actividad: "Actividad",
    rubys: 0
  });

  const rubys = await cargarRubys();
  mostrarRubys(rubys);
}

function mostrarRubys(rubys) {
  const tabla = document.getElementById("tabla");
  if (!tabla) return;

  // borrar filas viejas
  document.querySelectorAll("#tabla tr:not(:first-child)").forEach(f => f.remove());

  rubys.forEach(r => {
    const fila = tabla.insertRow();

    crearCelda(fila, r.integrante);
    crearCelda(fila, r.actividad);
    crearCelda(fila, r.rubys, true);

    const eliminar = fila.insertCell();
    eliminar.innerHTML = `<button onclick="borrarFila(this)">🗑️</button>`;
  });
}

function crearCelda(fila, texto, esRuby = false) {
  const celda = fila.insertCell();
  celda.innerText = texto;
  celda.contentEditable = admin;
  if (esRuby) celda.classList.add("rubys");
}

function borrarFila(btn) {
  if (!admin) return alert("🔒 Acción restringida");
  btn.parentNode.parentNode.remove();
  // (opcional: borrar en Firebase después)
}

// ---------- BLOG ----------
async function nuevaNoticia() {
  if (!admin) return alert("🔒 Solo admin puede publicar");

  const titulo = prompt("Título de la noticia:");
  const contenido = prompt("Contenido:");

  if (!titulo || !contenido) return;

  await guardarNoticia({ titulo, contenido });

  const noticias = await cargarNoticias();
  mostrarNoticias(noticias);
}

function mostrarNoticias(noticias) {
  const contenedor = document.getElementById("posts");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  noticias.forEach(n => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<h3>${n.titulo}</h3><p>${n.contenido}</p>`;
    contenedor.appendChild(div);
  });
}
