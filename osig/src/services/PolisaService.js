import axios from 'axios';


const Polisa_API_Base_URL = "http://localhost:9000/polisa";

class PolisaService{


    vratiSvePolise(){
        return axios.get(Polisa_API_Base_URL);
    }

    getById(id){
        return axios.get(Polisa_API_Base_URL+'/'+id);
    }

    obrisiPolisu(id){
        return axios.delete(Polisa_API_Base_URL+'/'+id);
    }

    sacuvajPolisu(polisa){
        return axios.post(Polisa_API_Base_URL, polisa);
    }




}


export default new PolisaService()