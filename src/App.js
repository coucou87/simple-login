
import { useState } from 'react'
import { Router, Switch, Route, Redirect  } from "react-router-dom";
import Register from './components/Register'
import SendCode from './components/SendCode'
import history from './components/history';
import Home from './components/Home'
import Welcome from './components/Welcome'
import { LanguageProvider } from './components/language/Language';
import Authenticated from './components/Authenticated'

export default function App() {
  const [model, setModel] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getModel = (data) => setModel(data);
  const login = () => {
    setIsAuthenticated(!isAuthenticated)
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
              <SendCode model={model} login={login}/>
            </Route>
            {isAuthenticated ?
              <Route path="/Auth" component={Authenticated} getModel={getModel}/>
              : <Redirect to='/Register' /> 
            } 
            <Route path="/Welcome" component={Welcome} />
          </Switch>
        </Router>
      </LanguageProvider>
    </div>
  )
}


