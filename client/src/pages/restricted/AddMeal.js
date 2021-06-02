import React, {useEffect, useState} from "react";
import TopMenu from "../../components/TopMenu";
import AddMealForm from "../../components/AddMealForm";
import auth from "../../helpers/auth";

const AddMeal = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        auth()
            .then(res => {
                if(res.data.loggedIn === 1) setLoggedIn(true);
                else window.location = "/";
            });
    }, []);

    return <>
        {loggedIn ? <>
            <TopMenu username={localStorage.getItem('diet-tracker-login')} />
            <AddMealForm />
        </> : ""}
    </>
}

export default AddMeal;
