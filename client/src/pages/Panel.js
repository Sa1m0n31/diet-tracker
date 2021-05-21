import React, { useState, useEffect } from "react";
import TopMenu from "../components/TopMenu";
import axios from 'axios'
import useDemoConfig from '../helpers/useDemoConfig';
import { Chart } from 'react-charts';

import auth from "../helpers/auth";

const Panel = () => {
    let [loggedIn, setLoggedIn] = useState(false);
    let [calories, setCalories] = useState(parseInt(localStorage.getItem('diet-tracker-cpm')));
    let [protein, setProtein] = useState(parseInt(localStorage.getItem('diet-tracker-protein')));
    let [carbo, setCarbo] = useState(parseInt(localStorage.getItem('diet-tracker-carbo')));
    let [data, setData] = useState([
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0
        },
        {
            kilokalorie: 0,
            bialka: 0,
            weglowodany: 0,
            blonnik: 0
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

    useEffect(() => {
        console.log(data);
    }, [data]);

    const data_calories = React.useMemo(
        () => [
            {
                label: 'Wynik',
                data: [
                    { primary: 1, secondary: parseInt(data[6].kilokalorie * data[0].ilosc / 100) },
                    { primary: 2, secondary: parseInt(data[5].kilokalorie * data[0].ilosc / 100) },
                    { primary: 3, secondary: parseInt(data[4].kilokalorie * data[0].ilosc / 100) },
                    { primary: 4, secondary: parseInt(data[3].kilokalorie * data[0].ilosc / 100) },
                    { primary: 5, secondary: parseInt(data[2].kilokalorie * data[0].ilosc / 100) },
                    { primary: 6, secondary: parseInt(data[1].kilokalorie * data[0].ilosc / 100) },
                    { primary: 7, secondary: parseInt(data[0].kilokalorie * data[0].ilosc / 100) },
                ],
            },
            {
                label: 'Zalecane dzienne spozycie',
                data: [
                    { primary: 1, secondary: calories },
                    { primary: 2, secondary: calories },
                    { primary: 3, secondary: calories },
                    { primary: 4, secondary: calories },
                    { primary: 5, secondary: calories },
                    { primary: 6, secondary: calories },
                    { primary: 7, secondary: calories }
                ],
            }
        ],
        [data]
    )

    const data_protein = React.useMemo(
        () => [
            {
                label: 'Wynik',
                data: [
                    { primary: 1, secondary: parseInt(data[6].bialka * data[0].ilosc / 100) },
                    { primary: 2, secondary: parseInt(data[5].bialka * data[0].ilosc / 100) },
                    { primary: 3, secondary: parseInt(data[4].bialka * data[0].ilosc / 100) },
                    { primary: 4, secondary: parseInt(data[3].bialka * data[0].ilosc / 100) },
                    { primary: 5, secondary: parseInt(data[2].bialka * data[0].ilosc / 100) },
                    { primary: 6, secondary: parseInt(data[1].bialka * data[0].ilosc / 100) },
                    { primary: 7, secondary: parseInt(data[0].bialka * data[0].ilosc / 100) }
                ],
            },
            {
                label: 'Zalecane dzienne spozycie',
                data: [
                    { primary: 1, secondary: protein },
                    { primary: 2, secondary: protein },
                    { primary: 3, secondary: protein },
                    { primary: 4, secondary: protein },
                    { primary: 5, secondary: protein },
                    { primary: 6, secondary: protein },
                    { primary: 7, secondary: protein }
                ],
            }
        ],
        [data]
    )

    const data_carbo = React.useMemo(
        () => [
            {
                label: 'Wynik',
                data: [
                    { primary: 1, secondary: parseInt(data[6].weglowodany * data[0].ilosc / 100) },
                    { primary: 2, secondary: parseInt(data[5].weglowodany * data[0].ilosc / 100) },
                    { primary: 3, secondary: parseInt(data[4].weglowodany * data[0].ilosc / 100) },
                    { primary: 4, secondary: parseInt(data[3].weglowodany * data[0].ilosc / 100) },
                    { primary: 5, secondary: parseInt(data[2].weglowodany * data[0].ilosc / 100) },
                    { primary: 6, secondary: parseInt(data[1].weglowodany * data[0].ilosc / 100) },
                    { primary: 7, secondary: parseInt(data[0].weglowodany * data[0].ilosc / 100) },
                ],
            },
            {
                label: 'Zalecane dzienne spozycie',
                data: [
                    { primary: 1, secondary: carbo },
                    { primary: 2, secondary: carbo },
                    { primary: 3, secondary: carbo },
                    { primary: 4, secondary: carbo },
                    { primary: 5, secondary: carbo },
                    { primary: 6, secondary: carbo },
                    { primary: 7, secondary: carbo }
                ],
            }
        ],
        [data]
    )

    const data_fiber = React.useMemo(
        () => [
            {
                label: 'Wynik',
                data: [
                    { primary: 1, secondary: parseInt(data[6].blonnik * data[0].ilosc / 100) },
                    { primary: 2, secondary: parseInt(data[5].blonnik * data[0].ilosc / 100) },
                    { primary: 3, secondary: parseInt(data[4].blonnik * data[0].ilosc / 100) },
                    { primary: 4, secondary: parseInt(data[3].blonnik * data[0].ilosc / 100) },
                    { primary: 5, secondary: parseInt(data[2].blonnik * data[0].ilosc / 100) },
                    { primary: 6, secondary: parseInt(data[1].blonnik * data[0].ilosc / 100) },
                    { primary: 7, secondary: parseInt(data[0].blonnik * data[0].ilosc / 100) },
                ],
            },
            {
                label: 'Zalecane dzienne spozycie',
                data: [
                    { primary: 1, secondary: 30 },
                    { primary: 2, secondary: 30 },
                    { primary: 3, secondary: 30 },
                    { primary: 4, secondary: 30 },
                    { primary: 5, secondary: 30 },
                    { primary: 6, secondary: 30 },
                    { primary: 7, secondary: 30 }
                ],
            }
        ],
        [data]
    )

    const series = React.useMemo(
        () => ({
            showPoints: false,
        }),
        []
    );

    const axes = React.useMemo(
        () => [
            {
                primary: true,
                type: "time",
                position: "bottom",
            },
            { type: "linear", position: "left" },
        ],
        []
    );


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
                    <Chart data={data_calories} series={series} axes={axes} width={500} height={500} tooltip />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Białko
                    </h3>
                    <Chart data={data_protein} series={series} axes={axes} width={500} height={500} tooltip />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Węglowodany
                    </h3>
                    <Chart data={data_carbo} series={series} axes={axes} width={500} height={500} tooltip />
                </div>

                <div className="chartContainer">
                    <h3 className="chartHeader">
                        Błonnik
                    </h3>
                    <Chart data={data_fiber} series={series} axes={axes} width={500} height={500} tooltip />
                </div>
            </div>
        </> : ""}
    </div>
}

export default Panel;
