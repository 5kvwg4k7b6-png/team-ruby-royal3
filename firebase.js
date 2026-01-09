import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------- RUBYS ----------
export async function cargarRubys() {
  const snap = await getDocs(collection(db, "rubys"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function guardarRuby(data) {
  await addDoc(collection(db, "rubys"), data);
}

export async function borrarRuby(id) {
  await deleteDoc(doc(db, "rubys", id));
}

// ---------- NOTICIAS ----------
export async function cargarNoticias() {
  const snap = await getDocs(collection(db, "noticias"));
  return snap.docs.map(d => d.data());
}

export async function guardarNoticia(data) {
  await addDoc(collection(db, "noticias"), data);
}
