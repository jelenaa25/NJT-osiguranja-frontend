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
                datumDO: this.formatDate(d2), agentOsiguranja: pok.agentOsiguranja, stavke: pok.stavke});
                this.promeniCmbKlijent(pok.klijent);

        });
    }
    promeniCmbKlijent(id){
        var cmb =  document.getElementById ( "klijenti" );
        cmb = document.getElementById ( "klijenti" );
       
        cmb.value = id;

    }
   /* vratiImeKL(id){
        console.log("IDD"+id)
        for(let i = 0;  i < this.state.klijenti.length; i++){
            if(this.state.klijenti[i].id == id) {
                console.log("IMEPREZ: "+this.state.klijenti[i].imePrezime)
                return this.state.klijenti[i].imePrezime;}
           
        }
    }*/

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

    sacuvajPolisu= (e) => {
        if(this.state.klijent == 0) this.state.klijent = this.state.klijenti[this.state.klijenti.length-1].id
        console.log("KLIJENT:::: "+this.state.klijenti[this.state.klijenti.length-1].id)
        e.preventDefault();
        let polisa  = {klijent: this.state.klijent, povrsinaStana: this.state.povrsinaStana, vrednostPoKvM: this.state.vrednostPoKvM, gradjevinskaVrednost: this.state.vrednostPoKvM*this.state.povrsinaStana, ukupnaPremija: this.state.ukupnaPremija, datumOD:  new Date(this.state.datumOD), datumDO: new Date (this.state.datumDO), agentOsiguranja: this.state.agentOsiguranja, stavke: this.state.stavke };
        console.log("UKUPNA PREMIJA: "+polisa.ukupnaPremija);
        this.staviSvePprazne();
        console.log('polisa =>'+ JSON.stringify(polisa));
        const ccc = this.validatePolis();
        if(ccc == false){
            return;
        }
        PolisaService.sacuvajPolisu(polisa).then((res)=>{
            this.props.history.push('/');
        })
        
        ///this.props.history.push('/klijenti');
    }
    validatePolis(){
        var ex = '';
        var pov = '';
        var s = '';
        
        if(isNaN(this.state.vrednostPoKvM) || this.state.vrednostPoKvM <= 0){
            ex = ex + "Vrednost po kVm mora biti broj i veca od nule. ";
            document.getElementById("vr").innerHTML = ex;
        }
        

        if(isNaN(this.state.povrsinaStana) || this.state.povrsinaStana <= 0){
            pov = pov + "Povrsina stana mora biti broj i veci od nule. "
            document.getElementById("pov").innerHTML = pov;
         }
         
        
         if(this.state.stavke.length === 0){
            s = s + 'Polisa mora imati bar jednu stavku.';
            document.getElementById("a").innerHTML = s;
         }
         

         var dateReg = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

         var dodatum = ''; var dat = '';

        if(this.state.datumDO.match(dateReg) == null){
            dodatum = dodatum + 'DatumDO nije u dobrom formatu.';
            document.getElementById("do").innerHTML = dodatum;
        }
        if(this.state.datumOD.match(dateReg) == null){
            dat = dat + 'DatumOD nije u dobrom formatu.';
            document.getElementById("od").innerHTML = dat;

        }

         if(ex.length > 1 || pov.length > 1 || s.length > 1 || dat.length > 1 || dodatum.length > 1){
            return false;
         }
         return true;

    }

    staviSvePprazne(){
        document.getElementById("od").innerHTML = '';
        document.getElementById("do").innerHTML = '';
        document.getElementById("a").innerHTML = '';
        document.getElementById("pov").innerHTML = '';
        document.getElementById("vr").innerHTML = '';

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
        document.getElementById("am").innerHTML = '';
        const a = this.validateAmortizaciju();
        if(a == false) return;
        if(this.state.pokriceID == 0 ) this.state.pokriceID = this.state.pokrica[this.state.pokrica.length-1].sifra;
        if(this.state.predmetOsiguranjaID == 0) this.state.predmetOsiguranjaID = this.state.predmeti[this.state.predmeti.length-1].sifra;
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
    validateAmortizaciju(){
        var c = '';
        if(isNaN(this.state.procenatAmortizacije) || this.state.procenatAmortizacije <= 0) c = c+"Amortizacija mora biti ceo broj i veci od nule."
        document.getElementById("am").innerHTML = c;
        if(c.length >1) return false; 
        return true;
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
            <p id="am" className='text-danger'></p>
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

    getPP(pokid, prid){
        let npokrica = 'kk';
        let npred = 'lj';
        for(let i = 0; i < this.state.pokrica.length; i++){
            if(this.state.pokrica[i].sifra == pokid) npokrica = this.state.pokrica[i].naziv;
        }
        for(let i = 0; i < this.state.predmeti.length; i++){
            if(this.state.predmeti[i].sifra == prid) npred = this.state.predmeti[i].naziv;
        }
        return <><td>{npred}</td>
        <td>{npokrica}</td></>
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
                <p id="pov" className='text-danger'></p>
                <div className='form-group'>
                    <label className='fw-bold'>Vrednost po KvM: </label>
                    <input placeholder='Vrednost po KvM' name='kvm' className='form-control' value={this.state.vrednostPoKvM} onChange = {this.changeVrKvMHandler} />
                </div>
                <p id="vr" className='text-danger'></p>
                <div className='form-group'>
                    <label className='fw-bold'>Gradjevinska vrednost: </label>
                    <input className='form-control' value={this.state.povrsinaStana * this.state.vrednostPoKvM}></input>
                </div>
                
                <div className='form-group'>
                    <label className='fw-bold'>DatumOD: </label>
                    <input placeholder='yyyy-MM-dd' name='od' className='form-control' value={this.state.datumOD} onChange = {this.changeDatODHandler} />
                </div>
                <p id="od" className='text-danger'></p>
                <div className='form-group'>
                    <label className='fw-bold'>DatumDO: </label>
                    <input placeholder='yyyy-MM-dd' name='do' className='form-control' value={this.state.datumDO} onChange = {this.changeDatDOHandler} />
                </div>
                <p id="do" className='text-danger'></p>
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
                <p id="a" className='text-danger'></p>
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
                                        {
                                            this.getPP(stavka.pokriceID, stavka.predmetOsiguranjaID)
                                        }
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