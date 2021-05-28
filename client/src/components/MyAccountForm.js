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
        axios.get("http://localhost:5000/user/get-user-data", {
            params: {
                login: localStorage.getItem('diet-tracker-login')
            }
        })
            .then(async res => {
               const userData = res.data.userData;

               setId(userData.id);
               if(userData.imie) setFirstName(userData.imie);
               if(userData.nazwisko) setLastName(userData.nazwisko);
               if(userData.plec) {
                   setGender(userData.plec);
                   localStorage.setItem('diet-tracker-gender', userData.plec.toString());
               }
               if(userData.login) setLogin(userData.login);
               if(userData.wzrost) {
                   setHeight(userData.wzrost);
                   localStorage.setItem('diet-tracker-height', userData.wzrost);
               }
               if(userData.waga) {
                   setWeight(userData.waga);
                   localStorage.setItem('diet-tracker-weight', userData.waga);
               }

               /* Oblicz BMI */
               let w = parseInt(localStorage.getItem('diet-tracker-weight'));
               let h = parseInt(localStorage.getItem('diet-tracker-height'));
               let g = localStorage.getItem('diet-tracker-gender');

               let bmi = w / Math.pow(parseFloat(parseFloat(h) / 100.00), 2);
               localStorage.setItem('diet-tracker-bmi', bmi.toFixed(2).toString());

               /* Oblicz dzienne zapotrzebowanie kaloryczne */
               let cpm = 9.99 * w
                   + 6.25 * h
               if(localStorage.getItem('diet-tracker-gender') === 'k') {
                   cpm -= 161;
               }
               else {
                    cpm += 5;
               }
               cpm *= 1.3;
               localStorage.setItem('diet-tracker-cpm', parseInt(cpm).toString());

               /* Oblicz dzienne zapotrzebowanie na bialko */
               let proteinNeed = w * 0.9;
               localStorage.setItem('diet-tracker-protein', parseInt(proteinNeed).toString());

               /* Oblicz dzienne zapotrzebowanie na weglowodany */
               let carboNeed = 350 + w;
               localStorage.setItem('diet-tracker-carbo', carboNeed.toString());

               /* Oblicz dzienne zapotrzebowanie na magnez */
               let magnessiumNeed;
               if(localStorage.getItem('diet-tracker-gender') === 'k') magnessiumNeed = 0.31;
               else magnessiumNeed = 0.41;
               localStorage.setItem('diet-tracker-magnessium', magnessiumNeed);


            })
            .catch(err => {

            });
    }, []);

    const calculateOptimalValues = () => {
        console.log(height);
    }

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
