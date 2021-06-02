import React from "react";
import TopMenu from "../../components/TopMenu";
import LoginForm from "../../components/LoginForm";
import HintSection from "../../components/HintSection";
import RegisterForm from "../../components/RegisterForm";

const LoginPage = () => {
    return <div className="container-fluid p-0">
        <TopMenu />
        <LoginForm />
        <HintSection />
        <RegisterForm />
    </div>
}

export default LoginPage;
