import React, {useState, useEffect, useMemo} from "react";
import axios from "axios";
import FormatFunctions from "../helpers/formatFunctions";
import {Bar} from "react-chartjs-2";
import deleteImg from '../static/img/delete.png'

const UserActivity = () => {
    const dataInitial = [
        { suma: 0 },
        { suma: 0 },
        { suma: 0 },
        { suma: 0 },
        { suma: 0 },
        { suma: 0 },
        { suma: 0 }
    ];
    const last7Days = FormatFunctions.last7Days();
    const [data, setData] = useState(0);
    const [lastWeekData, setLastWeekData] = useState(dataInitial);
    const [update, setUpdate] = useState(0);

    const findDateInLast7Days = (date) => {
        let indexOfDate = null;
        last7Days.forEach((item, index) => {
            if(item === date) indexOfDate = index;
        });
        return indexOfDate;
    }

    useEffect(() => {
        const id = localStorage.getItem('diet-tracker-userId');

        axios.post("http://diet-tracker.szymonburak.pl/activity/get-all-activities", {
            id
        })
            .then(res => {
                if (res.data.activities) {
                    setData(res.data.activities);
                }
            });

        axios.post("http://diet-tracker.szymonburak.pl/activity/get-last-week-activities", {
            id
        })
            .then(res => {
               if(res.data.result) {
                   const format = new FormatFunctions();
                   res.data.result.forEach(item => {
                       const indexOfDate = findDateInLast7Days(format.removeTrailingZeros(item.data.substring(5, 10)));
                       if(indexOfDate !== null) {
                           dataInitial[indexOfDate] = item;
                       }
                   });

                   setLastWeekData(dataInitial);
                   setUpdate(1);
               }
            });
    }, [update]);

    const activityData = useMemo(() => (
        {
            labels: last7Days,
            datasets: [
                {
                    label: "Minuty aktywności fizycznej",
                    data: [
                        lastWeekData[0].suma,
                        lastWeekData[1].suma,
                        lastWeekData[2].suma,
                        lastWeekData[3].suma,
                        lastWeekData[4].suma,
                        lastWeekData[5].suma,
                        lastWeekData[6].suma
                    ],
                    backgroundColor: 'rgb(255, 99, 132)'
                }
            ]
        }
    ), [update]);

    const deleteActivity = (id) => {
        axios.post("http://diet-tracker.szymonburak.pl/activity/delete-activity", {
            id
        })
            .then(res => {
               setUpdate(update+1);
            });
    }

    return <section className="userActivity">
        <h1 className="dashboardHeader">
            Twoja aktywność fizyczna
        </h1>
        <main className="userActivity__main">
            <div className="userActivity__left">
                <Bar type="vertical" data={activityData} />
            </div>
            <div className="userActivity__right">
                {data.length ? <table>
                    <thead>
                        <tr>
                            <th>Aktywność</th>
                            <th>Czas trwania</th>
                            <th>Data</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr>
                            <td>{item.nazwa}</td>
                            <td>{item.czas_trwania} min</td>
                            <td>{item.data.substring(0, 10)}</td>
                            <td>
                                <button className="userActivity__delete" onClick={() => deleteActivity(item.id)}>
                                    <img className="userActivity__delete__img" src={deleteImg} alt="usuń" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table> : ""}
            </div>
        </main>
    </section>
}

export default UserActivity;
