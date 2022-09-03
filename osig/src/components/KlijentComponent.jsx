import React, { Component } from 'react';
import KlijentService from '../services/KlijentService';
import MestoService from '../services/MestoService';


class KlijentComponent extends Component {
    constructor(props){

        super(props)
        this.state = {
           jmbg: 0,
           imePrezime: '',
           mesto: '',
           mesta : [],

           exceptions: ''
          
        }
        this.promeniImeiPrezime = this.promeniImeiPrezime.bind(this);
        this.promeniJMBG = this.promeniJMBG.bind(this);
        
    }

    componentDidMount(){
        MestoService.vratiListuMesta().then((res) => {
                this.setState({mesta : res.data});
        });
       
    }
    promeniJMBG = (event) => {
        this.setState({jmbg: event.target.value})
    }
    promeniImeiPrezime = (event) => {
        this.setState({imePrezime: event.target.value})
    }

    handleGrad = (event) => {
        this.setState({mesto: event.target.value})
    }
    cancel(){
        this.props.history.push('/klijenti');
    }
    sacuvajKlijenta = (e) => {
        e.preventDefault();
        document.getElementById("jmbgID").innerHTML = '';
        document.getElementById("ImePrezID").innerHTML = '';
        if(this.state.mesto == 0) this.state.mesto = this.state.mesta[this.state.mesta.length-1].naziv;
        let pok  = {jmbg: this.state.jmbg, imePrezime: this.state.imePrezime, mesto: this.state.mesto};
        console.log('pok =>'+ JSON.stringify(pok));
        const t = this.validateJMBG(this.state.jmbg);
        const tt = this.validateIme(this.state.imePrezime);
        if(t == false || tt == false){
            return;
        }
        KlijentService.kreirajKlijenta(pok).then((res)=>{
            this.props.history.push('/klijenti');
        });
       
    }
    validateIme(ime){
        if(ime.length !== 0) return true;
        document.getElementById("ImePrezID").innerHTML = "Ime i prezime su obavezna polja.";
        return false;

    }
    validateJMBG(jmbg){
        var ex = '';
        if(isNaN(jmbg) ){
            ex = ex + "JMBG mora biti broj. ";
            document.getElementById("jmbgID").innerHTML = ex;
        }
        if(jmbg <= 0 || jmbg.toString().length !== 13){
           ex = ex + "JMBG format nije dobar. ";
            document.getElementById("jmbgID").innerHTML = ex;
        }
        
        if(ex.length > 1) return false;
        return true;
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Klijent</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>JMBG:</label>
                                        <input placeholder='JMBG' name='jmbg' className='form-control' value={this.state.jmbg} onChange = {this.promeniJMBG} />
                                    </div>
                                    <p id="jmbgID" className='text-danger'></p>
                                    <div className='form-group'>
                                        <label>Ime i prezime:</label>
                                        <input placeholder='Ime i prezime' name='imePrezime' className='form-control' value={this.state.imePrezime} onChange = {this.promeniImeiPrezime} />
                                    </div>
                                    <p id="ImePrezID" className='text-danger'></p>
                                    <div className='form-group'>
                                        <label>Mesto:</label>
                                        <select className='form-control' id = 'grad' onChange={this.handleGrad}>
                                            
                                            {
                                                this.state.mesta.map(
                                                    mestoo => (<option key = {mestoo.PTT} value = {mestoo.naziv} selected="selected">{mestoo.naziv}</option>)
                                                )
                                            }
                                        </select>
                                    </div>
                                    <button className='btn btn-success' onClick={this.sacuvajKlijenta.bind(this)} style={{marginTop: "10px"}}>Sacuvaj</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px", marginTop: "10px"}}>Otkazi</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>







            </div>
        );
    }
}

export default KlijentComponent;