import axios from "axios";

const auth = async () => {
    return await axios.post("http://diet-tracker.szymonburak.pl/auth",
        { sessionId: localStorage.getItem('diet-tracker-sessionId')
        });
}

export default auth;
