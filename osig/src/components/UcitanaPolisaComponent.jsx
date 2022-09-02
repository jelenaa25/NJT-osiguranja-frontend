import React, { Component, useState, Fragment } from 'react';
import KlijentService from '../services/KlijentService';
import PolisaService from '../services/PolisaService';
import PokricaService from '../services/PokricaService';
import PredmetOsiguranjaService from '../services/PredmetOsiguranjaService';
class UcitanaPolisaComponent extends Component {
    constructor(props){

        super(props)
        this.state = {
            idd: this.props.match.params.id,
            polisaID: 0,
            klijent: 0,
            povrsinaStana: 0,
            vrednostPoKvM: 0,
            gradjevinskaVrednost: 0,
            ukupnaPremija: 0,
            datumOD: '',
            datumDO: '',
            agentOsiguranja: 1,
            stavke: [],

            procenatAmortizacije: 0,
            predmetOsiguranjaID: 0,
            pokriceID: 0,
            sumaOsiguranja: 0,
            premija: 0,

            klijenti: [],
            agent: [],

            pokrica: [],
            predmeti: [],
            RB: 1

           
        }
        this.getTitle = this.getTitle.bind(this)
        this.obrisiPolisu = this.obrisiPolisu.bind(this);
        this.sacuvajPolisu = this.sacuvajPolisu.bind(this);
        this.changeDatDOHandler = this.changeDatDOHandler.bind(this);
        this.changeDatODHandler = this.changeDatODHandler.bind(this);
        this.changePovrsinaHandler = this.changePovrsinaHandler.bind(this);
        this.changeVrKvMHandler = this.changeVrKvMHandler.bind(this);
        this.getButtons = this.getButtons.bind(this);
        this.obrisiStavku = this.obrisiStavku.bind(this);
        this.dodajStavku = this.dodajStavku.bind(this);
        this.handleAg = this.handleAg.bind(this);
        this.changeAmortizacijaHandler = this.changeAmortizacijaHandler.bind(this);
        this.handlePokrice = this.handlePokrice.bind(this);
        this.handlePred = this.handlePred.bind(this);
       
        
    }
    componentDidMount(){
        KlijentService.vratiSveKlijente().then((res) =>{
            this.setState({klijenti : res.data});
        })
        PokricaService.getPokrica().then((res)=>{
            this.setState({pokrica : res.data});
        })
        PredmetOsiguranjaService.vratiSvePredmete().then((res)=>{
            this.setState({predmeti : res.data});
        })
        if(this.state.idd === '_add'){
            return;
        }
        PolisaService.getById(this.state.idd).then((res) => {
            let pok = res.data;
            const d1 = new Date(pok.datumOD);
            const d2 = new Date(pok.datumDO);
            this.setState({polisaID: pok.polisaID, 
                klijent: pok.klijent, povrsinaStana: pok.povrsinaStana, vrednostPoKvM: pok.vrednostPoKvM, 
                gradjevinskaVrednost: pok.gradjevinskaVrednost, ukupnaPremija: pok.ukupnaPremija, datumOD: this.formatDate(d1),
                datumDO: this.formatDate(d2), agentOsiguranja: pok.agentOsiguranja, stavke: pok.stavke})
        });
        
    }

     formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    getTitle(){
        if(this.state.idd === '_add'){
                return <h3 className='text-center'>Kreiranje nove polise</h3>;
        }else return <h3 className='text-center'>Evidencija polise</h3>
    
    }
   

    obrisiPolisu(id){
        PolisaService.obrisiPolisu(id);
            this.props.history.push('/');
       

    }
    
    sacuvajPolisu= (e) => {
        e.preventDefault();
        let polisa  = {klijent: this.state.klijent, povrsinaStana: this.state.povrsinaStana, vrednostPoKvM: this.state.vrednostPoKvM, gradjevinskaVrednost: this.state.vrednostPoKvM*this.state.povrsinaStana, ukupnaPremija: this.state.ukupnaPremija, datumOD:  new Date(this.state.datumOD), datumDO: new Date (this.state.datumDO), agentOsiguranja: this.state.agentOsiguranja, stavke: this.state.stavke };
        console.log("UKUPNA PREMIJA: "+polisa.ukupnaPremija);
        console.log('polisa =>'+ JSON.stringify(polisa));
        PolisaService.sacuvajPolisu(polisa);
        this.props.history.push('/');
        ///this.props.history.push('/klijenti');
    }

    changePovrsinaHandler = (event) =>{
        this.setState({povrsinaStana: event.target.value})
    }
    changeAmortizacijaHandler = (event) =>{
        this.setState({procenatAmortizacije: event.target.value})
    }

    changeVrKvMHandler = (event) =>{
        this.setState({vrednostPoKvM: event.target.value})
    }
    changeDatODHandler = (event) =>{
        this.setState({datumOD: event.target.value})
    }
    handlePred= (event) =>{
        this.setState({predmetOsiguranjaID: event.target.value})
    }
    changeDatDOHandler = (event) =>{
        this.setState({datumDO: event.target.value})
    }
    cancel(){
        this.props.history.push('/');
    }
    getButtons(){
        if(this.state.idd !== '_add'){ //samo obrisi dugme i cancel
            return <div>
                <button  style={{marginLeft : "10px", marginTop : "10px"}} onClick={() => this.obrisiPolisu(this.state.polisaID)} className='btn btn-danger'>Obrisi</button> 
                <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px", marginTop : "10px"}}>Otkazi</button>
            </div>
        }else return <div>
            <button className='btn btn-success' onClick={this.sacuvajPolisu} style={{marginTop: "10px"}}>Sacuvaj polisu</button>
            <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px", marginTop : "10px"}}>Otkazi</button>

            <button className='btn btn-success' onClick={this.dodajStavku} style={{marginTop: "10px",marginLeft: "10px" }}>Dodaj stavku</button>
        </div>
    }
    
    dodajStavku= (e) => {
        e.preventDefault();
        let stav  = {rb: this.state.RB, 
            predmetOsiguranjaID: this.state.predmetOsiguranjaID, 
            pokriceID: this.state.pokriceID, sumaOsiguranja: 1000, 
            procenatAmortizacije: this.state.procenatAmortizacije, premija: 100};
        this.state.RB = this.state.RB +1;
        var ok = this.state.stavke;
        ok.push(stav);
        this.setState({stavke: ok});
        this.setState({ukupnaPremija: this.state.ukupnaPremija+stav.premija});
        
       // console.log('stav =>'+ JSON.stringify(stav));
      //  this.state.stavke.push(stav);
       
       
    }
    obrisiStavku(s){
        var okk = this.state.stavke;
        console.log("Index: "+okk.indexOf(s))
        okk.splice(okk.indexOf(s),1);
        //xokk.splice(rb);
        this.setState({ukupnaPremija: this.state.ukupnaPremija-okk.indexOf(s).premija});
        this.setState({stavke: okk});
       
    }
    /*
    findByInPokrice(id){
        var rez;
        this.state.pokrica.forEach(function (arrayItem) {
            var x = arrayItem.sifra;
            var xx = arrayItem.naziv;
            if(x == id) {
              console.log(arrayItem.naziv)
              rez = xx;
               return rez;
            }
            
        })
    
    }*/
    getAc(stavka){
        if(this.state.idd === '_add'){
            return  <td><button  style={{marginLeft : "10px"}} onClick={() => this.obrisiStavku(stavka)} className='btn btn-danger'>Obrisi</button></td>
        }
    }
    handleKL= (event) => {
        this.setState({klijent: event.target.value})
    }
    handleAg= (event) => {
        this.setState({agent: event.target.value})
    }
    handlePokrice= (event) => {
        this.setState({pokriceID: event.target.value})
    }
    getPoliID(){
        if(this.state.idd !== '_add'){
            return <div className='form-group'>
                    <label className='fw-bold'>PolisaID: </label>
                    <input placeholder='PolisaID' name='polisaID' className='form-control' value={this.state.polisaID} />
                </div>

        }
    }
    getUkPrem(){
        if(this.state.idd !== '_add'){
            return  <div className='form-group'>
            <label className='fw-bold'>Ukupna premija: </label>
            <input placeholder='' name='uk' className='form-control' value={this.state.ukupnaPremija} />
        </div>
        }

    }
    getCmb(){
        if(this.state.idd === '_add'){
            return <> 

            <div className='form-group'>
            <label className='fw-bold'>Amortizacija: </label>
            <input placeholder='%' name='procenatAmortizacije' className='form-control'  onChange = {this.changeAmortizacijaHandler}  />
            </div>
            <div className='form-group'>
            <label className='fw-bold'>Predmet: </label>
            <select className='form-control' id = 'predmeti' onChange={this.handlePred} name = 'predmetOsiguranjaID'>
                                    
                {
                    this.state.predmeti.map(
                        kl => (<option key = {kl.sifra} value = {kl.sifra} selected="selected" >{kl.naziv}</option>))
                }
            </select>
        </div>
        <div className='form-group'>
            <label className='fw-bold'>Pokrice: </label>
            <select className='form-control' id = 'pokrice' onChange={this.handlePokrice} name = 'pokriceID'>
                                    
                {
                    this.state.pokrica.map(
                        kl => (<option key = {kl.sifra} value = {kl.sifra} selected="selected" >{kl.naziv}</option>))
                }
            </select>
        </div>
        </>
        }
    }
    getKolona(){
        if(this.state.idd === '_add'){
            return <th>Akcija</th>;
        }
    }
    render() {
        return (
            <div>
                <div className='container'>
                <div className='row'>
                <div className='card col-md offset-md offset-md'>
                            {
                                this.getTitle()
                            }
                    <div className='card-body'>
                <form>
                {
                    this.getPoliID()
                }
                <div className='form-group'>
                    <label className='fw-bold'>Klijent: </label>
                    <select className='form-control' id = 'klijenti' onChange={this.handleKL}>
                                            
                        {
                            this.state.klijenti.map(
                                kl => (<option key = {kl.id} value = {kl.id} selected="selected" >{kl.imePrezime}</option>))
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <label className='fw-bold'>Povrsina stana: </label>
                    <input placeholder='Povrsina stana' name='povrsina' className='form-control' value={this.state.povrsinaStana} onChange = {this.changePovrsinaHandler} />
                </div>
                <div className='form-group'>
                    <label className='fw-bold'>Vrednost po KvM: </label>
                    <input placeholder='Vrednost po KvM' name='kvm' className='form-control' value={this.state.vrednostPoKvM} onChange = {this.changeVrKvMHandler} />
                </div>
                <div className='form-group'>
                    <label className='fw-bold'>Gradjevinska vrednost: </label>
                    <input className='form-control' value={this.state.povrsinaStana * this.state.vrednostPoKvM}></input>
                </div>
                
                <div className='form-group'>
                    <label className='fw-bold'>DatumOD: </label>
                    <input placeholder='yyyy-MM-dd' name='od' className='form-control' value={this.state.datumOD} onChange = {this.changeDatODHandler} />
                </div>
                <div className='form-group'>
                    <label className='fw-bold'>DatumDO: </label>
                    <input placeholder='yyyy-MM-dd' name='do' className='form-control' value={this.state.datumDO} onChange = {this.changeDatDOHandler} />
                </div>
                {
                    this.getUkPrem()
                }
                {
                    this.getCmb()
                }
                {
                    this.getButtons()
                   
                }
                
                </form>
                    </div>
        

                </div>
                </div>
                </div>
                
    
                <div className='container'>
                <div className='row'>
                <h4 className='text-center'>Stavke polise</h4>
                <div className='card col-md offset-md offset-md'>
                 <div style={{overflow: 'scroll', height: '80px', width:'100%', overflow: 'auto'}}>
                    <table className='table table-striped table-bordered'>

                        <thead>
                            <tr>
                                <th>RB</th>
                                <th>Predmet</th>
                                <th>Pokrice</th>
                                <th>Suma </th>
                                <th>% amortizacije</th>
                                <th>Premija</th>
                                {
                                    this.getKolona()
                                }
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                this.state.stavke.map(
                                    stavka => 
                                    <tr key={stavka.rb}>
                                       
                                        <td>{stavka.rb}</td>
                                        <td>{stavka.predmetOsiguranjaID}</td>
                                        <td>{stavka.pokriceID}</td>
                                       <td>{stavka.sumaOsiguranja}</td> 
                                       <td>{stavka.procenatAmortizacije}</td>
                                       <td>{stavka.premija}</td>
                                        {
                                            this.getAc(stavka)
                                        }
                                    </tr> 
                                )
                            }
                        </tbody> 

                    </table>
                </div>
                </div>
                </div>
            
            </div>
            </div>
        );
    }
}

export default UcitanaPolisaComponent;