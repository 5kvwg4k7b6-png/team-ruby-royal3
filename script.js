let admin = false;
const PASSWORD = "TRRoyal653";

// ---------- CARGAR DATOS ----------
document.addEventListener("DOMContentLoaded", () => {
  cargarTabla();
  cargarNoticias();
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

// ---------- TABLA RUBYS ----------
function agregarFila() {
  if (!admin) return alert("🔒 Solo admin puede editar");

  const tabla = document.getElementById("tabla");
  const fila = tabla.insertRow();

  crearCeldas(fila);
  guardarTabla();
}

function crearCeldas(fila, datos = ["Integrante", "Actividad", "0"]) {
  datos.forEach((texto, i) => {
    const celda = fila.insertCell();
    celda.contentEditable = admin;
    celda.innerText = texto;
    if (i === 2) celda.classList.add("rubys");

    celda.addEventListener("input", guardarTabla);
  });

  const eliminar = fila.insertCell();
  eliminar.innerHTML = `<button onclick="borrarFila(this)">🗑️</button>`;
}

function borrarFila(btn) {
  if (!admin) return alert("🔒 Acción restringida");
  btn.parentNode.parentNode.remove();
  guardarTabla();
}

function guardarTabla() {
  const filas = [];
  document.querySelectorAll("#tabla tr").forEach((fila, i) => {
    if (i === 0) return;
    const celdas = fila.querySelectorAll("td");
    filas.push([
      celdas[0].innerText,
      celdas[1].innerText,
      celdas[2].innerText
    ]);
  });
  localStorage.setItem("rubysTabla", JSON.stringify(filas));
}

function cargarTabla() {
  const datos = JSON.parse(localStorage.getItem("rubysTabla"));
  if (!datos) return;

  const tabla = document.getElementById("tabla");
  datos.forEach(filaDatos => {
    const fila = tabla.insertRow();
    crearCeldas(fila, filaDatos);
  });
}

// ---------- BLOG ----------
function nuevaNoticia() {
  if (!admin) return alert("🔒 Solo admin puede publicar");

  const titulo = prompt("Título de la noticia:");
  const contenido = prompt("Contenido:");

  const noticias = JSON.parse(localStorage.getItem("noticias")) || [];
  noticias.push({ titulo, contenido });

  localStorage.setItem("noticias", JSON.stringify(noticias));
  cargarNoticias();
}

function cargarNoticias() {
  const contenedor = document.getElementById("posts");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

  noticias.forEach(n => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<h3>${n.titulo}</h3><p>${n.contenido}</p>`;
    contenedor.appendChild(div);
  });
}
