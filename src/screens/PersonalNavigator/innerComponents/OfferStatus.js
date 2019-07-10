import {Text} from "native-base";
import styles from "../style";
import React from "react";

const OfferStatus = ({value}) => {

    if (value === '0') {
        return <Text style={[styles.offerStatus, styles.offerStatusPending]}>Pending</Text>
    }

    if (value === '1') {
        return <Text style={[styles.offerStatus, styles.offerStatusAccepted]}>Accepted</Text>
    }

    if (value === '2') {
        return <Text style={[styles.offerStatus, styles.offerStatusRejected]}>Declined</Text>
    }

    return null;

};

export default OfferStatus;