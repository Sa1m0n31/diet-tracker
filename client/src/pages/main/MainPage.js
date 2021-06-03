import React, {useEffect, useState} from "react";
import TopMenu from "../../components/TopMenu";
import Landing from "../../components/Landing";
import auth from "../../helpers/auth";
import adminAuth from "../../helpers/adminAuth";

const MainPage = () => {
    let [loggedIn, setLoggedIn] = useState(0);

    useEffect(async() => {
        await auth()
            .then(res => {
                if(res.data.loggedIn === 1) window.location = "/panel";
            });

        await adminAuth()
            .then(res => {
                if(res.data.loggedIn === 1) window.location = "/admin-panel";
            });

        await setLoggedIn(-1);
    }, []);

    return <div className="container-fluid m-auto">
        <TopMenu username={localStorage.getItem('diet-tracker-login')} />
        {loggedIn === -1 ? <Landing /> : ""}
    </div>
}

export default MainPage;
