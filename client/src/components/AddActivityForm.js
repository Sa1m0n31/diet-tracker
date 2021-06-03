import React, {useState, useEffect} from "react";
import axios from "axios";

const AddActivityForm = () => {
    const [time, setTime] = useState(0);
    const [inserted, setInserted] = useState(false);
    const [insertedMsg, setInsertedMsg] = useState("");
    let arrayOfSports = [];

    useEffect(() => {
        axios.get("http://localhost:5000/activity/get-all-sports")
            .then(async res => {
                if(res.data.sports) {
                    await res.data.sports.forEach(item => {
                        arrayOfSports.push(item.nazwa);
                    });
                    let options = "";
                    await arrayOfSports.forEach((item, index) => {
                        options += `<option value='${index+1}'>${item}</option>`;
                    });
                    document.querySelector("select").innerHTML = options;
                }
            })


        setTimeout(() => {
            console.log(document.querySelector("select").value);
        }, 3000);
    })

    const addActivity = () => {
        const sport = parseInt(document.querySelector("select").value);
        const time = parseInt(document.querySelector(".input").value);
        console.log(sport);
        axios.post("http://localhost:5000/activity/add-activity", {
            id: parseInt(localStorage.getItem('diet-tracker-userId')),
            time,
            sport
        })
            .then(res => {
                console.log(sport);
               setInserted(true);
               if(res.data.result) {
                   setInsertedMsg("Aktywność fizyczna została dodana");
               }
               else {
                   setInsertedMsg("Wystąpił problem z dodaniem aktywności fizycznej. Proszę spróbować później.");
               }
            });
    }

    return <main className="addProductMain">
        <h1 className="addProductMain__header">
            Dodaj aktywność fizyczną
        </h1>

        <label className="label label--addProduct">
            Wybierz dyscyplinę sportu
            <select name="sport" onChange={() => console.log("hi")}>

            </select>
        </label>

        <label className="label label--addProduct label--addMeal">
            Długość trwania aktywności fizycznej (w minutach)
            <input className="input"
                   name="time"
                   type="number"
                   placeholder="0"
                   min={1}
                   max={1000}
            />
        </label>

        {inserted ? <h3 className="mealInserted">{insertedMsg}</h3> : <button className="button button--addProduct" onClick={() => addActivity()}>
            Dodaj aktywnośc fizyczną
        </button> }
    </main>
}

export default AddActivityForm;
