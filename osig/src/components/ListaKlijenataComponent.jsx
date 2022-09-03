import React, { Component } from 'react';
import KlijentService from '../services/KlijentService';


class ListaKlijenataComponent extends Component {
    
    constructor(props){

        super(props)
        this.state = {
            klijenti : []
        }
        this.dodajKlijenta = this.dodajKlijenta.bind(this);
    }

    componentDidMount(){
        KlijentService.vratiSveKlijente().then((res) =>{
            this.setState({klijenti : res.data})
        });
        console.log(this.state.klijenti)
    }
    dodajKlijenta(){
        this.props.history.push('/kreiraj-klijenta');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Klijenti</h2>
                <div className='row'>

                    <table className='table table-striped table-bordered'>

                        <thead>
                            <tr>
                                <th>JMBG</th>
                                <th>Ime i prezime</th>
                                <th>Mesto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.klijenti.map(
                                    klijent => 
                                    <tr key={klijent.jmbg}>
                                       <td>{klijent.jmbg}</td>
                                       <td>{klijent.imePrezime}</td>
                                       <td>{klijent.mesto}</td> 
                                    </tr> 
                                )
                            }
                        </tbody>

                    </table>
                </div>
                <button className='btn btn-primary' onClick={this.dodajKlijenta}>Dodaj klijenta</button>
            </div>
        );
    }
}

export default ListaKlijenataComponent;