import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUgt5cpebZV2VUnWgxwg8c77S5_vDdux8",
  authDomain: "team-ruby-royale.firebaseapp.com",
  projectId: "team-ruby-royale",
  storageBucket: "team-ruby-royale.firebasestorage.app",
  messagingSenderId: "669107261224",
  appId: "1:669107261224:web:d9a0804788919d6f378a1d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 RUBYS
export async function guardarRuby(data) {
  await addDoc(collection(db, "rubys"), data);
}

export async function cargarRubys() {
  const querySnapshot = await getDocs(collection(db, "rubys"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 📰 NOTICIAS
export async function guardarNoticia(data) {
  await addDoc(collection(db, "noticias"), data);
}

export async function cargarNoticias() {
  const querySnapshot = await getDocs(collection(db, "noticias"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
