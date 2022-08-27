import React, { Component } from 'react';
import PokricaService from '../services/PokricaService';
import PredmetOsiguranjaService from '../services/PredmetOsiguranjaService';
class ListaComponent extends Component {

    constructor(props){

        super(props)
        this.state = {
            vrsta: this.props.match.params.id,
            pokrica : []
        }
        this.dodajPokrice = this.dodajPokrice.bind(this);
        this.ucitajPokrice = this.ucitajPokrice.bind(this);
        this.getAkcija = this.getAkcija.bind(this);
        this.vratiDugmeUcitaj = this.vratiDugmeUcitaj.bind(this);
        this.dodajDugme = this.dodajDugme.bind(this);
        this.getTitle = this.getTitle.bind(this);
    }
    componentDidMount(){
        if(this.state.vrsta === '_pok'){
            PokricaService.getPokrica().then((res) => {
                this.setState({pokrica : res.data});
            });
        }

        if(this.state.vrsta === '_pr'){
            PredmetOsiguranjaService.vratiSvePredmete().then((res) => {
                this.setState({pokrica : res.data});
            });
        }


    }
    vratiDugmeUcitaj(id){
        if(this.state.vrsta === '_pok') return <td><button  style={{marginLeft : "10px"}} onClick={() => this.ucitajPokrice(id)} className='btn btn-info'>Ucitaj</button></td>
    }
    getAkcija(){
        if(this.state.vrsta === '_pok')
        return <th>Akcija</th>;
    }

    ucitajPokrice(id){
        this.props.history.push('/create-or-update-pokrice/'+id);
    }

    dodajPokrice = () =>{

        this.props.history.push('/create-or-update-pokrice/_add');
    }
    dodajDugme(){
        if(this.state.vrsta === '_pok')
        return <div className='row'>
        <button className='btn btn-primary' onClick={this.dodajPokrice}>Dodaj pokrice</button>
    </div>
    }
    getTitle(){
        if(this.state.vrsta === '_pok'){
            return <h2 className='text-center'>Lista pokrica</h2>
        }else return <h2 className='text-center'>Lista predmeta osiguranja</h2>
    }
    render() {
        return (
            <div>
                {
                    this.getTitle()
                }
                {
                    this.dodajDugme()
                }
                <div className='row'>

                    <table className='table table-striped table-bordered'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Naziv</th>
                                <th>Opis</th>
                                {
                                        this.getAkcija()

                                }
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.pokrica.map(
                                    pokrice => 
                                    <tr key={pokrice.sifra}>
                                       <td>{pokrice.sifra}</td>
                                       <td>{pokrice.naziv}</td>
                                       <td>{pokrice.napomena}</td> 
                                        {
                                            this.vratiDugmeUcitaj(pokrice.sifra)
                                        }
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default ListaComponent;