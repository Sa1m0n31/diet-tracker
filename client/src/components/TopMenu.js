import React from "react";

import loginImg from '../static/img/account.png'
import registerImg from '../static/img/register.png'
import hamburger from '../static/img/hamburger.png'
import add from '../static/img/plus.png'
import logoutImg from '../static/img/logout.png'
import foodImg from '../static/img/food.png'
import axios from 'axios';

const TopMenu = ({username, admin}) => {
    const logout = () => {
        axios.post("http://localhost:5000/logout", {
            sessionId: localStorage.getItem('diet-tracker-sessionId')
        })
            .then(res => {
                if(res.data.loggedOut === 1) {
                    localStorage.removeItem('diet-tracker-sessionId');
                    localStorage.removeItem('diet-tracker-login');
                    window.location = "/";
                }
            });
    }

    const logoutAdmin = () => {
        axios.post("http://localhost:5000/admin-logout", {
            sessionId: localStorage.getItem('diet-tracker-sessionId')
        })
            .then(res => {
                if(res.data.loggedOut === 1) {
                    localStorage.removeItem('diet-tracker-sessionId');
                    localStorage.removeItem('diet-tracker-login');
                    window.location = "/";
                }
            });
    }

    return <header className="siteMenu">
        <h1 className="siteMenu__header">
            <a href="/">
                Diet tracker
                {admin ? " - panel administratora" : ""}
            </a>
        </h1>

        <div className="siteMenu__list d-none d-md-flex m-0">
            {!admin ? (username ?  <>
                    <a className="siteMenu__list__item d-flex align-items-center mr-0 mr-lg-2 mr-xl-5 pr-3 pr-lg-5" href="/moje-konto">
                        <img className="siteMenu__list__img" src={loginImg} alt="zaloguj-sie" />
                        <span className="siteMenu__list__text">{username}</span>
                    </a>
                    <a className="siteMenu__list__item d-flex align-items-center mr-0 mr-lg-2 mr-xl-5 pr-3 pr-lg-5" href="/dodaj-spozycie">
                        <img className="siteMenu__list__img" src={foodImg} alt="dodaj-spozycie" />
                        <span className="siteMenu__list__text">Dodaj spożycie</span>
                    </a>
                    <a className="siteMenu__list__item d-flex align-items-center mr-0 mr-lg-2 mr-xl-5 pr-3 pr-lg-5" href="/dodaj-produkt">
                        <img className="siteMenu__list__img" src={add} alt="dodaj-produkt" />
                        <span className="siteMenu__list__text">Dodaj produkt</span>
                    </a>
                    <button className="siteMenu__list__item d-flex align-items-center" onClick={() => logout()}>
                        <img className="siteMenu__list__img" src={logoutImg} alt="wyloguj-sie" />
                        <span className="siteMenu__list__text">Wyloguj się</span>
                    </button>
                </> : <>
                    <a className="siteMenu__list__item d-flex align-items-center mr-0 mr-lg-2 mr-xl-5 pr-3 pr-lg-5" href="/login/#register-form">
                        <img className="siteMenu__list__img" src={registerImg} alt="zarejestruj-sie" />
                        <span className="siteMenu__list__text">Zarejestruj się</span>
                    </a>

                    <a className="siteMenu__list__item d-flex align-items-center" href="/login">
                        <img className="siteMenu__list__img" src={loginImg} alt="zaloguj-sie" />
                        <span className="siteMenu__list__text">Zaloguj się</span>
                    </a>
                </>) : <>
                <button className="siteMenu__list__item d-flex align-items-center" onClick={() => logoutAdmin()}>
                    <img className="siteMenu__list__img" src={logoutImg} alt="wyloguj-sie" />
                    <span className="siteMenu__list__text">Wyloguj się</span>
                </button>
            </>}
        </div>
        <button className="siteMenu__hamburgerBtn d-block d-md-none">
            <img className="siteMenu__hamburgerBtn__img" src={hamburger} alt="menu" />
        </button>
    </header>
}

export default TopMenu;
