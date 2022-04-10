import React from 'react';
import {FaFacebookF, FaGoogle, FaInstagramSquare} from "react-icons/fa"
import "../../css/Base/BaseSocialButtonCircle.css"

const BaseSocialButton = (props) => {

    let iconComponent 
    const {icon,link} = props

    switch(icon) {
        case 'facebook':
            iconComponent = <FaFacebookF color="#979797" size={18} />
            break
        case "google" :
            iconComponent = <FaGoogle color="#979797" size={18}/>
            break
        case "instagram":
            iconComponent = <FaInstagramSquare color="#979797" size={18}/>
            break
        default:
            break
    }

    return (
        <a href={link} target="_blank" className="socialButtonCircle">
            {iconComponent}
        </a>
    );
};

export default BaseSocialButton;