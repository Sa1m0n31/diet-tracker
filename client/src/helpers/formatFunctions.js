class FormatFunctions {
    removeTrailingZeros = (str) => {
        /* Dostaje na wejsciu date w formacie: dd-mm */
        let month = str.substring(0, 2);
        let day = str.substring(3, 5);

        if(month[0] === "0") {
            month = month[1];
        }
        if(day[0] === "0") {
            day = day[1];
        }

        return month + "-" + day;
    }

    /* Formatuj date do formatu: miesiac-dzien */
    static formatDate = (date) => {
        return parseInt(date.getMonth()) + 1 + "-" + date.getDate();
    }

    /* Pobierz ostatnie 7 dni od dzisiaj */
    static last7Days = () => {
        let result = [];
        let i;
        for (i=6; i>=0; i--) {
            let d = new Date();
            d.setDate(d.getDate() - i);
            result.push(this.formatDate(d));
        }

        return result;
    }
}

export default FormatFunctions;
