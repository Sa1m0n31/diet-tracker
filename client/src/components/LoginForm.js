import React from "react";

import loginFormImg from '../static/img/diet-tracker-login.png'

const LoginForm = () => {
    return <main className="loginMain m-auto row d-flex justify-content-between">
        <section className="loginMain__left col-12 col-lg-6">
            <img className="loginMain__img" src={loginFormImg} alt="logowanie" />
        </section>

        <section className="loginMain__right col-12 col-lg-4">
            <form className="loginMain__form">
                <label className="loginMain__label">
                    <input className="loginMain__input"
                           placeholder="Login"
                           name="login" />
                </label>
                <label className="loginMain__label">
                    <input className="loginMain__input"
                           placeholder="Hasło"
                           name="password" />
                </label>

                <button className="button button--login">
                    Zaloguj się
                </button>
            </form>
        </section>
    </main>
}

export default LoginForm;