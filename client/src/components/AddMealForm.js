import React, {useEffect, useState} from "react";

import axios from 'axios'
import {setIn} from "formik";

const AddMealForm = () => {
    let arrayOfProducts = [];
    let [stateArray, setStateArray] = useState([]);
    let [inserted, setInserted] = useState(false);
    let [chosenProductIndex, setChosenProductIndex] = useState(0);
    let [productAmount, setProductAmount] = useState(100);
    let [insertedMsg, setInsertedMsg] = useState("");

    const labels = ['Nazwa', 'Kilokalorie', 'Węglowodany', 'Białko', 'Tłuszcze', 'Błonnik', 'Cukry', 'Sole',
            'Wapń', 'Chlor', 'Potas', 'Fosfor', 'Magnez'
    ]

    useEffect(() => {
        axios.get("http://localhost:5000/product/get-all-products")
            .then(async (res) => {
                if(res.data) {
                    await res.data.products.forEach(item => {
                        arrayOfProducts.push({
                            i0: item.nazwa,
                            i1: item.kilokalorie,
                            i2: item.weglowodany,
                            i3: item.bialka,
                            i4: item.tluszcze,
                            i5: item.blonnik,
                            i6: item.cukry,
                            i7: item.sole,
                            i8: item.wapn,
                            i9: item.chlor,
                            i10: item.potas,
                            i11: item.fosfor,
                            i12: item.magnez
                        });
                    });
                    let options = "";
                    await arrayOfProducts.forEach((item, index) => {
                        options += `<option value='${index}'>${item.i0}</option>`;
                    });
                    setStateArray(arrayOfProducts);

                    document.querySelector("select").innerHTML = options;
                }
            })
    }, []);

    const addMeal = () => {
        if(productAmount > 0 && productAmount < 1001) {
            axios.post("http://localhost:5000/product/add-meal", {
                userId: localStorage.getItem('diet-tracker-userId'),
                productAmount,
                productName: stateArray[chosenProductIndex].i0
            })
                .then(res => {
                    setInserted(true);
                    if(res.data.inserted === 1) setInsertedMsg("Dodano spozycie produktu");
                    else if(res.data.inserted === 0) setInsertedMsg("Wystapil blad. Prosimy sprobowac poxniej");
                    else setInsertedMsg("Z tego konta dodano juz dzis 10 posilkow. Nie mozna ich dodac wiecej jednego dnia. Zapraszamy jutro.");
                });
        }
    }

    return <main className="addProductMain">
        <h1 className="addProductMain__header">
            Dodaj spożycie
        </h1>

        <label className="label label--addProduct">
            Wybierz produkt
            <select name="product" onChange={(e) => {setChosenProductIndex(parseInt(e.target.value))}}>

            </select>
        </label>

        <label className="label label--addProduct label--addMeal">
            Ilość produktu (w gramach)
            <input className="input"
                   name="weight"
                   type="number"
                   placeholder="0"
                   min={1}
                   max={1000}
                   value={productAmount}
                   onChange={(e) => setProductAmount(e.target.value)}
            />
        </label>


        <div className="myAccountKeyValuePairs">
            {labels.map((item, index) => (
                <div className="keyValuePair" key={index}>
                    <h3 className="keyValuePair__key">
                        {item}
                    </h3>
                    <h4 className="keyValuePair__value">
                        {stateArray[chosenProductIndex] ? !isNaN(stateArray[chosenProductIndex]["i" + index]) ? (stateArray[chosenProductIndex]["i" + index] * productAmount / 100).toFixed(2) : stateArray[chosenProductIndex]["i" + index] : ""}
                    </h4>
                </div>
            ))}
        </div>

        {inserted ? <h3 className="mealInserted">{insertedMsg}</h3> : <button className="button button--addProduct" onClick={() => addMeal()}>
            Dodaj posiłek
        </button> }


        </main>
}

export default AddMealForm;
