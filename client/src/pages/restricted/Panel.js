import React, {useState, useEffect, useRef, useMemo} from "react";
import TopMenu from "../../components/TopMenu";
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import FormatFunctions from "../../helpers/formatFunctions";

import auth from "../../helpers/auth";
import { nutritionDataInitial7, nutritionDataInitial30 } from "../../helpers/nutritionDataInitial";
import UserActivity from "../../components/UserActivity";
import MealsDetails from "../../components/MealsDetails";

const Panel = () => {
    let format = new FormatFunctions();
    let last7Days = FormatFunctions.last7Days();
    let last30Days = FormatFunctions.last30Days();
    let array7 = [0, 0, 0, 0, 0, 0, 0];
    let array30 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const btnWeek = useRef(null);
    const btnMonth = useRef(null);

    let [loggedIn, setLoggedIn] = useState(false);
    let [calories, setCalories] = useState(parseInt(localStorage.getItem('diet-tracker-cpm')));
    let [protein, setProtein] = useState(parseInt(localStorage.getItem('diet-tracker-protein')));
    let [carbo, setCarbo] = useState(parseInt(localStorage.getItem('diet-tracker-carbo')));
    let [magnessium, setMagnessium] = useState(parseFloat(localStorage.getItem('diet-tracker-magnessium')));
    let [data7, setData7] = useState(nutritionDataInitial7);
    let [data30, setData30] = useState(nutritionDataInitial30);
    let [chartTrigger, setChartTrigger] = useState(0);
    let [mode, setMode] = useState(30);
    let [currentArray, setCurrentArray] = useState([]);
    let [lastDays, setLastDays] = useState(last30Days);

    useEffect(() => {
        auth()
            .then(res => {
                if(res.data.loggedIn === 1) setLoggedIn(true);
                else window.location = "/";
            });

        /* Pobranie danych o posilkach uzytkownika z ostatniego tygodnia */
        axios.post("http://diet-tracker.szymonburak.pl/data/get-weekly-stats", {
            userId: localStorage.getItem('diet-tracker-userId')
        })
            .then(res => {
                let dataInitial = nutritionDataInitial7;
                res.data.rows.forEach(item => {
                   const indexOfDate = findDateInLast7Days(format.removeTrailingZeros(item.data.substring(5, 10)));
                   if(indexOfDate !== null) {
                        dataInitial[indexOfDate] = item;
                   }
                });

                dataInitial.reverse();
                setData7(dataInitial);
                setChartTrigger(1);
            });

        /* Pobranie danych o posilkach uzytkownika z ostatniego miesiaca */
        axios.post("http://diet-tracker.szymonburak.pl/data/get-monthly-stats", {
            userId: localStorage.getItem('diet-tracker-userId')
        })
            .then(res => {
                let dataInitial = nutritionDataInitial30;
                res.data.rows.forEach(item => {
                    const indexOfDate = findDateInLast30Days(format.removeTrailingZeros(item.data.substring(5, 10)));
                    if(indexOfDate !== null) {
                        dataInitial[indexOfDate] = item;
                    }
                });

                dataInitial.reverse();
                setData30(dataInitial);
                setChartTrigger(2);
            });
    }, []);

    useEffect(() => {
        if(mode === 7) {
            setCurrentArray(array7);
            setLastDays(last7Days);
            if(btnMonth.current) {
                btnWeek.current.style.background = "#5A43DE";
                btnWeek.current.style.color = "#fff";
                btnMonth.current.style.background = "transparent";
                btnMonth.current.style.color = "#333333";
            }
        }
        else {
            setCurrentArray(array30);
            setLastDays(last30Days);
            if(btnMonth.current) {
                btnMonth.current.style.background = "#5A43DE";
                btnMonth.current.style.color = "#fff";
                btnWeek.current.style.background = "transparent";
                btnWeek.current.style.color = "#333333";
            }
        }
        setChartTrigger(chartTrigger+1);
    }, [mode]);

    const findDateInLast30Days = (date) => {
        let indexOfDate = null;
        last30Days.forEach((item, index) => {
            if(item === date) indexOfDate = index;
        });
        return indexOfDate;
    }

    const findDateInLast7Days = (date) => {
        let indexOfDate = null;
        last7Days.forEach((item, index) => {
            if(item === date) indexOfDate = index;
        });
        return indexOfDate;
    }

    const dataCalories = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    calories
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].kilokalorie;
                    else return data30[index].kilokalorie;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataProtein = useMemo(() => (
        {
            labels: lastDays,
            datasets: [
                {
                    label: "Zalecane dzienne spozycie",
                    data: currentArray.map(item => (
                        protein
                    )),
                    backgroundColor: 'rgb(255, 99, 132)'
                },
                {
                    label: "Wynik",
                    data: currentArray.map((item, index) => {
                        if(mode === 7) return data7[index].bialka;
                        else return data30[index].bialka;
                    }).reverse(),
                    backgroundColor: '#010101'
                }
            ]
        }
    ), [chartTrigger]);

    const dataCarbo = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    carbo
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].weglowodany;
                    else return data30[index].weglowodany;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataFiber = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    30
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].blonnik;
                    else return data30[index].blonnik;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataSugar = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    50
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].cukry;
                    else return data30[index].cukry;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataMagnessium = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    magnessium
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].magnez;
                    else return data30[index].magnez;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataSalt = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    5
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].sole;
                    else return data30[index].sole;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataCalcium = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    1
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].wapn;
                    else return data30[index].wapn;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataChlorine = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    2.3
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].chlor;
                    else return data30[index].chlor;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataPotassium = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    2.5
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].potas;
                    else return data30[index].potas;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataPhosphorus = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Zalecane dzienne spozycie",
                data: currentArray.map(item => (
                    0.7
                )),
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].fosfor;
                    else return data30[index].fosfor;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    const dataFats = useMemo(() => ({
        labels: lastDays,
        datasets: [
            {
                label: "Wynik",
                data: currentArray.map((item, index) => {
                    if(mode === 7) return data7[index].tluszcze;
                    else return data30[index].tluszcze;
                }).reverse(),
                backgroundColor: '#010101'
            }
        ]
    }), [chartTrigger]);

    return <div className="container-fluid p-0">
        <TopMenu username={loggedIn ? localStorage.getItem('diet-tracker-login') : ""} />

        {loggedIn ? <>
            <h1 className="dashboardHeader">
                Twoje wyniki z ostatniego
            </h1>

            <div className="dashboardButtons">
                <button ref={btnMonth} className="button button--period button--current" onClick={() => setMode(30)}>
                    Miesiąca
                </button>
                <button ref={btnWeek} className="button button--period" onClick={() => setMode(7)}>
                    Tygodnia
                </button>
            </div>

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

            <UserActivity />

            <MealsDetails />

        </> : ""}
    </div>
}

export default Panel;
