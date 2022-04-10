import React from 'react';
import BaseFooterContextItem from './BaseFooterContextItem';
import "../../css/Base/BaseFooterContext.css"

const BaseFooterContext = (props) => {

    const {title,context} = props;

    return (
        <div className="footerContextWrapper">
            <div className="footerContextTitle">{title}</div>
            <div className="footerContext">
                <div>
                    {
                        context.map((item,index) => <BaseFooterContextItem key={index} text={item} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default BaseFooterContext;