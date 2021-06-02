import React, {useState, useEffect, useMemo} from "react";
import TopMenu from "../../components/TopMenu";
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import FormatFunctions from "../../helpers/formatFunctions";

import auth from "../../helpers/auth";
import nutritionDataInitial from "../../helpers/nutritionDataInitial";

const Panel = () => {
    let format = new FormatFunctions();
    let last7Days = FormatFunctions.last7Days();

    let [loggedIn, setLoggedIn] = useState(false);
    let [calories, setCalories] = useState(parseInt(localStorage.getItem('diet-tracker-cpm')));
    let [protein, setProtein] = useState(parseInt(localStorage.getItem('diet-tracker-protein')));
    let [carbo, setCarbo] = useState(parseInt(localStorage.getItem('diet-tracker-carbo')));
    let [magnessium, setMagnessium] = useState(parseFloat(localStorage.getItem('diet-tracker-magnessium')));
    let [data, setData] = useState(nutritionDataInitial);
    let [chartTrigger, setChartTrigger] = useState(0);

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
                let dataInitial = nutritionDataInitial;
                res.data.rows.forEach(item => {
                   const indexOfDate = findDateInLast7Days(format.removeTrailingZeros(item.data.substring(5, 10)));
                   if(indexOfDate !== null) {
                        dataInitial[indexOfDate] = item;
                   }
                });

                dataInitial.reverse();
                setData(dataInitial);
                setChartTrigger(1);
            });
    }, []);

    const findDateInLast7Days = (date) => {
        let indexOfDate = null;
        last7Days.forEach((item, index) => {
            if(item === date) indexOfDate = index;
        });
        return indexOfDate;
    }

    const dataCalories = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [calories, calories, calories, calories, calories, calories, calories],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].kilokalorie,
                    data[5].kilokalorie,
                    data[4].kilokalorie,
                    data[3].kilokalorie,
                    data[2].kilokalorie,
                    data[1].kilokalorie,
                    data[0].kilokalorie
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataProtein = useMemo(() => (
        {
            labels: last7Days,
            datasets: [
                {
                    label: "Zalecane dzienne spozycie",
                    data: [protein, protein, protein, protein, protein, protein, protein],
                    backgroundColor: 'rgb(255, 99, 132)'
                },
                {
                    label: "Wynik",
                    data: [
                        data[6].bialka,
                        data[5].bialka,
                        data[4].bialka,
                        data[3].bialka,
                        data[2].bialka,
                        data[1].bialka,
                        data[0].bialka
                    ],
                    backgroundColor: '#010101'
                }
            ]
        }
    ), [chartTrigger]);

    const dataCarbo = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [carbo, carbo, carbo, carbo, carbo, carbo, carbo],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].weglowodany,
                    data[5].weglowodany,
                    data[4].weglowodany,
                    data[3].weglowodany,
                    data[2].weglowodany,
                    data[1].weglowodany,
                    data[0].weglowodany
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataFiber = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [30, 30, 30, 30, 30, 30, 30],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].blonnik,
                    data[5].blonnik,
                    data[4].blonnik,
                    data[3].blonnik,
                    data[2].blonnik,
                    data[1].blonnik,
                    data[0].blonnik
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataSugar = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [50, 50, 50, 50, 50, 50, 50],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].cukry,
                    data[5].cukry,
                    data[4].cukry,
                    data[3].cukry,
                    data[2].cukry,
                    data[1].cukry,
                    data[0].cukry
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataMagnessium = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [magnessium, magnessium, magnessium, magnessium, magnessium, magnessium, magnessium],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].magnez,
                    data[5].magnez,
                    data[4].magnez,
                    data[3].magnez,
                    data[2].magnez,
                    data[1].magnez,
                    data[0].magnez
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataSalt = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [5, 5, 5, 5, 5, 5, 5],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].sole,
                    data[5].sole,
                    data[4].sole,
                    data[3].sole,
                    data[2].sole,
                    data[1].sole,
                    data[0].sole
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataCalcium = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [1, 1, 1, 1, 1, 1, 1],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].wapn,
                    data[5].wapn,
                    data[4].wapn,
                    data[3].wapn,
                    data[2].wapn,
                    data[1].wapn,
                    data[0].wapn
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataChlorine = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [2.3, 2.3, 2.3, 2.3, 2.3, 2.3, 2.3],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].chlor,
                    data[5].chlor,
                    data[4].chlor,
                    data[3].chlor,
                    data[2].chlor,
                    data[1].chlor,
                    data[0].chlor
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataPotassium = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].potas,
                    data[5].potas,
                    data[4].potas,
                    data[3].potas,
                    data[2].potas,
                    data[1].potas,
                    data[0].potas
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataPhosphorus = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: [
                    data[6].fosfor,
                    data[5].fosfor,
                    data[4].fosfor,
                    data[3].fosfor,
                    data[2].fosfor,
                    data[1].fosfor,
                    data[0].fosfor
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataFats = useMemo(() => ({
        labels: last7Days,
        datasets: [
            {
                label: "Wynik",
                data: [
                    data[6].tluszcze,
                    data[5].tluszcze,
                    data[4].tluszcze,
                    data[3].tluszcze,
                    data[2].tluszcze,
                    data[1].tluszcze,
                    data[0].tluszcze
                ],
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

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
