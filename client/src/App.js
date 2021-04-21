import './static/style/style.css'
import './static/style/mobile.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

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
      </Switch>
    </Router>
  );
}

export default App;
