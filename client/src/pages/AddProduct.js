import React from "react";
import TopMenu from "../components/TopMenu";
import AddProductForm from "../components/AddProductForm";

const AddProduct = () => {
    return <>
        <TopMenu username={localStorage.getItem('diet-tracker-login')} />
        <AddProductForm />
    </>
}

export default AddProduct;