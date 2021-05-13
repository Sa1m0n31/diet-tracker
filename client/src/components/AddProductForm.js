import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProductForm = () => {
    let [kinds, setKinds] = useState("abc");
    let arrayOfKinds = [];

    useEffect(() => {
        axios.get("http://localhost:5000/product/get-product-kinds")
            .then(async res => {
                if(res.data) {
                    console.log(res.data.kinds);
                    await res.data.kinds.forEach(async item => {
                        arrayOfKinds.push(item.nazwa);
                    });
                    // await setKinds("jeden");
                    setTimeout(() => {
                        setKinds("tre");
                    }, 3000);
                }
            })
            .catch(err => {

            });
    }, []);

    return <main className="addProductMain">
        <h1 className="addProductMain__header">
            Dodaj produkt
        </h1>

        <form className="addProductForm">
            <label className="label label--addProduct">
                <input className="input" placeholder="Nazwa produktu" />
            </label>
            <label className="label label--addProduct">
                Rodzaj produktu
                <select>
                    {arrayOfKinds.forEach(item => (
                        <option>Owoce</option>
                    ))}
                </select>
            </label>

            <span className="numberLabels">
                <h4 className="numberLabels__header">
                    Wartości odżywcze
                </h4>
                <label className="label label--number">
                    <input className="input" type="number" placeholder="Kilokalorie" />
                </label>
                <label className="label label--number">
                    <input className="input" type="number" placeholder="Białko" />
                </label>
                 <label className="label label--number">
                    <input className="input" type="number" placeholder="Tłuszcze" />
                </label>
                 <label className="label label--number">
                    <input className="input" type="number" placeholder="Kwasy tł. nasycone" />
                </label>
                 <label className="label label--number">
                    <input className="input" type="number" placeholder="Błonnik" />
                </label>
                 <label className="label label--number">
                    <input className="input" type="number" placeholder="Sole" />
                </label>
                 <label className="label label--number">
                    <input className="input" type="number" placeholder="Cukry" />
                </label>
            </span>

            <span className="numberLabels numberLabels--macro">
                <h4 className="numberLabels__header">
                    Makroelementy
                </h4>
                <label className="label label--number">
                    <input className="input" type="number" placeholder="Wapń" />
                </label>
                <label className="label label--number">
                    <input className="input" type="number" placeholder="Chlor" />
                </label>
                 <label className="label label--number">
                    <input className="input" type="number" placeholder="Magnez" />
                </label>
                 <label className="label label--number">
                    <input className="input" type="number" placeholder="Fosfor" />
                </label>
                 <label className="label label--number">
                    <input className="input" type="number" placeholder="Potas" />
                </label>
            </span>

            <button className="button button--addProduct">
                Dodaj produkt
            </button>

        </form>
    </main>
}

export default AddProductForm;