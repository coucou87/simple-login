import { useState, useEffect } from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './components/register/Register';
import SendCode from './components/sendCode/SendCode';
import history from './components/history/history';
import Home from './components/home/Home';
import { LanguageProvider } from './components/container/language';
import Authenticated from './components/authenticated/Authenticated';
import Cookies from 'universal-cookie';

export default function App() {
  const [model, setModel] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const cookie = new Cookies()
  const getModel = (data) => setModel(data);

  {
    const token = cookie.get('token')
      useEffect(() => {
        if (token !== '')
        setIsAuthenticated(true)
    }, [token])
  }

  const login = () => {
    setIsAuthenticated(true)
  }

  return (
    <div className="app-container">
      <LanguageProvider>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Register"  >
              <Register getModel={getModel} />
            </Route>
            <Route path="/SendCode" >
              <SendCode model={model} login={login} />
            </Route>
            {isAuthenticated ?
              <Route path="/Auth" component={Authenticated} getModel={getModel} />
              : <Redirect to='/Register' />
            }
          </Switch>
        </Router>
      </LanguageProvider>
    </div>
  )
}