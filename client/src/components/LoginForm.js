import React, { useState } from "react";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from "axios";

import loginFormImg from '../static/img/diet-tracker-login.png'

const LoginForm = () => {
    let [logged, setLogged] = useState(true);

    const validationSchema = Yup.object({
        login: Yup.string()
            .required("Wpisz swój login"),
        password: Yup.string()
            .required("Wpisz swoje hasło")
    });

    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post("http://localhost:5000/login", values)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if(res.data.success === 1) {
                        setLogged(true);
                        localStorage.setItem('diet-tracker-sessionId', res.data.sessionId);
                        localStorage.setItem('diet-tracker-userId', res.data.userId);
                        localStorage.setItem('diet-tracker-login', res.data.login);
                        window.location = "/panel";
                    }
                    else {
                        setLogged(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })

    return <main className="loginMain m-auto row d-flex justify-content-between">
        <h2 className="formHeader formHeader--login col-12">
            Logowanie
        </h2>

        <section className="loginMain__left col-12 col-lg-6">
            <img className="loginMain__img" src={loginFormImg} alt="logowanie" />
        </section>

        <section className="loginMain__right col-12 col-lg-4">
                <form className="loginMain__form" onSubmit={formik.handleSubmit}>
                    <label className="label">
                        <input className="input"
                               placeholder="Login"
                               value={formik.values.login}
                               onChange={formik.handleChange}
                               name="login" />
                    </label>
                    <label className="label">
                        <input className="input"
                               placeholder="Hasło"
                               type="password"
                               value={formik.values.password}
                               onChange={formik.handleChange}
                               name="password" />
                    </label>

                    <h5 className="form__errors form__errors--login">
                        <span>{formik.errors.login ? formik.errors.login : ""}</span>
                        <span>{formik.errors.password ? formik.errors.password : ""}</span>
                        <span>{!logged ? "Niepoprawna nazwa użytkownika lub hasło" : ""}</span>
                    </h5>

                    <button className="button button--login">
                        Zaloguj się
                    </button>
                </form>
        </section>
    </main>
}

export default LoginForm;
