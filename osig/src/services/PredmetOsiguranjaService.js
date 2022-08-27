import axios from 'axios';


const Predmet_API_Base_URL = "http://localhost:9000/predmet";


class PredmetOsiguranjaService{

    vratiSvePredmete(){

        return axios.get(Predmet_API_Base_URL);

    }
    kreirajPredmet(predmet){
        return axios.post(Predmet_API_Base_URL, predmet);

    }

}
export default new PredmetOsiguranjaService();