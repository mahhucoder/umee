import React, { useEffect } from 'react';

const BaseProductInCart = (props) => {

    const {id} = props

    useEffect(() => {

        console.log(id)        

    },[id])

    return (
        <div>
            
        </div>
    );
};

export default BaseProductInCart;