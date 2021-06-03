import React, {useEffect, useState} from "react";
import AdminActionAdd from "../../components/AdminActionAdd";
import AdminActionDelete from "../../components/AdminActionDelete";
import TopMenu from "../../components/TopMenu";

const AdminAfterAction = () => {
    const [add, setAdd] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const lsAction = localStorage.getItem('diet-tracker-admin-action');
        const lsSuccess = localStorage.getItem('diet-tracker-admin-success');

        if(lsAction === 'add') setAdd(true);

        if(lsSuccess === 't') setSuccess(true);

        localStorage.removeItem('diet-tracker-admin-action');
        localStorage.removeItem('diet-tracker-admin-success');
    }, []);

    return <>
        <TopMenu admin={true} />
        {add ? <AdminActionAdd success={success} /> : <AdminActionDelete success={success} />}
    </>
}

export default AdminAfterAction;
