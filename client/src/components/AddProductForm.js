import React, { useState, useEffect } from "react";
import axios from "axios";

import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddProductForm = () => {
    let arrayOfKinds = [];
    let [inserted, setInserted] = useState(0);

    useEffect(() => {
        axios.get("http://diet-tracker.szymonburak.pl/product/get-product-kinds")
            .then(async res => {
                if(res.data) {
                    await res.data.kinds.forEach(item => {
                        arrayOfKinds.push(item.nazwa);
                    });
                    let options = "";
                    await arrayOfKinds.forEach(item => {
                        options += "<option>" + item + "</option>";
                    });
                    document.querySelector("select").innerHTML = options;
                }
            })
            .catch(err => {

            });
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Podaj nazwę produktu (co najmniej 3 litery)")
            .required("Podaj nazwę produktu"),
        calories: Yup.number()
            .required("Podaj ilość kalorii"),
        protein: Yup.number()
            .required("Podaj ilość białka"),
        fat: Yup.number()
            .required("Podaj ilość tłuszczu"),
        carbo: Yup.number()
            .required("Podaj ilość węglowodanów"),
        fiber: Yup.number()
            .required("Podaj ilość błonnika"),
        salt: Yup.number()
            .required("Podaj ilość soli"),
        sugar: Yup.number()
            .required("Podaj ilość cukrów"),
        calcium: Yup.number()
            .required("Podaj ilość wapnia"),
        chlorine: Yup.number()
            .required("Podaj ilość chloru"),
        magnesium: Yup.number()
            .required("Podaj ilość magnezu"),
        phosphorus: Yup.number()
            .required("Podaj ilość fosforu"),
        potassium: Yup.number()
            .required("Podaj ilość potasu")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            kind: "owoce",
            calories: "",
            protein: "",
            fat: "",
            fiber: "",
            salt: "",
            carbo: "",
            sugar: "",
            calcium: "",
            chlorine: "",
            magnesium: "",
            phosphorus: "",
            potassium: ""
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            axios.post("http://diet-tracker.szymonburak.pl/product/add-product-to-waiting-room", values)
                .then(res => {
                   if(res.data.inserted === 1) {
                       /* Dodano produkt */
                       localStorage.setItem('diet-tracker-success', '1');
                   }
                   else {
                       /* Nie udalo sie dodac produktu */
                       localStorage.setItem('diet-tracker-success', '0');
                   }
                   /* Przenosimy sie na kolejna podstrone */
                    window.location.href = "/po-dodaniu-produktu";
                })
                .catch(err => {

                });
        }
    });

    return <main className="addProductMain">
        <h1 className="addProductMain__header">
            Dodaj produkt
        </h1>

        <form className="addProductForm" onSubmit={formik.handleSubmit}>
            <label className="label label--addProduct">
                <input className="input"
                       name="name"
                       placeholder="Nazwa produktu"
                       onChange={formik.handleChange}
                       value={formik.values.name}
                />
            </label>
            <label className="label label--addProduct">
                Rodzaj produktu
                <select name="kind" onChange={formik.handleChange} value={formik.values.kind}>

                </select>
            </label>

            <span className="numberLabels">
                <h4 className="numberLabels__header">
                    Wartości odżywcze
                </h4>
                <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Kilokalorie"
                           name="calories"
                           onChange={formik.handleChange}
                           value={formik.values.calories}
                    />
                </label>
                <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Białko"
                           name="protein"
                           onChange={formik.handleChange}
                           value={formik.values.protein}
                    />
                </label>
                 <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Tłuszcze"
                           name="fat"
                           onChange={formik.handleChange}
                           value={formik.values.fat}
                    />
                </label>
                <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Węglowodany"
                           name="carbo"
                           onChange={formik.handleChange}
                           value={formik.values.carbo}
                    />
                </label>
                 <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Błonnik"
                           name="fiber"
                           onChange={formik.handleChange}
                           value={formik.values.fiber}
                    />
                </label>
                 <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Sole"
                           name="salt"
                           onChange={formik.handleChange}
                           value={formik.values.salt}
                    />
                </label>
                 <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Cukry"
                           name="sugar"
                           onChange={formik.handleChange}
                           value={formik.values.sugar}
                    />
                </label>
            </span>

            <span className="numberLabels numberLabels--macro">
                <h4 className="numberLabels__header">
                    Makroelementy
                </h4>
                <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Wapń"
                           name="calcium"
                           onChange={formik.handleChange}
                           value={formik.values.calcium}
                    />
                </label>
                <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Chlor"
                           name="chlorine"
                           onChange={formik.handleChange}
                           value={formik.values.chlorine}
                    />
                </label>
                 <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Magnez"
                           name="magnesium"
                           onChange={formik.handleChange}
                           value={formik.values.magnesium}
                    />
                </label>
                 <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Fosfor"
                           name="phosphorus"
                           onChange={formik.handleChange}
                           value={formik.values.phosphorus}
                    />
                </label>
                 <label className="label label--number">
                    <input className="input"
                           type="number"
                           placeholder="Potas"
                           name="potassium"
                           onChange={formik.handleChange}
                           value={formik.values.potassium}
                    />
                </label>
            </span>

            <ul className="addProductForm__notes">
                <li className="addProductForm__notes__item">
                    * jednostka wartości odżywczych - liczba gramów danego składnika w 100 gramach produktu
                </li>
                <li className="addProductForm__notes__item">
                    * jednostka makroelementów - liczba miligramów danego składnia w 100 gramach produktu
                </li>
            </ul>

            <button type="submit" className="button button--addProduct">
                Dodaj produkt
            </button>

        </form>
    </main>
}

export default AddProductForm;
