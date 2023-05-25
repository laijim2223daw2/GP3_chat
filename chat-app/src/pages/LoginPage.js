import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';

/**
 * Página de inicio de sesión
 */
export const LoginPage = () => {

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberme: false
    });

    useEffect(() => {
        /**
         * Cargar el email almacenado en localStorage si existe
         */
        const email = localStorage.getItem('email');
        if (email) {
            setForm((form) => ({
                ...form,
                email,
                rememberme: true,
            }));
        }

    }, [])


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
     * Cambia el estado de la opción "Recordarme"
     */
    const toggleCheck = () => {
        setForm({
            ...form,
            rememberme: !form.rememberme
        });
    }

    /**
     * Maneja el envío del formulario de inicio de sesión
     * @param {object} ev - Evento de envío del formulario
     */
    const onSubmit = async (ev) => {
        ev.preventDefault();

        /**
         * Almacenar o eliminar el email en localStorage según la opción "Recordarme"
         */
        (form.rememberme)
            ? localStorage.setItem('email', form.email)
            : localStorage.removeItem('email');

        const { email, password } = form;
        const ok = await login(email, password);

        if (!ok) {
            Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
        }
    }

    /**
     * Verifica si todos los campos del formulario están completos
     * @returns {boolean} - Indicador de si todos los campos están completos
     */
    const todoOk = () => {
        return (form.email.length > 0 && form.password.length > 0) ? true : false;
    }


    return (
        <div className="login-container">
            <form
                className="login100-form validate-form flex-sb flex-w"
                onSubmit={onSubmit}
            >
                <span className="login100-form-title mb-3">
                    Login
                </span>

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

                <div className="row mb-3 my-row check-container">
                    <div
                        className="col my-col"
                        onClick={() => toggleCheck()}
                    >
                        <input
                            className="input-checkbox100"
                            id="ckb1"
                            type="checkbox"
                            name="rememberme"
                            checked={form.rememberme}
                            readOnly
                        />
                        <label className="label-checkbox100">
                            Recordarme
                        </label>
                    </div>

                    <div className="col text-right my-col link-container">
                        <Link to="/auth/register" className="txt1">
                            Nueva cuenta?
                        </Link>
                    </div>
                </div>

                <div className="container-login100-form-btn m-t-17">
                    <button
                        type="submit"
                        className="login100-form-btn"
                        disabled={!todoOk()}
                    >
                        Ingresar
                    </button>
                </div>

            </form>
        </div>
    )
}
