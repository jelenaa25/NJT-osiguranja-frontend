import React, { Component } from 'react';
import PokricaService from '../services/PokricaService';
class PokriceCreateOrUpdateComponent extends Component {

    constructor(props){

        super(props)
        this.state = {
           pokriceID: this.props.match.params.id,
           naziv: '',
           napomena: ''
        }

        this.changeNazivHandler = this.changeNazivHandler.bind(this);
        this.changeOpisHandler = this.changeOpisHandler.bind(this);
        this.sacuvajPokrice = this.sacuvajPokrice.bind(this);
        this.obrisiPokrice = this.obrisiPokrice.bind(this);
        this.getDugmeObrisi = this.getDugmeObrisi.bind(this);
    }

    componentDidMount(){
        if(this.state.pokriceID === '_add'){
            return;
        }
        PokricaService.vratiPokriceById(this.state.pokriceID).then((res) => {
            let pok = res.data;
            this.setState({naziv: pok.naziv, napomena: pok.napomena})
        });
    }
    getTitle(){
        if(this.state.pokriceID === '_add'){
            return <h3 className='text-center'>Kreiranje pokrica</h3>;
        }else return <h3 className='text-center'>Evidencija pokrica</h3>

    }
    obrisiPokrice(id){
        PokricaService.obrisiPokrice(id).then(res => {
            this.props.history.push('/pokrica');
        });
    }
    getDugmeObrisi(){
        if(this.state.pokriceID !== '_add')
        return <button  style={{marginLeft : "10px"}} onClick={() => this.obrisiPokrice(this.state.pokriceID)} className='btn btn-danger'>Obrisi</button> 
    }
    sacuvajPokrice = (e) => {
        e.preventDefault();
        let pok  = {naziv: this.state.naziv, napomena: this.state.napomena};
        console.log('pok =>'+ JSON.stringify(pok));
        if(this.state.pokriceID === '_add'){
             PokricaService.kreirajPokrice(pok);
        }else{
            PokricaService.promeniPokrice(pok, this.state.pokriceID);
        }
        this.props.history.push('/pokrica');
    }
    changeNazivHandler = (event) => {
        this.setState({naziv: event.target.value})
    }
    changeOpisHandler = (event) =>{
        this.setState({napomena: event.target.value})

    }
    cancel(){
        this.props.history.push('/pokrica');
    }
    render() {
        return (
            <div>
                <div className='container'>

                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                this.getTitle()
                            }
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Naziv: </label>
                                        <input placeholder='Naziv' name='naziv' className='form-control' value={this.state.naziv} onChange = {this.changeNazivHandler} />
                                    </div>

                                    <div className='form-group'>
                                        <label>Napomena: </label>
                                        <input placeholder='Napomena' name='opis' className='form-control' value={this.state.napomena} onChange = {this.changeOpisHandler} />
                                    </div>

                                    <button className='btn btn-success' onClick={this.sacuvajPokrice}>Sacuvaj</button>
                                    {
                                        this.getDugmeObrisi()

                                    }
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Otkazi</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default PokriceCreateOrUpdateComponent;