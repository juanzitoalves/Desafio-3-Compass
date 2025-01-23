import { initializeApp } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLENBuoIG9B1wPF_cVdwJXreMuLY8wB58",
    authDomain: "login-30f7f.firebaseapp.com",
    projectId: "login-30f7f",
    storageBucket: "login-30f7f.firebasestorage.app",
    messagingSenderId: "668365003291",
    appId: "1:668365003291:web:df379cd80c45ccf82736be",
    measurementId: "G-XDPJJY23M8"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa autenticação e provedor Google
const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
