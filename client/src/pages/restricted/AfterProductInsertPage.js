import React, {useEffect, useState} from "react";

import TopMenu from "../../components/TopMenu";
import AfterProductInsert from "../../components/AfterProductInsert";
import auth from "../../helpers/auth";

const AfterProductInsertPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        auth()
            .then(res => {
                if(res.data.loggedIn === 1) setLoggedIn(true);
                else window.location = "/";
            });
    }, []);

    return <div className="container-fluid p-0">
        {loggedIn ? <><TopMenu />
        <AfterProductInsert /></> : ""}
    </div>
}

export default AfterProductInsertPage;
