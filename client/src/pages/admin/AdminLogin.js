import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import adminAuth from "../../helpers/adminAuth";

const AdminLogin = () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        adminAuth()
            .then(res => {
                if(res.data.loggedIn === 1) {
                    window.location = "/admin-panel";
                }
            })
    })

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
            axios.post("http://diet-tracker.szymonburak.pl/admin-login", values)
                .then(res => {
                    if(res.data.success === 1) {
                        localStorage.setItem('diet-tracker-sessionId', res.data.sessionId);
                        localStorage.setItem('diet-tracker-login', res.data.login);
                        window.location = "/admin-panel";
                    }
                    else {
                        setLogged(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })

    return <>
        <main className="adminLoginContainer">
            <form className="adminLoginForm" onSubmit={formik.handleSubmit}>
                <label>
                    <input className="input"
                           onFocus={() => setLogged(false)}
                           name="login" type="text"
                           placeholder="Login"
                           value={formik.values.login}
                           onChange={formik.handleChange}
                    />
                </label>
                <label>
                    <input className="input"
                           onFocus={() => setLogged(false)}
                           name="password"
                           type="password"
                           placeholder="Hasło"
                           value={formik.values.password}
                           onChange={formik.handleChange}
                    />
                </label>
                {logged ? <h4 className="error">Niepoprawne dane logowania</h4> : ""}
                <button className="button button--adminLogin" type="submit">
                    Zaloguj się
                </button>
            </form>
        </main>
    </>
}

export default AdminLogin;
