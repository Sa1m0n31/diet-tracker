import './static/style/style.css'
import './static/style/mobile.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import AfterRegister from "./pages/AfterRegister";
import Panel from "./pages/Panel";

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
      </Switch>
    </Router>
  );
}

export default App;
