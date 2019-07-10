const profilesData = [
    {
        title: 'SELLING',
        items: [
            {
                name: 'My Shop',
                navigator: 'MyShop'
            },
            {
                name: 'Orders',
                navigator: 'Orders'
            },
            {
                name: 'Listings',
                navigator: 'Listing'
            },
        ]

    },
    {
        title: 'BUYING',
        items: [
            {
                name: 'My details',
                navigator: 'MyDetails'
            },
            {
                name: 'Purchases',
                navigator: 'Purchases'
            }
        ]

    },
    {
        items: [
            {
                name: 'Offers',
                navigator: 'Offers'
            }
        ]

    },
    {
        items: [
            {
                name: 'Feedback',
                navigator: 'Feedback'
            }
        ]

    },
    {
        items: [
            {
                name: 'Marketplace Policies',
                navigator: 'Web'
            }
        ]

    }
];

const switches = [
    {
        label: 'Messages',
        state: 'messages'
    },
    {
        label: 'Offers',
        state: 'offers'
    },
    {
        label: 'Sales & Promotions',
        state: 'sales'
    }
];

const pickers = [
    "Sign out"
];

export { profilesData, switches, pickers } ;