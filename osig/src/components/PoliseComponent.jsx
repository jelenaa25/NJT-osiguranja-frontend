import React, { Component } from 'react';
import PolisaService from '../services/PolisaService'

class PoliseComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            polise : [],
            klijent : '',
            agent : ''
           
        }
        this.ucitajPolisu = this.ucitajPolisu.bind(this);
        this.dodajPolisu = this.dodajPolisu.bind(this);

    }

    componentDidMount(){
        PolisaService.vratiSvePolise().then((res) => {
                this.setState({polise : res.data});
        });
        console.log("polisee: "+this.state.polise)
    }

    ucitajPolisu(id){
        this.props.history.push('/create-or-update-polisa/'+id);

    }
    dodajPolisu= () =>{
        this.props.history.push('/create-or-update-polisa/_add');

    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Polise</h2>
                
                <div className='row'>

                    <table className='table table-striped table-bordered'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Povrsina stana</th>
                                <th>Vrednost po KvM</th>
                                <th>Gradjevinska vrednost</th>
                                <th>Ukupna premija</th>
                                <th>Akcija</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.polise.map(
                                    polisa => 
                                    <tr key={polisa.polisaID}>
                                       <td>{polisa.polisaID}</td>
                                       <td>{polisa.povrsinaStana}</td>
                                       <td>{polisa.vrednostPoKvM}</td>
                                       <td>{polisa.gradjevinskaVrednost}</td>
                                       <td>{polisa.ukupnaPremija}</td>
                                       <td><button  style={{marginLeft : "10px"}} onClick={() => this.ucitajPolisu(polisa.polisaID)} className='btn btn-info'>Ucitaj</button></td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                    
                </div>
                <div className='text-left'>
                <button className='btn btn-primary btn-center' onClick={this.dodajPolisu} style={{marginBottom : "10px"}}>Kreiraj novu polisu</button>
                </div>
            </div>
        );
    }
}

export default PoliseComponent;