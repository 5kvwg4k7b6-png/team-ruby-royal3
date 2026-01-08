let admin = false;
const PASSWORD = "TRRoyal653";

// Login admin
function login() {
  const pass = prompt("👑 Contraseña real:");
  if (pass === PASSWORD) {
    admin = true;
    alert("✨ Bienvenida, Alteza");
  } else {
    alert("❌ Acceso denegado");
  }
}

// Agregar fila al contador
function agregarFila() {
  if (!admin) return alert("🔒 Solo la realeza puede editar");

  const tabla = document.getElementById("tabla");
  const fila = tabla.insertRow();

  const c1 = fila.insertCell();
  const c2 = fila.insertCell();
  const c3 = fila.insertCell();
  const c4 = fila.insertCell();

  c1.contentEditable = true;
  c2.contentEditable = true;
  c3.contentEditable = true;

  c1.innerText = "Integrante";
  c2.innerText = "Actividad destacada";
  c3.innerText = "0";
  c3.classList.add("rubys");

  c4.innerHTML = `<button onclick="borrarFila(this)">🗑️</button>`;
}

// Borrar fila
function borrarFila(btn) {
  if (!admin) return alert("🔒 Acción restringida");
  const fila = btn.parentNode.parentNode;
  fila.remove();
}

// Nueva noticia
function nuevaNoticia() {
  if (!admin) return alert("🔒 Solo admin puede publicar");

  const titulo = prompt("Título de la noticia:");
  const contenido = prompt("Contenido:");

  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `<h3>${titulo}</h3><p>${contenido}</p>`;

  document.getElementById("posts").appendChild(post);
}
