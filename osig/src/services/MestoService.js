import axios from 'axios';


const MESTO_API_Base_URL = "http://localhost:9000/mesto";

class Mesto{

    vratiListuMesta(){

       return axios.get(MESTO_API_Base_URL)

    }
}

export default new Mesto()