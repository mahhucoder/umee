import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {FaFacebookF, FaGoogle, FaInstagramSquare} from "react-icons/fa"
import "../../css/Base/BaseSocialButton.css"
import { UserContext } from '../../Context/UserContext';

const BaseSocialButton = props => {

    const {type,size} = props;
    let iconComponent
    const {loginWithGoogle} = useContext(UserContext)

    switch(type) {
        case 'facebook':
            iconComponent = <FaFacebookF size={18} />
            break
        case "google" :
            iconComponent = <FaGoogle size={24}/>
            break
        case "instagram":
            iconComponent = <FaInstagramSquare size={18}/>
            break
        default:
            break
    }

    // const loginSocial = () => {
    //     switch(type) {
    //         case 'facebook':
    //             loginWithFacebook()
    //             break
    //         case 'google':
    //             loginWithGoogle()
    //             break
    //         default:
    //             break
    //     }
    // }

    return (
        <div onClick={loginWithGoogle} 
            className="baseSocialButtonWrapper"
            style={{"width":size,"height":size}}    
        >
            <div className="baseSocialButtonIcon">{iconComponent}</div>
            {/* <div className="baseSocialText">{type.toUpperCase()}</div> */}
        </div>
    );
};

BaseSocialButton.propTypes = {
    type: PropTypes.string,
    size: PropTypes.number
};

export default BaseSocialButton;