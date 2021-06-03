import './static/style/style.css'
import './static/style/mobile.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from "./pages/main/MainPage";
import LoginPage from "./pages/main/LoginPage";
import AfterRegister from "./pages/main/AfterRegister";
import Panel from "./pages/restricted/Panel";
import MyAccount from "./pages/restricted/MyAccount";
import AddProduct from "./pages/restricted/AddProduct";
import AfterProductInsertPage from "./pages/restricted/AfterProductInsertPage";
import AddMeal from "./pages/restricted/AddMeal";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import React from "react";
import AdminAfterAction from "./pages/admin/AdminAfterAction";
import AddActivityPage from "./pages/restricted/AddActivityPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
          <Route path="/login">
              <LoginPage />
          </Route>
          <Route path="/after-register">
              <AfterRegister />
          </Route>
          <Route path="/panel">
              <Panel />
          </Route>
          <Route path="/moje-konto">
              <MyAccount />
          </Route>
          <Route path="/dodaj-produkt">
              <AddProduct />
          </Route>
          <Route path="/po-dodaniu-produktu">
            <AfterProductInsertPage />
          </Route>
          <Route path="/dodaj-spozycie">
              <AddMeal />
          </Route>
          <Route path="/dodaj-aktywnosc">
              <AddActivityPage />
          </Route>
          {/* ADMIN ROUTES */}
          <Route path="/admin">
              <AdminLogin />
          </Route>
          <Route path="/admin-panel">
              <AdminPanel />
          </Route>
          <Route path="/admin-info">
              <AdminAfterAction />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
