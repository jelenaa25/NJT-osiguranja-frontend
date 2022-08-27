import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListaPokricaComponent from './components/ListaPokricaComponent';
import PokriceSaveOrUpdateComponent from './components/PokriceCreateOrUpdateComponent';

function App() {
 
  return (
    
    <div>
    <BrowserRouter>
     
    <HeaderComponent />

    <div className="container">
      <Switch>
          <Route path='/' exact component={ListaPokricaComponent}></Route>
          
          <Route path='/pokrica' exact component={ListaPokricaComponent}></Route>
          <Route path='/create-or-update-pokrice/:id'  exact component={PokriceSaveOrUpdateComponent}></Route>
         

      </Switch>
    </div>

    <FooterComponent />

    </BrowserRouter>

    </div>
   
  );


}

export default App;
