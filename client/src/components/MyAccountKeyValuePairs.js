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
                25,5
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na kalorie
            </h3>
            <h4 className="keyValuePair__value">
                2500
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na białko
            </h3>
            <h4 className="keyValuePair__value">
                80
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na węglowodany
            </h3>
            <h4 className="keyValuePair__value">
                122
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na tłuszcze
            </h3>
            <h4 className="keyValuePair__value">
                25
            </h4>
        </div>
        <div className="keyValuePair">
            <h3 className="keyValuePair__key">
                Dzienne zapotrzebowanie na cukry
            </h3>
            <h4 className="keyValuePair__value">
                2
            </h4>
        </div>
    </section>
}

export default MyAccountKeyValuePairs;