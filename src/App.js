//import logo from './logo.svg';
import './App.css';
import Form from './Form/form';
import {NavBar} from './NavBar/NavBar';
import CVContext from './Context/CVContext';
import Template from './Template/template';
import {
  BrowserRouter,
  Switch,
  Route

} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <>
      <CVContext> 
        <NavBar/>
          <Switch>
            <Route path='/micv' exact>
              <Form/>
            </Route>
            <Route path='/template' exact>
              <Template/>
            </Route>
          </Switch>
      </CVContext>
      </>
    </BrowserRouter>
  );
}

export default App;
