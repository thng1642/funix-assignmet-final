import axios from "axios"

export function trendingApi() {

    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74'

    const header = {
        "Content-Type": 'application/json',
    }

    return axios(
        {
            headers: header,
            url: baseUrl,
            method: "GET"
        }
    ).then(
        responsive => {
            const result = responsive.data
            
            return [result, null]
        }
    ).catch(error => {
        if (error.response) {

            const errorRes = error.response;
        }
        
        return [null, error.response]
    })
}