import React, {useEffect, useState} from 'react'
import TopMenu from "../../components/TopMenu";
import MyAccountForm from "../../components/MyAccountForm";
import MyAccountKeyValuePairs from "../../components/MyAccountKeyValuePairs";
import auth from "../../helpers/auth";
import ChangePasswordForm from "../../components/ChangePasswordForm";

const MyAccount = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        auth()
            .then(res => {
                if(res.data.loggedIn === 1) setLoggedIn(true);
                else window.location = "/";
            });
    }, []);

    return <div className="container-fluid p-0">
        {loggedIn ? <>
            <TopMenu username={localStorage.getItem('diet-tracker-login')} />
            <MyAccountForm />
            <ChangePasswordForm />
            <MyAccountKeyValuePairs />
        </> : ""}
    </div>
}

export default MyAccount;
