import axios from "axios";

const auth = async () => {
    return await axios.post("http://localhost:5000/auth",
        { sessionId: localStorage.getItem('diet-tracker-sessionId')
        });
}

export default auth;