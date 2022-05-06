import React from 'react';
import Default from "../source/images_webUMEE/newfive/0.png"
import Academy from "../source/images_webUMEE/newfive/Academy.png"
import CD60SCE from "../source/images_webUMEE/newfive/CD60SCE.png"
import E114 from "../source/images_webUMEE/newfive/E114.png"
import FCD60SCE from "../source/images_webUMEE/newfive/FCD60SCE.png"


const TheNewFive = () => {
    return (
        <div>
            <div className="newTitle">Gợi ý những cây đàn guitar acoustic chất lượng dành cho người chơi chuyên nghiệp</div>

            <div>Nếu bạn là một guitarist đang bước vào môi trường chuyên nghiệp, cần tìm cho mình một sự lựa chọn lý tưởng với giá cả phải chăng, chất lượng cao với giai điệu và khả năng chơi tuyệt vời thì chúng tôi có một số gợi ý những cây đàn guitar acoustic chất lượng đến từ các thương hiệu danh tiếng như Taylor, Fender dành cho người chơi chuyên nghiệp.</div>
            <div className="newImage" style={{backgroundImage:`url(${Default})`}}></div>

            <div style={{fontWeight:"500"}}>Fender CD-60SCE LH NAT</div>
            <div>
                Đàn Guitar Fender CD-60SCE LH có dáng Dreadnought Cutaway dành riêng cho người chơi thuận tay trái. Cấu tạo thùng đàn lớn cho tiếng đàn to, ấm và đầy hơn, phù hợp cho các bạn chơi đệm và dùng pick. Sử dụng pick-up của Fishman với EQ 3-band với các tùy chỉnh: bass, mid, treble và một nút điều chỉnh âm lượng. Đặc biệt còn có chức năng chromatic tuner tích hợp sẵn giúp bạn giữ cây đàn đúng tông, và chromatic tuner giúp bạn dễ dàng chỉnh dây theo những tông khác nhau (Half step down, D tuning, Open E...) hơn những loại tuner thông thường.
            </div>
            <div className="newImage" style={{backgroundImage:`url(${CD60SCE})`}}></div>

            <div style={{fontWeight:"500"}}>Fender CD-60SCE</div>
            <div>
                Đàn Guitar Fender CD-60SCE hấp dẫn người chơi bởi thiết kế dáng Dreadnought Cutaway bắt mắt. Sử dụng pick-up của Fishman với EQ 3-band và chức năng chromatic tuner tích hợp sẵn.
            </div>
            <div className="newImage" style={{backgroundImage:`url(${FCD60SCE})`}}></div>

            <div style={{fontWeight:"500"}}>Taylor Academy A10, Taylor Academy 10E, Taylor Academy 12E</div>
            <div>
                Với Academy Series mang đến trải nghiệm guitar hấp dẫn nhất từ cảm giác thoải mái, giai điệu hài lòng đến độ tin cậy của hiệu suất, tất cả đều ở mức giá phải chăng. Sự kết hợp của chiều rộng đai ốc 1-11 / 16 inch hẹp hơn, chiều dài tỷ lệ 24-7 / 8 inch và dây đo nhẹ mang lại cảm giác dây mà các ngón tay sẽ thích. Và trên thân guitar, một tay vịn giúp cải thiện sự thoải mái khi chơi.
            </div>
            <div className="newImage" style={{backgroundImage:`url(${Academy})`}}></div>

            <div style={{fontWeight:"500"}}>Taylor 114E</div>
            <div>
                Đàn Guitar Taylor 114E có dáng Grand Auditorium, trọng lượng nhẹ, âm thanh vang. Thiết bị điện tử Taylor Expression System® 2 (ES2) là một pickup mới nhất trong quá trình cải tiến liên tục của Taylor để khuếch đại tiếng cho đàn guitar Acoustic. Trái tim của Expression System 2 là một thiết kế pickup gắn phía sau lưng ngựa đàn của Taylor đã được cấp bằng sáng chế, gồm có ba bộ cảm biến pickup được điều chỉnh riêng biệt và được đặt ở vị trí duy nhất. Cùng với bộ preamp cao cấp "âm thanh chuyên nghiệp" do Taylor thiết kế, hệ thống này tạo nên âm thanh khuếch đại đặc biệt và đáp ứng. Trên sân khấu thông qua một PA, được cắm vào bộ khuếch đại âm thanh, hoặc nối trực tiếp vào phần mềm ghi âm, Expression System 2 sẽ truyền tải trung thực tiếng đàn guitar Taylor.
            </div>
            <div className="newImage" style={{backgroundImage:`url(${E114})`}}></div>
        </div>
    );
};

export default TheNewFive;