import axios from 'axios';


const Pokrica_API_Base_URL = "http://localhost:9000/pokrice";
let config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        'Content-Type': 'application/json',
        "proxy": "http://localhost:3000"
    }
  }
class PokricaService {

    getPokrica(){

        return axios.get(Pokrica_API_Base_URL);

    }
    kreirajPokrice(pokrice){
        return axios.post(Pokrica_API_Base_URL, pokrice, config);

    }

    vratiPokriceById(id){
        return axios.get(Pokrica_API_Base_URL + '/'+id);
    }

    promeniPokrice(pokrice, id){
        return axios.put(Pokrica_API_Base_URL + '/'+id, pokrice);
    }

    obrisiPokrice(id){
        return axios.delete(Pokrica_API_Base_URL + '/'+id);
    }

}

export default new PokricaService()