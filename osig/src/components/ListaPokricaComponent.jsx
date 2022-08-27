import React, { Component } from 'react';
import PokricaService from '../services/PokricaService';

class ListaPokricaComponent extends Component {

    constructor(props){

        super(props)
        this.state = {
            pokrica : []
        }
        this.dodajPokrice = this.dodajPokrice.bind(this);
        this.ucitajPokrice = this.ucitajPokrice.bind(this);
    }
    componentDidMount(){
            PokricaService.getPokrica().then((res) => {
                this.setState({pokrica : res.data});
            });
    }

    ucitajPokrice(id){
        this.props.history.push('/create-or-update-pokrice/'+id);
    }

    dodajPokrice = () =>{

        this.props.history.push('/create-or-update-pokrice/_add');
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Lista pokrica</h2>
                <div className='row'>
                    <button className='btn btn-primary' onClick={this.dodajPokrice}>Dodaj pokrice</button>
                </div>
                <div className='row'>

                    <table className='table table-striped table-bordered'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Naziv</th>
                                <th>Opis</th>
                                <th>Akcija</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.pokrica.map(
                                    pokrice => 
                                    <tr key={pokrice.pokriceID}>
                                       <td>{pokrice.pokriceID}</td>
                                       <td>{pokrice.naziv}</td>
                                       <td>{pokrice.napomena}</td> 

                                        <td>
                                        
                                        <button  style={{marginLeft : "10px"}} onClick={() => this.ucitajPokrice(pokrice.pokriceID)} className='btn btn-info'>Ucitaj</button>
                                        </td>     
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

export default ListaPokricaComponent;