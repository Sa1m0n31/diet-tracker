import React from "react";
import TopMenu from "../components/TopMenu";

import useDemoConfig from '../helpers/useDemoConfig';
import { Chart } from 'react-charts';

const Panel = () => {

    const data_calories = React.useMemo(
        () => [
            {
                label: 'Wynik',
                data: [
                    { primary: 1, secondary: 1900 },
                    { primary: 2, secondary: 2000 },
                    { primary: 3, secondary: 2132 },
                    { primary: 4, secondary: 2023 },
                    { primary: 5, secondary: 1738 },
                    { primary: 6, secondary: 2593 },
                    { primary: 7, secondary: 2001 },
                ],
            },
            {
                label: 'Zalecane dzienne spozycie',
                data: [
                    { primary: 1, secondary: 2000 },
                    { primary: 2, secondary: 2000 },
                    { primary: 3, secondary: 2000 },
                    { primary: 4, secondary: 2000 },
                    { primary: 5, secondary: 2000 },
                    { primary: 6, secondary: 2000 },
                    { primary: 7, secondary: 2000 }
                ],
            }
        ],
        []
    )

    const data_protein = React.useMemo(
        () => [
            {
                label: 'Wynik',
                data: [
                    { primary: 1, secondary: 1900 },
                    { primary: 2, secondary: 2000 },
                    { primary: 3, secondary: 2132 },
                    { primary: 4, secondary: 2023 },
                    { primary: 5, secondary: 1738 },
                    { primary: 6, secondary: 2593 },
                    { primary: 7, secondary: 2001 },
                ],
            },
            {
                label: 'Zalecane dzienne spozycie',
                data: [
                    { primary: 1, secondary: 2000 },
                    { primary: 2, secondary: 2000 },
                    { primary: 3, secondary: 2000 },
                    { primary: 4, secondary: 2000 },
                    { primary: 5, secondary: 2000 },
                    { primary: 6, secondary: 2000 },
                    { primary: 7, secondary: 2000 }
                ],
            }
        ],
        []
    )

    const data_carbo = React.useMemo(
        () => [
            {
                label: 'Wynik',
                data: [
                    { primary: 1, secondary: 1900 },
                    { primary: 2, secondary: 2000 },
                    { primary: 3, secondary: 2132 },
                    { primary: 4, secondary: 2023 },
                    { primary: 5, secondary: 1738 },
                    { primary: 6, secondary: 2593 },
                    { primary: 7, secondary: 2001 },
                ],
            },
            {
                label: 'Zalecane dzienne spozycie',
                data: [
                    { primary: 1, secondary: 2000 },
                    { primary: 2, secondary: 2000 },
                    { primary: 3, secondary: 2000 },
                    { primary: 4, secondary: 2000 },
                    { primary: 5, secondary: 2000 },
                    { primary: 6, secondary: 2000 },
                    { primary: 7, secondary: 2000 }
                ],
            }
        ],
        []
    )

    const data_fats = React.useMemo(
        () => [
            {
                label: 'Wynik',
                data: [
                    { primary: 1, secondary: 1900 },
                    { primary: 2, secondary: 2000 },
                    { primary: 3, secondary: 2132 },
                    { primary: 4, secondary: 2023 },
                    { primary: 5, secondary: 1738 },
                    { primary: 6, secondary: 2593 },
                    { primary: 7, secondary: 2001 },
                ],
            },
            {
                label: 'Zalecane dzienne spozycie',
                data: [
                    { primary: 1, secondary: 2000 },
                    { primary: 2, secondary: 2000 },
                    { primary: 3, secondary: 2000 },
                    { primary: 4, secondary: 2000 },
                    { primary: 5, secondary: 2000 },
                    { primary: 6, secondary: 2000 },
                    { primary: 7, secondary: 2000 }
                ],
            }
        ],
        []
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
        <TopMenu username="szymon" />

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
                    Tłuszcze
                </h3>
                <Chart data={data_fats} series={series} axes={axes} width={500} height={500} tooltip />
            </div>
        </div>
    </div>
}

export default Panel;