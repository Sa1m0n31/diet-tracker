import axios from "axios";

const getUserData = () => {
    /* Pobieramy dane o uzytkowniku */
    const promise = axios.get("http://localhost:5000/user/get-user-data", {
        params: {
            login: localStorage.getItem('diet-tracker-login')
        }
    });

    return promise.then(res => {
        const userData = res.data.userData;
        let id, name, surname, gender, login, height, weight;
        let bmi, cpm, proteinNeed, carboNeed, magnessiumNeed;

        id = userData.id;
        if(userData.imie) name = userData.imie;
        if(userData.nazwisko) surname = userData.nazwisko;
        if(userData.plec) gender = userData.plec;
        if(userData.login) login = userData.login;
        if(userData.wzrost) height = userData.wzrost;
        if(userData.waga) weight = userData.waga;

        /* Oblicz BMI */
        let w = weight;
        let h = height;

        bmi = (w / Math.pow(parseFloat(parseFloat(h) / 100.00), 2)).toFixed(2);

        /* Oblicz dzienne zapotrzebowanie kaloryczne */
        cpm = 9.99 * w
            + 6.25 * h
        if(gender === 'k') {
            cpm -= 161;
        }
        else {
            cpm += 5;
        }
        cpm *= 1.3;
        cpm = cpm.toFixed(0);

        /* Oblicz dzienne zapotrzebowanie na bialko */
        proteinNeed = (w * 0.9).toFixed(0);

        /* Oblicz dzienne zapotrzebowanie na weglowodany */
        carboNeed = 350 + w;

        /* Oblicz dzienne zapotrzebowanie na magnez */
        if(gender === 'k') magnessiumNeed = 0.31;
        else magnessiumNeed = 0.41;

        return {
            id,
            name,
            surname,
            gender,
            login,
            height,
            weight,
            bmi,
            cpm,
            proteinNeed,
            carboNeed,
            magnessiumNeed
        }
    });
}

export default getUserData;
