import axios from "axios";

const baseUrl = 'https://api.escuelajs.co/api/v1';
const options ={"content-type":"application/json"}
export const getProducts = async() => {
    return await axios.get(`${baseUrl}/products`, { params: { offset: 0,limit:199 }})
}
export const getToken = async(tokenPayload)=>{
    console.log(tokenPayload);
    let response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", tokenPayload, options);
    console.log(response.data);
    return response.data.accessToken
}