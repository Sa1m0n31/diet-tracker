import React from "react";

import loginImg from '../static/img/account.png'
import registerImg from '../static/img/register.png'
import hamburger from '../static/img/hamburger.png'
import add from '../static/img/plus.png'

const TopMenu = ({username}) => {
    return <header className="siteMenu">
        <h1 className="siteMenu__header">
            <a href="/">
                Diet tracker
            </a>
        </h1>

        <div className="siteMenu__list d-none d-md-flex m-0">
            {username ?  <><a className="siteMenu__list__item d-flex align-items-center mr-0 mr-lg-2 mr-xl-5 pr-3 pr-lg-5" href="/moje-konto">
                <img className="siteMenu__list__img" src={loginImg} alt="zaloguj-sie" />
                <span className="siteMenu__list__text">{username}</span>
            </a>
                <a className="siteMenu__list__item d-flex align-items-center" href="/dodaj-produkt">
                    <img className="siteMenu__list__img" src={add} alt="dodaj-produkt" />
                    <span className="siteMenu__list__text">Dodaj produkt</span>
                </a>
            </> : <>
                <a className="siteMenu__list__item d-flex align-items-center mr-0 mr-lg-2 mr-xl-5 pr-3 pr-lg-5" href="/login/#register-form">
                    <img className="siteMenu__list__img" src={registerImg} alt="zarejestruj-sie" />
                    <span className="siteMenu__list__text">Zarejestruj się</span>
                </a>

                <a className="siteMenu__list__item d-flex align-items-center" href="/login">
                    <img className="siteMenu__list__img" src={loginImg} alt="zaloguj-sie" />
                    <span className="siteMenu__list__text">Zaloguj się</span>
                </a>
            </>}
        </div>
        <button className="siteMenu__hamburgerBtn d-block d-md-none">
            <img className="siteMenu__hamburgerBtn__img" src={hamburger} alt="menu" />
        </button>
    </header>
}

export default TopMenu;