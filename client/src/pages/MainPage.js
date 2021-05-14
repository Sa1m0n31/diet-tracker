import React, {useEffect, useState} from "react";
import TopMenu from "../components/TopMenu";
import Landing from "../components/Landing";
import auth from "../helpers/auth";

const MainPage = () => {
    let [loggedIn, setLoggedIn] = useState(0);

    useEffect(() => {
        auth()
            .then(res => {
                if(res.data.loggedIn === 1) window.location = "/panel";
                else setLoggedIn(-1);
            });
    }, []);

    return <div className="container-fluid m-auto">
        <TopMenu username={localStorage.getItem('diet-tracker-login')} />
        {loggedIn === -1 ? <Landing /> : ""}
    </div>
}

export default MainPage;