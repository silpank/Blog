//API calling configuration
import axios from 'axios'

export const commonAPI = async(httpRequest,url,requestBody,requestHeader)=>{
    const reqConfig = {
        method:httpRequest,
        url,
        data:requestBody,
        headers:requestHeader ? requestHeader : {
            "Content-Type" :'application/json'
        }
    }
    //create axios instance
    return await axios(reqConfig).then((response)=>{
        return response
    })
    .catch((error)=>{
        return error
    })
}
