import axios from 'axios';


const Klijent_API_Base_URL = "http://localhost:9000/klijent";

class KlijentService{

    vratiSveKlijente(){
        return axios.get(Klijent_API_Base_URL);
    }

    kreirajKlijenta(klijent){
        return axios.post(Klijent_API_Base_URL, klijent);
    }

}

export default new KlijentService()