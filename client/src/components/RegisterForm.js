import React, { useState } from "react";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterForm = () => {
    let [taken, setTaken] = useState(false);

    const validationSchema = Yup.object({
       login: Yup.string()
           .min(3, "Login powinien się składać z co najmniej 3 liter")
           .required("Wpisz swój login"),
        email: Yup.string()
            .email("Niepoprawny adres email")
            .required("Wpisz swój adres email"),
        password: Yup.string()
            .min(6, "Hasło powinno się składać z co najmniej sześciu liter")
            .required("Wpisz swoje hasło"),
        repeatPassword: Yup.string()
            .min(6, "Potwierdź hasło")
            .required("Potwierdź hasło")
            .oneOf([Yup.ref('password'), null], "Podane hasła nie są identyczne")
    });

    const formik = useFormik({
        initialValues: {
            login: "",
            email: "",
            password: "",
            repeatPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            axios.post("http://localhost:5000/register", values)
                .then(res => {
                    if(res.data.insert === 1) {
                        localStorage.setItem('registered', 'T');
                        window.location = "/after-register";
                    }
                    else {
                        setTaken(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });

    return <section className="registerForm" id="register-form">
        <h2 className="formHeader">
            Rejestracja
        </h2>
            <form className="registerForm__form" onSubmit={formik.handleSubmit}>
                <label className="label label--register">
                    <input className="input input--register"
                           placeholder="Login"
                           onChange={formik.handleChange}
                           value={formik.values.login}
                           name="login" />
                </label>
                <label className="label label--register">
                    <input className="input input--register"
                           placeholder="Adres email"
                           onChange={formik.handleChange}
                           value={formik.values.email}
                           name="email" />
                </label>
                <label className="label label--register">
                    <input className="input input--register"
                           placeholder="Hasło"
                           type="password"
                           onChange={formik.handleChange}
                           value={formik.values.password}
                           name="password" />
                </label>
                <label className="label label--register">
                    <input className="input input--register"
                           placeholder="Powtórz hasło"
                           type="password"
                           onChange={formik.handleChange}
                           value={formik.values.repeatPassword}
                           name="repeatPassword" />
                </label>

                <h5 className="form__errors">
                    <span>{formik.errors.login ? formik.errors.login : ""}</span>
                    <span>{formik.errors.email ? formik.errors.email : ""}</span>
                    <span>{formik.errors.password ? formik.errors.password : ""}</span>
                    <span>{formik.errors.repeatPassword ? formik.errors.repeatPassword : ""}</span>
                    <span>{taken ? "Podana nazwa uzytkownika lub adres email są zajęte" : ""}</span>
                </h5>

                <button type="submit" className="button button--register">
                    Zarejestruj się
                </button>
            </form>
    </section>
}

export default RegisterForm;