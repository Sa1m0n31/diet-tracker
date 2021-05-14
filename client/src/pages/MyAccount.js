import React from 'react'
import TopMenu from "../components/TopMenu";
import MyAccountForm from "../components/MyAccountForm";
import MyAccountKeyValuePairs from "../components/MyAccountKeyValuePairs";

const MyAccount = () => {
    return <div className="container-fluid p-0">
        <TopMenu />
        <MyAccountForm />
        <MyAccountKeyValuePairs />
    </div>
}

export default MyAccount;