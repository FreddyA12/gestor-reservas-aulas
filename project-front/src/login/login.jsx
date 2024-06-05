import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../login/login.css";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mensajeError, setMensajeError] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validarLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setMensajeError("Completa todos los campos...");
        } else {
            try {
                const resp = await axios.post("http://localhost:8080/login", {
                    username,
                    password,
                });
                Swal.fire({
                    title: 'Bienvenido...',
                    html: "<i>Inicio de sesión exitoso</i>",
                    icon: "success",
                });
                return resp.data;
            } catch (error) {
                const {message} = error.response.data;
                console.log(message);
                if (message == "Credenciales inválidas") {
                    setMensajeError(message);
                } else {
                    Swal.fire({
                        title: 'Oops...',
                        html: "<i>Error al conectar con el servidor</i>",
                        icon: "error",
                    });
                }
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="login-container">
                <div className="login-form">
                    <img
                        src="src/img/logo.png"
                        alt="Logo de la Universidad Técnica de Ambato"
                    />
                    <h1>Bienvenido!</h1>
                    <form onSubmit={validarLogin}>
                        <div className="form-group">
                            <label htmlFor="usuario">Usuario:</label>
                            <input
                                value={username}
                                onChange={handleUsernameChange}
                                type="text"
                                className="form-control"
                                id="usuario"
                                placeholder="Ingrese su usuario"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                value={password}
                                onChange={handlePasswordChange}
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Ingrese su contraseña"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
            <div className="right-panel">
                <h1>Universidad Técnica de Ambato</h1>
                <p>Innovación y Excelencia</p>
                <p>"Formando profesionales que transforman el mundo"</p>
            </div>
        </div>
    );
}

export default Login;