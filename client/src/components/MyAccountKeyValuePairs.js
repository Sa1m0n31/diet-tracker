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
                {localStorage.getItem('diet-tracker-carbo')}
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na cukry
            </h3>
            <h4 className="keyValuePair__value">
                {localStorage.getItem('diet-tracker-sugar')}
            </h4>
        </div>
    </section>
}

export default MyAccountKeyValuePairs;
