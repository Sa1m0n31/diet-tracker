import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import getUserData from "../helpers/getUserData";

const ChangePasswordForm = () => {
    const [id, setId] = useState(0);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const userData = getUserData();
        userData.then(res => {
            setId(res.id);
        })

    }, []);

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .min(6, "Hasło za krótkie"),
        repeatNewPassword: Yup.string()
            .min(6, "Hasło za krótkie")
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            repeatNewPassword: ""
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            values['id'] = id;
            console.log(formik.values.newPassword);
            console.log(formik.values.repeatNewPassword);
            if(formik.values.newPassword === formik.values.repeatNewPassword) {
                axios.post("http://localhost:5000/user/change-password", values)
                    .then(res => {
                        if(res.data.result === 1) setMsg("Hasło zostało zmienione");
                        else if(res.data.result === 0) setMsg("Podane aktualne hasło nie jest poprawne");
                        else setMsg("Wystąpił nieoczekiwany błąd. Prosimy spróbować później");
                    });
            }
            else {
                setMsg("Podane hasła nie są identyczne");
            }
        }
    });


    return <div className="changePasswordForm">
        <form className="changePasswordForm" onSubmit={formik.handleSubmit}>
            <label className="label label--myAccount">
                <input className="input"
                       name="oldPassword"
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.oldPassword} />
                <span>Aktualne hasło</span>
            </label>
            <label className="label label--myAccount">
                <input className="input"
                       name="newPassword"
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.newPassword} />
                <span>Nowe hasło</span>
            </label>
            <label className="label label--myAccount">
                <input className="input"
                       name="repeatNewPassword"
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.repeatNewPassword} />
                <span>Powtórz nowe hasło</span>
            </label>

            {msg === "" ? "" : msg}

            <button type="submit" className="button button--editMyAccount">
                Zmień hasło
            </button>
        </form>
    </div>
}

export default ChangePasswordForm;
