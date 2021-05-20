import React from "react";
import TopMenu from "../components/TopMenu";
import AddMealForm from "../components/AddMealForm";

const AddMeal = () => {
    return <>
        <TopMenu username={localStorage.getItem('diet-tracker-login')} />
        <AddMealForm />
    </>
}

export default AddMeal;
