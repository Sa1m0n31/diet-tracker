import axios from "axios";

const adminAuth = async () => {
    return await axios.post("http://diet-tracker.szymonburak.pl/admin-auth",
        { sessionId: localStorage.getItem('diet-tracker-sessionId')
        });
}

export default adminAuth;
