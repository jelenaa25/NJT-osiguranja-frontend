import React, { Component } from 'react';
import KlijentService from '../services/KlijentService';

class KlijentiCmbComponent extends Component {
    constructor(props){

        super(props)
        this.state = {
            klijenti: []
        }
    }

    componentDidMount(){
        
       KlijentService.vratiSveKlijente().then((res) => {
            this.state.klijenti = res.data;
        });
    }
    render() {
        return (
            <div>
                <select className='form-control' id = 'klijenti' onChange={this.handleGrad}>
                                            
                                            {
                                                this.state.klijenti.map(
                                                    kl => (<option key = {kl.jmbg} value = {kl.imePrezime} selected="selected">{mestoo.naziv}</option>)
                                                )
                                            }
                </select>
            </div>
        );
    }
}

export default KlijentiCmbComponent;