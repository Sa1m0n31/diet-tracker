import React from "react";

const MyAccountKeyValuePairs = () => {
    return <section className="myAccountKeyValuePairs">
        <h2 className="mainAccountHeader">
            O Twojej diecie
        </h2>

        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                BMI
            </h3>
            <h4 className="keyValuePair__value">
                {localStorage.getItem('diet-tracker-bmi')}
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na kalorie
            </h3>
            <h4 className="keyValuePair__value">
                {localStorage.getItem('diet-tracker-cpm')}
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na białko
            </h3>
            <h4 className="keyValuePair__value">
                {localStorage.getItem('diet-tracker-protein')} g
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
                {localStorage.getItem('diet-tracker-carbo')} g
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
                {parseFloat(localStorage.getItem('diet-tracker-magnessium')) * 1000} mg
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
