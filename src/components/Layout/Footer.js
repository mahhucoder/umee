import React, { useContext } from 'react';
import "../../css/Layout/Footer.css"
import BaseFooterContext from '../Base/BaseFooterContext';
import BaseSocialButtonCircle from '../Base/BaseSocialButtonCircle';
import BaseContactCircle from '../Base/BaseContactCircle';
import { FaTruckMoving,FaPhoneVolume,FaGratipay } from "react-icons/fa";
import { UserContext } from '../../Context/UserContext';

const Footer = () => {

    const pageContext = ["Danh mục sản phẩm","Sản phẩm nổi bật","Tin tức"]
    const categoryContext = ["PIANO","DIGITAL PAINOS","GUITARS"]
    const {user} = useContext(UserContext)

    return (
        <div style={{display: user !== null && user.Admin == 1 ? 'none' : 'flex'}} className="footerContainer">
            
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

            <div className="footerBottom">
                <div className="footerCarTruck">
                    <FaTruckMoving size={48}/>
                    <div>
                        <div className="carTruckTitle">Chuuyển phát nhanh</div>
                        <div className="carTruckSlogan">Giao hàng nội thành trong 12H</div>
                    </div>
                </div>

                <div className="footerService">
                    <FaPhoneVolume size={48} />
                    <div>
                        <div className="serviceTitle">DỊCH VỤ TỐT NHẤT</div>
                        <div className="serviceSlogan">Hỗ trợ online 24/7</div>
                    </div>
                </div>

                <div className="footerFeeling">
                    <FaGratipay size={48} />
                    <div>
                        <div className="feelingTitle">Giá ưu đãi cho khách hàng</div>
                        <div className="feelingSlogan">Nhiều chương trình khuyến mãi</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;