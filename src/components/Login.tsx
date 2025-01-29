import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithEmailAndPassword ,signInWithPopup } from "firebase/auth";
import "../styles components/Login.css"
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Login com Google bem-sucedido!");
      navigate('/home')
    } catch (error: any) {
      alert("Erro ao fazer login com Google: " + error.message);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login bem-sucedido!");
      navigate("/home");
    } catch (error: any) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const navigate = useNavigate();


  
  const handleHome = async () => {
    navigate("/home")
  };

  const navToSignIn = async () => {
    navigate("/signup")
  }

  return (
    <section>
      <header>
        <p id="hour">9:41</p>
        <img src="../images/wifi.png" alt="" />
        <img src="../images/Wi-Fi.png" alt="" />
        <img src="../images/Battery.png" alt="" />
      </header>

      <main>
        <article className="title">
          <h1>Audio</h1>
          <p>It's modular and designed to last</p>
        </article>
        <form className="login-section">
            <input className="login input-" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <input className="login input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
            <a href="# ">Forgot Password</a>
            <button className="login button" onClick={handleLogin}>Sign in</button>
            <button className="login google-button" onClick={handleGoogleLogin}>Sign in with Google</button>
        </form>
      </main>

      <footer>
        <p onClick={navToSignIn}>Didn’t have any account? <a onClick={navToSignIn} href="# ">Sign Up here</a></p>
        
      </footer>
    </section>
  );
};

export default Login;

