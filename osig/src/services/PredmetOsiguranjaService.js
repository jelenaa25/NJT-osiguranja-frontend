import axios from 'axios';


const Predmet_API_Base_URL = "http://localhost:9000/predmet";


class PredmetOsiguranjaService{

    vratiSvePredmete(){

        return axios.get(Pokrica_API_Base_URL);

    }
    kreirajPredmet(predmet){
        return axios.post(Pokrica_API_Base_URL, predmet);

    }

}