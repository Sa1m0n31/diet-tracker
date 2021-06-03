import React, {useEffect, useState} from "react";
import TopMenu from "../../components/TopMenu";
import auth from "../../helpers/auth";
import AddActivityForm from "../../components/AddActivityForm";

const AddActivityPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        auth()
            .then(res => {
                if(res.data.loggedIn === 1) setLoggedIn(true);
                else window.location = "/";
            });
    }, []);

    return <>{loggedIn ? <>
            <TopMenu username={localStorage.getItem('diet-tracker-login')} />
            <AddActivityForm />
            </> : ""}</>
}

export default AddActivityPage;
