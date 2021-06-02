import React, { useState, useEffect } from "react";
import getUserData from "../helpers/getUserData";

const MyAccountKeyValuePairs = () => {
    const [bmi, setBmi] = useState(0);
    const [cpm, setCpm] = useState(0);
    const [carbo, setCarbo] = useState(0);
    const [protein, setProtein] = useState(0);
    const [magnessium, setMagnessium] = useState(0);

    useEffect(() => {
        const userData = getUserData();
        userData.then(res => {
            setBmi(res.bmi);
            setCpm(res.cpm);
            setCarbo(res.carboNeed);
            setProtein(res.proteinNeed);
            setMagnessium(res.magnessiumNeed);
        })
    });

    return <section className="myAccountKeyValuePairs">
        <h2 className="mainAccountHeader">
            O Twojej diecie
        </h2>

        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                BMI
            </h3>
            <h4 className="keyValuePair__value">
                {!isNaN(bmi) ? bmi : "?"}
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na kalorie
            </h3>
            <h4 className="keyValuePair__value">
                {!isNaN(cpm) ? cpm : "?"}
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na białko
            </h3>
            <h4 className="keyValuePair__value">
                {!isNaN(protein) ? protein : "?"} g
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na błonnik
            </h3>
            <h4 className="keyValuePair__value">
                30 g
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na węglowodany
            </h3>
            <h4 className="keyValuePair__value">
                {!isNaN(carbo) ? carbo : "?"} g
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na cukry
            </h3>
            <h4 className="keyValuePair__value">
                50 g
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na sole
            </h3>
            <h4 className="keyValuePair__value">
                5 g
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na magnez
            </h3>
            <h4 className="keyValuePair__value">
                {!isNaN(magnessium) ? magnessium * 1000 : "?"} mg
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na wapń
            </h3>
            <h4 className="keyValuePair__value">
                1000 mg
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na chlor
            </h3>
            <h4 className="keyValuePair__value">
                2300 mg
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na potas
            </h3>
            <h4 className="keyValuePair__value">
                2500 mg
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na fosfor
            </h3>
            <h4 className="keyValuePair__value">
                700 mg
            </h4>
        </div>
    </section>
}

export default MyAccountKeyValuePairs;
