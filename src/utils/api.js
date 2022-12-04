import axios from "axios";

const baseUrl = 'https://api.escuelajs.co/api/v1/products'
export const  getProducts = async ()=>{
    const res = await axios.get(baseUrl)
   return res;
}

export async function addNewUser(apiReqBody){
    let newUser = await axios.post('https://api.escuelajs.co/api/v1/users',apiReqBody);
    console.log(newUser);
}