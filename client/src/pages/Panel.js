import React, { useState, useEffect } from "react";
import TopMenu from "../components/TopMenu";
import axios from 'axios'
import { Line } from 'react-chartjs-2'

import auth from "../helpers/auth";

const Panel = () => {
    let [loggedIn, setLoggedIn] = useState(false);
    let [calories, setCalories] = useState(parseInt(localStorage.getItem('diet-tracker-cpm')));
    let [protein, setProtein] = useState(parseInt(localStorage.getItem('diet-tracker-protein')));
    let [carbo, setCarbo] = useState(parseInt(localStorage.getItem('diet-tracker-carbo')));
    let [magnessium, setMagnessium] = useState(parseFloat(localStorage.getItem('diet-tracker-magnessium')));
    let [data, setData] = useState([
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0,
            cukry: 0,
            sole: 0,
            magnez: 0,
            wapn: 0,
            chlor: 0,
            potas: 0,
            fosfor: 0,
            tluszcze: 0

        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0,
            cukry: 0,
            sole: 0,
            magnez: 0,
            wapn: 0,
            chlor: 0,
            potas: 0,
            fosfor: 0,
            tluszcze: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0,
            cukry: 0,
            sole: 0,
            magnez: 0,
            wapn: 0,
            chlor: 0,
            potas: 0,
            fosfor: 0,
            tluszcze: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0,
            cukry: 0,
            sole: 0,
            magnez: 0,
            wapn: 0,
            chlor: 0,
            potas: 0,
            fosfor: 0,
            tluszcze: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0,
            cukry: 0,
            sole: 0,
            magnez: 0,
            wapn: 0,
            chlor: 0,
            potas: 0,
            fosfor: 0,
            tluszcze: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0,
            cukry: 0,
            sole: 0,
            magnez: 0,
            wapn: 0,
            chlor: 0,
            potas: 0,
            fosfor: 0,
            tluszcze: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0,
            cukry: 0,
            sole: 0,
            magnez: 0,
            wapn: 0,
            chlor: 0,
            potas: 0,
            fosfor: 0,
            tluszcze: 0
        }
    ]);

    useEffect(() => {
        auth()
            .then(res => {
                if(res.data.loggedIn === 1) setLoggedIn(true);
                else window.location = "/";
            });

        /* Pobranie danych o posilkach uzytkownika z ostatniego tygodnia */
        axios.post("http://localhost:5000/data/get-weekly-stats", {
            userId: localStorage.getItem('diet-tracker-userId')
        })
            .then(res => {
                if(res.data.rows.length > 6) setData(res.data.rows);
            });
    }, []);

    const last7Days = () => {
        const currentDate = new Date();
        let today = new Date();
        currentDate.setDate(today.getDate()-7);
        const minus1 = currentDate.getDate() + "." + parseInt(currentDate.getMonth()+1);
        currentDate.setDate(today.getDate()-6);
        currentDate.setMonth(today.getMonth());
        const minus2 = currentDate.getDate() + "." + parseInt(currentDate.getMonth()+1)
        currentDate.setDate(today.getDate()-5);
        currentDate.setMonth(today.getMonth());
        const minus3 = currentDate.getDate() + "." + parseInt(currentDate.getMonth()+1)
        currentDate.setDate(today.getDate()-4);
        currentDate.setMonth(today.getMonth());
        const minus4 = currentDate.getDate() + "." + parseInt(currentDate.getMonth()+1)
        currentDate.setDate(today.getDate()-3);
        currentDate.setMonth(today.getMonth());
        const minus5 = currentDate.getDate() + "." + parseInt(currentDate.getMonth()+1)
        currentDate.setDate(today.getDate()-2);
        currentDate.setMonth(today.getMonth());
        const minus6 = currentDate.getDate() + "." + parseInt(currentDate.getMonth()+1)
        currentDate.setDate(today.getDate()-1);
        currentDate.setMonth(today.getMonth());
        const minus7 = currentDate.getDate() + "." + parseInt(currentDate.getMonth()+1)

        return [minus1, minus2, minus3, minus4, minus5, minus6, minus7]
    }

    const dataCalories = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [calories, calories, calories, calories, calories, calories, calories],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].kilokalorie * data[0].ilosc / 100,
                    data[5].kilokalorie * data[0].ilosc / 100,
                    data[4].kilokalorie * data[0].ilosc / 100,
                    data[3].kilokalorie * data[0].ilosc / 100,
                    data[2].kilokalorie * data[0].ilosc / 100,
                    data[1].kilokalorie * data[0].ilosc / 100,
                    data[0].kilokalorie * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataProtein = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [protein, protein, protein, protein, protein, protein, protein],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].bialka * data[0].ilosc / 100,
                    data[5].bialka * data[0].ilosc / 100,
                    data[4].bialka * data[0].ilosc / 100,
                    data[3].bialka * data[0].ilosc / 100,
                    data[2].bialka * data[0].ilosc / 100,
                    data[1].bialka * data[0].ilosc / 100,
                    data[0].bialka * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataCarbo = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [carbo, carbo, carbo, carbo, carbo, carbo, carbo],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].weglowodany * data[0].ilosc / 100,
                    data[5].weglowodany * data[0].ilosc / 100,
                    data[4].weglowodany * data[0].ilosc / 100,
                    data[3].weglowodany * data[0].ilosc / 100,
                    data[2].weglowodany * data[0].ilosc / 100,
                    data[1].weglowodany * data[0].ilosc / 100,
                    data[0].weglowodany * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataFiber = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [30, 30, 30, 30, 30, 30, 30],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].blonnik * data[0].ilosc / 100,
                    data[5].blonnik * data[0].ilosc / 100,
                    data[4].blonnik * data[0].ilosc / 100,
                    data[3].blonnik * data[0].ilosc / 100,
                    data[2].blonnik * data[0].ilosc / 100,
                    data[1].blonnik * data[0].ilosc / 100,
                    data[0].blonnik * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataSugar = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [50, 50, 50, 50, 50, 50, 50],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].cukry * data[0].ilosc / 100,
                    data[5].cukry * data[0].ilosc / 100,
                    data[4].cukry * data[0].ilosc / 100,
                    data[3].cukry * data[0].ilosc / 100,
                    data[2].cukry * data[0].ilosc / 100,
                    data[1].cukry * data[0].ilosc / 100,
                    data[0].cukry * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataMagnessium = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [magnessium, magnessium, magnessium, magnessium, magnessium, magnessium, magnessium],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].magnez * data[0].ilosc / 100,
                    data[5].magnez * data[0].ilosc / 100,
                    data[4].magnez * data[0].ilosc / 100,
                    data[3].magnez * data[0].ilosc / 100,
                    data[2].magnez * data[0].ilosc / 100,
                    data[1].magnez * data[0].ilosc / 100,
                    data[0].magnez * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataSalt = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [5, 5, 5, 5, 5, 5, 5],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].sole * data[0].ilosc / 100,
                    data[5].sole * data[0].ilosc / 100,
                    data[4].sole * data[0].ilosc / 100,
                    data[3].sole * data[0].ilosc / 100,
                    data[2].sole * data[0].ilosc / 100,
                    data[1].sole * data[0].ilosc / 100,
                    data[0].sole * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataCalcium = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [1, 1, 1, 1, 1, 1, 1],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].wapn * data[0].ilosc / 100,
                    data[5].wapn * data[0].ilosc / 100,
                    data[4].wapn * data[0].ilosc / 100,
                    data[3].wapn * data[0].ilosc / 100,
                    data[2].wapn * data[0].ilosc / 100,
                    data[1].wapn * data[0].ilosc / 100,
                    data[0].wapn * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataChlorine = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [2.3, 2.3, 2.3, 2.3, 2.3, 2.3, 2.3],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].chlor * data[0].ilosc / 100,
                    data[5].chlor * data[0].ilosc / 100,
                    data[4].chlor * data[0].ilosc / 100,
                    data[3].chlor * data[0].ilosc / 100,
                    data[2].chlor * data[0].ilosc / 100,
                    data[1].chlor * data[0].ilosc / 100,
                    data[0].chlor * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataPotassium = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].potas * data[0].ilosc / 100,
                    data[5].potas * data[0].ilosc / 100,
                    data[4].potas * data[0].ilosc / 100,
                    data[3].potas * data[0].ilosc / 100,
                    data[2].potas * data[0].ilosc / 100,
                    data[1].potas * data[0].ilosc / 100,
                    data[0].potas * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataPhosphorus = {
        labels: last7Days(),
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].fosfor * data[0].ilosc / 100,
                    data[5].fosfor * data[0].ilosc / 100,
                    data[4].fosfor * data[0].ilosc / 100,
                    data[3].fosfor * data[0].ilosc / 100,
                    data[2].fosfor * data[0].ilosc / 100,
                    data[1].fosfor * data[0].ilosc / 100,
                    data[0].fosfor * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    const dataFats = {
        labels: last7Days(),
        datasets: [
            {
                label: "Wynik",
                data: [
                    data[6].tluszcze * data[0].ilosc / 100,
                    data[5].tluszcze * data[0].ilosc / 100,
                    data[4].tluszcze * data[0].ilosc / 100,
                    data[3].tluszcze * data[0].ilosc / 100,
                    data[2].tluszcze * data[0].ilosc / 100,
                    data[1].tluszcze * data[0].ilosc / 100,
                    data[0].tluszcze * data[0].ilosc / 100
                ],
                backgroundColor: '#010101'
            }
        ]
    }

    return <div className="container-fluid p-0">
        <TopMenu username={loggedIn ? localStorage.getItem('diet-tracker-login') : ""} />

        {loggedIn ? <>
            <h1 className="dashboardHeader">
                Twoje wyniki z ostatniego tygodnia
            </h1>

            <div className="charts">
                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Kilokalorie
                    </h3>
                    <Line data={dataCalories} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Białko
                    </h3>
                    <Line data={dataProtein} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Węglowodany
                    </h3>
                    <Line data={dataCarbo} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Błonnik
                    </h3>
                    <Line data={dataFiber} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Cukry
                    </h3>
                    <Line data={dataSugar} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Sole
                    </h3>
                    <Line data={dataSalt} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Tłuszcze
                    </h3>
                    <Line data={dataFats} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Magnez
                    </h3>
                    <Line data={dataMagnessium} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Wapń
                    </h3>
                    <Line data={dataCalcium} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Potas
                    </h3>
                    <Line data={dataPotassium} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Chlor
                    </h3>
                    <Line data={dataChlorine} />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Fosfor
                    </h3>
                    <Line data={dataPhosphorus} />
                </div>
            </div>
        </> : ""}
    </div>
}

export default Panel;
