import React, {useEffect, useState} from "react";

import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from "formik";
import getUserData from "../helpers/getUserData";

const MyAccountForm = () => {
    let [id, setId] = useState(0);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [gender, setGender] = useState("");
    let [login, setLogin] = useState("");
    let [height, setHeight] = useState(null);
    let [weight, setWeight] = useState(null);

    useEffect(() => {
        const userData = getUserData();
        userData.then(res => {
            setId(res.id);
            setFirstName(res.name);
            setLastName(res.surname);
            if(res.gender === 'm') setGender("Mężczyzna");
            else setGender("Kobieta");
            setLogin(res.login);1
            setHeight(res.height);
            setWeight(res.weight);
        });
    }, []);

    const validationSchema = Yup.object({
        login: Yup.string()
            .required("Login jest polem wymaganym")
            .min(3, "Login powinien się składać z co najmniej 3 liter")
    });

    const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            login: login,
            height: height,
            weight: weight
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            values['id'] = id;
            axios.post("http://localhost:5000/user/edit-user", values)
                .then(res => {
                    console.log(res.data);
                });
        }
    });

    return <main className="mainAccount">
        <h2 className="mainAccountHeader">
            Twoje dane
        </h2>
        <form className="mainAccountForm" onSubmit={formik.handleSubmit}>
            <label className="label label--myAccount">
                <input className="input"
                       name="firstName"
                       onChange={formik.handleChange}
                       value={formik.values.firstName} />
                <span>Imię</span>
            </label>
            <label className="label label--myAccount">
                <input className="input"
                       name="lastName"
                       onChange={formik.handleChange}
                       value={formik.values.lastName} />
                <span>Nazwisko</span>
            </label>
            <label className="label label--myAccount">
                <select className="input"
                        name="gender"
                        onChange={formik.handleChange}
                        value={formik.values.gender}>
                    <option value="Kobieta">Kobieta</option>
                    <option value="Mężczyzna">Mężczyzna</option>
                </select>
                <span>Płeć</span>
            </label>

            <label className="label label--myAccount">
                <input className='input'
                       type="text"
                       name="login"
                       onChange={formik.handleChange}
                       value={formik.values.login} />
                <span>Login</span>
            </label>
            <label className="label label--myAccount">
                <input className="input"
                       type="number"
                       name="height"
                       onChange={formik.handleChange}
                       value={formik.values.height} />
                <span>Wzrost</span>
            </label>
            <label className="label label--myAccount">
                <input className="input"
                       type="number"
                       name="weight"
                       onChange={formik.handleChange}
                       value={formik.values.weight} />
                <span>Waga</span>
            </label>

            <button type="submit" className="button button--editMyAccount">
                Zmień dane
            </button>
        </form>
    </main>
}

export default MyAccountForm;
