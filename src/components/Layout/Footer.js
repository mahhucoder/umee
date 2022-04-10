import React from 'react';
import "../../css/Layout/Footer.css"
import BaseFooterContext from '../Base/BaseFooterContext';
import BaseSocialButtonCircle from '../Base/BaseSocialButtonCircle';
import BaseContactCircle from '../Base/BaseContactCircle';

const Footer = () => {

    const pageContext = ["Danh mục sản phẩm","Sản phẩm nổi bật","Tin tức"]
    const categoryContext = ["PIANO","DIGITAL PAINOS","GUITARS"]

    return (
        <div className="footerContainer">
            
            <div className="footerLeft">
                <BaseFooterContext context={pageContext} title="Trang chủ" />

                <BaseFooterContext context={categoryContext} title="Sản phẩm" />
                <div className="footerNews">Tin tức</div>
                <div className="footerSupport">Hỗ trợ</div>
            </div>

            <div className="footerRight">
                <div className="footerLogo"></div>
                <a className="footerLinkWeb">https://www.umee.com</a>
                <div className="footerSocial">
                    <BaseSocialButtonCircle link="" icon="facebook" />
                    <BaseSocialButtonCircle link="" icon="google" />
                    <BaseSocialButtonCircle link="" icon="instagram" />
                </div>
            </div>

            <div className="contactButtonGroup">
                <BaseContactCircle type="call" />
                <BaseContactCircle type="message" />
            </div>
        </div>
    );
};

export default Footer;