import './static/style/style.css'
import './static/style/mobile.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import AfterRegister from "./pages/AfterRegister";
import Panel from "./pages/Panel";
import MyAccount from "./pages/MyAccount";
import AddProduct from "./pages/AddProduct";
import AfterProductInsertPage from "./pages/AfterProductInsertPage";
import AddMeal from "./pages/AddMeal";

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
      </Switch>
    </Router>
  );
}

export default App;
