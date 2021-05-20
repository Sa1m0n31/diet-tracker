import React, {useEffect, useState} from "react";

import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddMealForm = () => {
    let arrayOfProducts = [];
    let [stateArray, setStateArray] = useState([]);
    let [chosenProductIndex, setChosenProductIndex] = useState(-1);
    let [productAmount, setProductAmount] = useState(100);

    const labels = ['Kilokalorie', 'Węglowodany', 'Białko', 'Tłuszcze', 'Kwasy tłuszczowe nasycone', 'Błonnik', 'Cukry', 'Sole',
            'Wapń', 'Chlor', 'Potas', 'Chlor', 'Magnez'
    ];

    useEffect(() => {
        axios.get("http://localhost:5000/product/get-all-products")
            .then(async (res) => {
                if(res.data) {
                    await res.data.products.forEach(item => {
                        arrayOfProducts.push({
                            name: item.nazwa,
                            calories: item.kilokalorie,
                            protein: item.bialko,
                            fat: item.tluszcze,
                            saturatedFat: item.kwasy_tlusczowe_nasycone,
                            sugar: item.cukry,
                            carbo: item.weglowodany,
                            salt: item.sole,
                            fiber: item.blonnik,
                            chlorine: item.chlor,
                            phosphorus: item.fosfor,
                            magnesium: item.magnez,
                            calcium: item.wapn,
                            potassium: item.potas
                        });
                    });
                    let options = "";
                    await arrayOfProducts.forEach((item, index) => {
                        options += `<option value='${index}'>${item.name}</option>`;
                    });
                    setStateArray(arrayOfProducts);
                    document.querySelector("select").innerHTML = options;
                }
            })
    }, []);

    useEffect(() => {
        /* Zmieniony zostal produkt lub jego ilosc - zmieniamy ilosci wartosci odzywczych i makroelementow na podgladzie */
        //console.log(stateArray[chosenProductIndex]);
        console.log(stateArray[0]);
    }, [chosenProductIndex, productAmount]);

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
                   value={productAmount}
                   onChange={(e) => setProductAmount(e.target.value)}
            />
        </label>


        <div className="myAccountKeyValuePairs">
            {labels.map(item => (
                <div className="keyValuePair">
                    <h3 className="keyValuePair__key">
                        {item}
                    </h3>
                    <h4 className="keyValuePair__value">
                        {stateArray[chosenProductIndex] ? stateArray[chosenProductIndex].calories : ""}
                    </h4>
                </div>
            ))}
        </div>


        </main>
}

export default AddMealForm;
