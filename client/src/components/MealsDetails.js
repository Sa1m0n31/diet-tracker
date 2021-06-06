import React, {useEffect, useState} from "react";
import axios from "axios";
import deleteImg from "../static/img/delete.png";

const MealsDetails = () => {
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        const id = localStorage.getItem('diet-tracker-userId');

        axios.post("http://diet-tracker.szymonburak.pl/data/get-meals-details", {
            id
        })
            .then(res => {
                if(res.data.result) {
                    setData(res.data.result);
                }
            });
    }, [update]);

    const deleteMeal = (id) => {
        axios.post("http://diet-tracker.szymonburak.pl/data/delete-meal", {
            id
        })
            .then(res => {
                setUpdate(update+1);
            });
    }

    return <section className="mealsDetails">
        <h1 className="dashboardHeader">
            Szczegóły Twoich ostatnich posiłków
        </h1>
        <main className="mealsDetails__main">
            {data.length ? <table>
                <thead>
                <tr>
                    <th>Produkt</th>
                    <th>Ilość</th>
                    <th>Data</th>
                    <th>Usuń</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr>
                        <td>{item.nazwa}</td>
                        <td>{item.ilosc} g</td>
                        <td>{item.data.substring(0, 10)}</td>
                        <td>
                            <button className="userActivity__delete" onClick={() => deleteMeal(item.id)}>
                                <img className="userActivity__delete__img" src={deleteImg} alt="usuń" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table> : ""}
        </main>
    </section>
}

export default MealsDetails;
