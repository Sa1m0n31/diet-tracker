import React, {useEffect, useState} from "react";

import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from "formik";

const MyAccountForm = () => {
    let [id, setId] = useState(0);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [gender, setGender] = useState("");
    let [login, setLogin] = useState("");
    let [height, setHeight] = useState(null);
    let [weight, setWeight] = useState(null);

    useEffect(() => {
        /* Pobieramy dane o uzytkowniku */
        let currentUser = 'pati'; /* TODO */

        axios.get("http://localhost:5000/user/get-user-data", {
            params: {
                login: currentUser
            }
        })
            .then(res => {
               const userData = res.data.userData;

               setId(userData.id);
               if(userData.imie) setFirstName(userData.imie);
               if(userData.nazwisko) setLastName(userData.nazwisko);
               if(userData.plec) setGender(userData.plec);
               if(userData.login) setLogin(userData.login);
               if(userData.wzrost) setHeight(userData.wzrost);
               if(userData.waga) setWeight(userData.waga);
            })
            .catch(err => {

            });
    }, []);

    const validationSchema = Yup.object({

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

                })
                .catch(err => {

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
                    <option>Kobieta</option>
                    <option>Mężczyzna</option>
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