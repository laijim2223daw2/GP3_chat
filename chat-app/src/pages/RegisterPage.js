import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';

/**
 * Página de registro
 */
export const RegisterPage = () => {

    const { register } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    });

    /**
     * Maneja el cambio de los campos del formulario
     * @param {object} target - Elemento HTML que disparó el evento
     */
    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    /**
     * Maneja el envío del formulario de registro
     * @param {object} ev - Evento de envío del formulario
     */
    const onSubmit = async (ev) => {
        ev.preventDefault();

        const { email, password, name } = form;
        const msg = await register(name, email, password);

        if (msg !== true) {
            Swal.fire('Error', msg, 'error');
        }
    }

    /**
     * Verifica si todos los campos del formulario están completos
     * @returns {boolean} - Indicador de si todos los campos están completos
     */
    const todoOk = () => {
        return (
            form.email.length > 0 &&
            form.password.length > 0 &&
            form.name.length > 0
        ) ? true : false;
    }

    return (
        <div className="login-container">
            <form
                className="login100-form validate-form flex-sb flex-w"
                onSubmit={onSubmit}
            >
                <span className="login100-form-title mb-3">
                    Registro
                </span>

                <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={onChange}
                    />
                    <span className="focus-input100"></span>
                </div>


                <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={onChange}
                    />
                    <span className="focus-input100"></span>
                </div>


                <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={onChange}
                    />
                    <span className="focus-input100"></span>
                </div>

                <div className="row mb-3">
                    <div className="col text-right">
                        <Link to="/auth/login" className="txt1">
                            Ya tienes cuenta?
                        </Link>
                    </div>
                </div>

                <div className="container-login100-form-btn m-t-17">
                    <button
                        type="submit"
                        className="login100-form-btn"
                        disabled={!todoOk()}
                    >
                        Crear cuenta
                    </button>
                </div>

            </form>
        </div>
    )
}
