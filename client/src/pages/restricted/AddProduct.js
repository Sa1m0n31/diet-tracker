import React, {useEffect, useState} from "react";
import TopMenu from "../../components/TopMenu";
import AddProductForm from "../../components/AddProductForm";
import auth from "../../helpers/auth";

const AddProduct = () => {
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
            <AddProductForm />
        </> : ""}
    </>
}

export default AddProduct;
