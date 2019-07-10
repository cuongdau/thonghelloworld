const list = {
    data1: [
        {
            id: 0,
            title: "Bag",
            uri: require('./../assets/image1.png'),
            category: require('../assets/categories/bags.png'),
            quality: 'Good',
            old_price: '$50',
            new_price: '$485'
        },
        {
            id: 1,
            title: "Drivers",
            uri: require('./../assets/image2.png'),
            category: require('./../assets/categories/drivers.png'),
            quality: 'New',
            old_price: '',
            new_price: '$485'
        },
        {
            id: 2,
            title: "Hibrids",
            uri: require('./../assets/image3.png'),
            category: require('../assets/categories/hybrids.png'),
            quality: 'New',
            old_price: '',
            new_price: '$200'
        },
        {
            id: 3,
            title: "Iron",
            uri: require('./../assets/image4.png'),
            category: require('../assets/categories/irons.png'),
            quality: 'Good',
            old_price: '$25',
            new_price: '$150'
        },
        {
            id: 4,
            title: "Putter",
            uri: require('./../assets/image5.png'),
            category: require('../assets/categories/putters.png'),
            quality: 'Good',
            old_price: '',
            new_price: '$485'
        },
        {
            id: 5,
            title: "Shoes",
            uri: require('./../assets/image6.png'),
            category: require('./../assets/categories/shoes.png'),
            quality: 'Good',
            old_price: '',
            new_price: '$485'
        },
        {
            id: 6,
            title: "Wedges",
            uri: require('./../assets/image7.png'),
            category: require('./../assets/categories/wedges.png'),
            quality: 'New',
            old_price: '$300',
            new_price: '$700'
        },
        {
            id: 7,
            title: "Woods",
            uri: require('./../assets/image1.png'),
            category: require('./../assets/categories/woods.png'),
            quality: 'Good',
            old_price: '$100',
            new_price: '$50'
        }
    ],
    data2: [
        {
            id: 0,
            uri: require('./../assets/item1.png'),
            bonus: '-10%'
        },
        {
            id: 1,
            uri: require('./../assets/item2.png'),
            bonus: '-20%'
        },
        {
            id: 2,
            uri: require('./../assets/item3.png'),
            bonus: '-30%'
        },
    ],
    products: [
        {
            id: '00000000',
            title: "Taylormade M1 10.5 460 Cc",
            uri: require('./../assets/order1.png'),
            quality: 'Good',
            oldPrice: '$50',
            newPrice: '$485'
        },
        {
            id: '00000001',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            uri: require('./../assets/order2.png'),
            quality: 'Good',
            oldPrice: '$50',
            newPrice: '$485'
        },
        {
            id: '00000002',
            title: "Taylormade M1 10.5 460 Cc",
            uri: require('./../assets/order1.png'),
            quality: 'Good',
            oldPrice: '$50',
            newPrice: '$485'
        },
        {
            id: '00000003',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            uri: require('./../assets/order2.png'),
            quality: 'Good',
            oldPrice: '$50',
            newPrice: '$485'
        },
        {
            id: '00000004',
            title: "Taylormade M1 10.5 460 Cc",
            uri: require('./../assets/order1.png'),
            quality: 'Good',
            oldPrice: '$50',
            newPrice: '$485'
        },
        {
            id: '00000005',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            uri: require('./../assets/order2.png'),
            quality: 'Good',
            oldPrice: '$50',
            newPrice: '$485'
        },
        {
            id: '00000006',
            title: "Taylormade M1 10.5 460 Cc",
            uri: require('./../assets/order1.png'),
            quality: 'Good',
            oldPrice: '$50',
            newPrice: '$485'
        },
    ],
    orders: [
        {
            id: '00000000',
            title: "Taylormade M1 10.5 460 Cc",
            buyer: "JON DOU, US, CAROLINA",
            uri: require('./../assets/order1.png'),
            price: '220',
            shippingPrice: '13',
            buyerName: "JON DOU",
            buyerAddress: "US, CAROLINA",
            buyerEmail: 'example_mail@mail.com',
            paymentState: 'Paid',
            deliveryMethod: 'Standard Shipping',
            shippingConfirmed: false
        },
        {
            id: '00000001',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            buyer: "JON DOU, US, CAROLINA",
            uri: require('./../assets/order1.png'),
            price: '490',
            shippingPrice: '13',
            buyerName: "JON DOU",
            buyerAddress: "US, CAROLINA",
            buyerEmail: 'example_mail@mail.com',
            paymentState: 'Paid',
            deliveryMethod: 'Standard Shipping',
            shippingConfirmed: false
        },
        {
            id: '00000002',
            title: "Taylormade M1 10.5 460 Cc",
            buyer: "JON DOU, US, CAROLINA",
            uri: require('./../assets/order1.png'),
            price: '490',
            shippingPrice: '13',
            buyerName: "JON DOU",
            buyerAddress: "US, CAROLINA",
            buyerEmail: 'example_mail@mail.com',
            paymentState: 'Paid',
            deliveryMethod: 'Standard Shipping',
            shippingConfirmed: false
        },
        {
            id: '00000003',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            buyer: "JON DOU, US, CAROLINA",
            uri: require('./../assets/order1.png'),
            price: '490',
            shippingPrice: '13',
            buyerName: "JON DOU",
            buyerAddress: "US, CAROLINA",
            buyerEmail: 'example_mail@mail.com',
            paymentState: 'Paid',
            deliveryMethod: 'Standard Shipping',
            shippingConfirmed: false
        },
    ],
    purchases: [
        {
            id: '00000000',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            orderDate: "11 Dec 2018",
            estimatedDeliveryDate: "17 Dec 2018",
            shippedDate: "17 Dec 2018",
            buyer: "JON DOU, US, CAROLINA",
            uri: require('./../assets/order1.png'),
            price: '220',
            shippingPrice: 13,
            status: 'SUCCESSFUL DELIVERY',
            buyerName: "JON DOU",
            buyerAddress: "US, CAROLINA",
            buyerEmail: 'example_mail@mail.com',
            deliveryMethod: 'Standard Shipping',
            subTotalPrice: 490,
            totalPrice: 503,
            quantity: 1,
            condition: 'Good'
        },
        {
            id: '00000001',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            orderDate: "11 Dec 2018",
            shippedDate: null,
            buyer: "JON DOU, US, CAROLINA",
            uri: require('./../assets/order1.png'),
            price: '490',
            shippingPrice: '13',
            status: 'ORDER UNSUCCESSFUL'
        },
        {
            id: '00000002',
            title: "Taylormade M1 10.5 460 Cc",
            orderDate: "11 Dec 2018",
            shippedDate: "17 Dec 2018",
            buyer: "JON DOU, US, CAROLINA",
            uri: require('./../assets/order1.png'),
            price: '490',
            shippingPrice: '13',
            status: 'SUCCESSFUL DELIVERY',
        },
        {
            id: '00000003',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            orderDate: "11 Dec 2018",
            shippedDate: null,
            buyer: "JON DOU, US, CAROLINA",
            uri: require('./../assets/order1.png'),
            price: '490',
            shippingPrice: '13',
            status: 'ORDER UNSUCCESSFUL'
        },
    ],
    brands: [
        {
            id: 1,
            name: 'Adams'
        },
        {
            id: 2,
            name: 'Bridgestone'
        },
        {
            id: 3,
            name: 'Callaway'
        },
        {
            id: 4,
            name: 'Cleveland'
        },
        {
            id: 5,
            name: 'Coates Golf'
        },
        {
            id: 6,
            name: 'Cobra'
        },
        {
            id: 7,
            name: 'Fourteen'
        },
        {
            id: 8,
            name: 'Honma'
        },
        {
            id: 9,
            name: 'Mizuno'
        },
        {
            id: 10,
            name: 'Nike'
        },
        {
            id: 11,
            name: 'Ping'
        },
        {
            id: 12,
            name: 'Srixon'
        },
        {
            id: 13,
            name: 'TaylorMade'
        },
        {
            id: 14,
            name: 'Titleist'
        },
        {
            id: 15,
            name: 'Top Flite'
        },
        {
            id: 16,
            name: 'Tour Edge'
        },
        {
            id: 17,
            name: 'Wilson'
        },
        {
            id: 18,
            name: 'XXIO'
        }
    ],
    offers: [
        {
            id: '00000000',
            title: "Taylormade M1 10.5 460 Cc",
            uri: require('./../assets/order2.png'),
            price: '490',
            shippingPrice: '13',
            offerPrice: '450',
            offerStatus: 'Rejected',
            offerBuyerId: '2',
            offerSellerId: '1',
            shopTitle: 'Peoples Golf Iowa',
            offerMessage: {
                date: '11/11/2011',
                message: 'I want to buy this product'
            },
            responseMessage: {
                message: 'Sorry, the price you offered is too small'
            }
        },
        {
            id: '00000001',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            uri: require('./../assets/order1.png'),
            price: '490',
            shippingPrice: '13',
            offerPrice: '450',
            offerStatus: 'Rejected',
            offerBuyerId: '2',
            offerSellerId: '1',
            shopTitle: 'Peoples Golf Iowa',
            offerMessage: {
                date: '11/11/2011',
                message: 'I want to buy this product'
            },
            responseMessage: {
                message: 'The price is too small'
            }
        },
        {
            id: '00000002',
            title: "Z785 9.5 Hzrdus Handcrafted 62g",
            uri: require('./../assets/order2.png'),
            price: '490',
            shippingPrice: '13',
            offerPrice: '450',
            offerStatus: 'Accepted',
            offerBuyerId: '2',
            offerSellerId: '1',
            shopTitle: 'Peoples Golf Iowa',
            offerMessage: {
                date: '11/11/2011',
                message: 'I want to buy this product'
            },
            responseMessage: {
                message: 'Deal'
            }
        }
    ]
};

const degreesData = [
    {
        id: 0,
        value: 8.5
    },
    {
        id: 1,
        value: 9
    },
    {
        id: 2,
        value: 9.5
    },
    {
        id: 3,
        value: 10
    },
    {
        id: 4,
        value: 10.5
    },
    {
        id: 5,
        value: 11
    },
];

export { list, degreesData }