import React from "react";

const AdminActionDelete = ({success}) => {
    return <main className="adminAfterAction">
        {success ? <h2 className="adminAfterAction__header">
            Produkt został usunięty z poczekalni
        </h2> : <h3 className="adminAfterAction__header adminAfterAction__header--error">
            Wystąpił błąd. Prosimy spróbować później
        </h3>}
    </main>
}

export default AdminActionDelete;
