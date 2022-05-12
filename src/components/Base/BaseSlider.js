import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseSlider.css"
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa';
import bg0 from "../../source/images_webUMEE/banner.jpg"
import bg1 from "../../source/images_webUMEE/hinh-nen-guitar-dep-6.jpg"
import bg2 from "../../source/images_webUMEE/Screenshot.jpg"

const BaseSlider = props => {

    const {width, height} = props
    const [currentIndex,setCurrentIndex] = useState(0)

    const images = [bg0,bg1,bg2]

    const autoSlide = () => {
        setInterval(function () {
            setCurrentIndex(currentIndex => {
                if(currentIndex == images.length - 1)
                    return 0
                
                return currentIndex + 1
            })
        },5000)
    }

    const preSlider = () => {
        if(currentIndex == 0){
            return setCurrentIndex(images.length - 1)
        }

        setCurrentIndex(currentIndex - 1)
    }

    const nextSlider = () => {
        if(currentIndex == images.length - 1)
            return setCurrentIndex(0)

        setCurrentIndex(currentIndex + 1)
    }

    useEffect(() => {
    
        autoSlide()

    },[])

    return (
        <div style={{"width":width,"height":height}} className="baseSlide" >
            <div 
                style={{backgroundImage:`url(${images[currentIndex]})`}} 
                className="baseSlideImage"
            >
            </div>
            <div className="controlSlider">
                <div onClick={preSlider} className="preSlider"><FaChevronLeft color="white" size={40}/></div>
                <div onClick={nextSlider} className="nextSlider"><FaChevronRight color="white" size={40}/></div>
            </div>
        </div>
    );
};

BaseSlider.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
};

export default React.memo(BaseSlider);