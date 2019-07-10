import { API_URL } from "../config";

export const fetchPayPal = async user => {

    return await fetch(`${API_URL}/api/rest/restapi/marketplace/seller/paypalVerification/${user.firstname}/${user.lastname}/${user.email}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => new Error(error));
};