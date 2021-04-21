import React from "react";

import landingPageImg from '../static/img/diet-tracker-main.png';

const Landing = () => {
    return <main className="landing d-flex justify-content-between m-auto row">
        <section className="landing__left col-12 col-lg-7 col-xl-5 order-2 order-lg-1">
            <h1 className="landing__header">
                Najlepsze narzędzie do kontroli Twojej diety
            </h1>
            <h2 className="landing__subheader">
                Skorzystaj z naszego narzędzia do śledzenia wartości odżywczych w swojej diecie
            </h2>
            <button className="button button--landing">
                <a href="/login">
                    Dowiedz się więcej
                </a>
            </button>
        </section>

        <section className="landing__right col-12 col-lg-5 col-xl-6 order-1 order-lg-2">
            <img className="landing__img" src={landingPageImg} alt="diet-tracker" />
        </section>
    </main>
}

export default Landing;