import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListaComponent from './components/ListaComponent';
import PokriceSaveOrUpdateComponent from './components/PokriceCreateOrUpdateComponent';
import PocetnaComponent from './components/PocetnaComponent';
import ListaKlijenataComponent from './components/ListaKlijenataComponent';
import KlijentComponent from './components/KlijentComponent';

function App() {
 
  return (
    
    <div>
    <BrowserRouter>
     
    <HeaderComponent />

    <div className="container">
      <Switch>
          <Route path='/' exact component={PocetnaComponent}></Route>
          
          <Route path='/pok-or-pr/:id' exact component={ListaComponent}></Route>
          <Route path='/create-or-update-pokrice/:id'  exact component={PokriceSaveOrUpdateComponent}></Route>
          <Route path='/klijenti' exact component={ListaKlijenataComponent}></Route>
          <Route path='/kreiraj-klijenta' exact component={KlijentComponent}></Route>

         

      </Switch>
    </div>

    <FooterComponent />

    </BrowserRouter>

    </div>
   
  );


}

export default App;
