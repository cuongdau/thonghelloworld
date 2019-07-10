import { API_URL, store } from "../config";

const getRequest = (user, data, category) => {
    const status = data.status === "Visible in store" ? "1" : "2";
    const international = data.international_shipping_price ? "4" : "3";

    Object.assign(data, {"stock_data": {"qty": data.quantity, "is_in_stock": Number(data.quantity) > 0 ? "1" : "0"},
            "seller_shipping_option": international},
        {status, "enabled_by_seller": status, "website_ids": [
                store
            ]});

    return {
        "type": "simple",
        "category_ids": [
            category
        ],
        "product": data,
        "seller_id": user.entity_id,
        "setbase": "0",
        "set": "4",
        "store_id": store,
        "website_id": store
    };
};

export const fetchCreateProduct = async (user, data, category, mainImageIndex) => {
    if(mainImageIndex)
        data.images.unshift(...data.images.splice(mainImageIndex,1));

    const request = getRequest(user, data, category);

    return await fetch(`${API_URL}/api/rest/restapi/marketplace/product`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(request)
    })
};

export const fetchEditProduct = async (user, data, category, mainImageIndex, id) => {

    if(mainImageIndex)
        data.images.unshift(...data.images.splice(mainImageIndex,1));

    const request = getRequest(user, data, category);

    return await fetch(`${API_URL}/api/rest/restapi/marketplace/product/${id}/store/${store}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(request)
    })
};

