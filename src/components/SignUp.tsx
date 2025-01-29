import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import "../styles components/SignUp.css"
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Cadastro com Google bem-sucedido!");
      navigate("/home");
    } catch (error: any) {
      alert("Erro ao fazer cadastro com Google: " + error.message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cadastro bem-sucedido!");
      navigate("/home");
    } catch (error: any) {
      alert("Erro ao fazer cadastro: " + error.message);
    }
  };

    const navigate = useNavigate();

    const handleHome = async () => {
        navigate("/home")
      };

    const handleSignUp = async () => {
    navigate("/")
  };

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
        <article className="login-section">
          <input className="login input-" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <input className="login input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
          <a href="# ">Forgot Password</a>
          <button className="login button" onClick={handleSignup}>Sign up</button>
          <button className="login google-button" onClick={handleGoogleSignup}>Sign up with Google</button>
        </article>
      </main>

      <footer>
      <p onClick={handleSignUp}>If you have an account?<a onClick={handleSignUp} href="# "> Sign In here</a></p>
      </footer>
    </section>
  );
};

export default SignUp;
