import React, {useEffect, useState} from "react";

const AfterProductInsert = () => {
    let [success, setSuccess] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('diet-tracker-success') === "1") setSuccess(true);
        localStorage.removeItem('diet-tracker-success');
    }, []);

    return <>
        <main className="afterProductInsertMain">
            <h1 className="afterProductInsertHeader">
                {success ? "Dziękujemy za dodanie produktu. Po rozpatrzeniu przez administrację zostanie dodany do bazy" :
                    "Nie udało się dodać produktu. Prosimy spróbować ponownie"
                }
            </h1>

            <button className="button button--afterProductInsert">
                <a href="/panel">
                    Wróć na stronę główną
                </a>
            </button>
        </main>
    </>
}

export default AfterProductInsert;