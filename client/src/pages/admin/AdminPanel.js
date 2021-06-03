import React, {useEffect, useState} from "react";
import TopMenu from "../../components/TopMenu";
import axios from "axios";
import adminAuth from "../../helpers/adminAuth";

import addImg from '../../static/img/add.png'
import deleteImg from '../../static/img/delete.png'

const AdminPanel = () => {
    const [products, setProducts] = useState(0);
    const [loggedIn, setLoggedIn] = useState(0);

    useEffect(() => {
        adminAuth()
            .then(res => {
                if(res.data.loggedIn !== 1) {
                    window.location = "/";
                }
                else {
                    setLoggedIn(1);
                }
            });

        axios.get("http://localhost:5000/admin/get-all-products-from-waiting-room")
            .then(res => {
                setProducts(res.data.products);
            });
    }, []);

    const addProduct = (id) => {
        axios.post("http://localhost:5000/admin/add-product", {
            id
        })
            .then(res => {
                localStorage.setItem('diet-tracker-admin-action', 'add');
                if(res.data.insert === 1) {
                    localStorage.setItem('diet-tracker-admin-success', 't');
                }
                else {
                    localStorage.setItem('diet-tracker-admin-success', 'f');
                }
                window.location = "/admin-info";
            });
    }

    const deleteProduct = (id) => {
        axios.post("http://localhost:5000/admin/delete-product", {
            id
        })
            .then(res => {
                localStorage.setItem('diet-tracker-admin-action', 'delete');
                if(res.data.deleted === 1) {
                    localStorage.setItem('diet-tracker-admin-success', 't');
                }
                else {
                    localStorage.setItem('diet-tracker-admin-success', 'f');
                }
                window.location = "/admin-info";
            });
    }

    return <>
        <TopMenu admin={true} />
        {loggedIn === 1 ? <main className="adminPanel">
            {products !== 0 ? <table className="adminTable">
                <thead>
                <tr>
                    <th>id</th>
                    <th>nazwa</th>
                    <th>kilokalorie</th>
                    <th>węglowodany</th>
                    <th>białka</th>
                    <th>tłuszcze</th>
                    <th>cukry</th>
                    <th>sole</th>
                    <th>błonnik</th>
                    <th>magnez</th>
                    <th>potas</th>
                    <th>wapń</th>
                    <th>chlor</th>
                    <th>fosfor</th>
                    <th>dodaj</th>
                    <th>usuń</th>
                </tr>
                </thead>
                {products.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nazwa}</td>
                        <td>{item.kilokalorie}</td>
                        <td>{item.weglowodany} g</td>
                        <td>{item.bialka} g</td>
                        <td>{item.tluszcze} g</td>
                        <td>{item.cukry} g</td>
                        <td>{item.sole} g</td>
                        <td>{item.blonnik} g</td>
                        <td>{item.magnez} mg</td>
                        <td>{item.potas} mg</td>
                        <td>{item.wapn} mg</td>
                        <td>{item.chlor} mg</td>
                        <td>{item.fosfor} mg</td>
                        <td>
                            <button className="adminTable__btn adminTable__btn--delete" onClick={() => addProduct(item.id)}>
                                <img className="adminTable__btn__img"  src={addImg} />
                            </button>
                        </td>
                        <td>
                            <button className="adminTable__btn adminTable__btn--add" onClick={() => deleteProduct(item.id)}>
                                <img className="adminTable__btn__img"  src={deleteImg} />
                            </button>
                        </td>
                    </tr>
                ))}
            </table> : ""}
        </main> : ""}
    </>
}

export default AdminPanel;
