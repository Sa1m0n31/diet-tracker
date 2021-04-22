import React, { useEffect } from "react";
import TopMenu from "../components/TopMenu";

const AfterRegister = () => {
    useEffect(() => {
        if(localStorage.getItem('registered') !== 'T') {
            window.location = "/login";
        }
        localStorage.removeItem('registered');
    })

    return <div className="container-fluid p-0">
        <TopMenu />
        <main className="afterRegister">
            <h1 className="afterRegister__header">
                Rejestracja zakończona powodzeniem
            </h1>
            <button className="button button--afterRegister">
                <a href="/login">
                    Przejdź do logowania
                </a>
            </button>
        </main>
    </div>
}

export default AfterRegister;