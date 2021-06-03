import axios from "axios";

const adminAuth = async () => {
    return await axios.post("http://localhost:5000/admin-auth",
        { sessionId: localStorage.getItem('diet-tracker-sessionId')
        });
}

export default adminAuth;
