import {API_URL} from "../config";
import {Alert} from "react-native";

const fetchPromoLoading = async promo => {

    const response = await fetch(`${API_URL}/api/rest/restapi/cart/${promo.quote_id}/coupon`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"coupon_code": promo.coupon_code})
    });


    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0].message)
            .then(text =>
                Alert.alert(
                    'Create Cart Alert',
                    `${text}`,
                    [
                        {text: 'OK'},
                    ],
                    { cancelable: false }
                )
            );

        throw new Error(data.errors);
    }

    return data;
};

export { fetchPromoLoading };