import React from 'react';
import PropTypes from 'prop-types';

import Style from "./PopUp.module.css"

const PopUp = ({ width, height, content, fontSize, background, textColor}) => {
    const modalStyle = {
        "--width": width,
        "--height": height,
        fontSize: fontSize,
        ...(textColor && { '--font-color': textColor}),
        ...(background && { '--pop-up-background': background }),// 如果 background 存在，则设置样式

    };

    return (
        <div className={Style["pop-up"]} style={modalStyle}>
            <span >{content}</span>
        </div>
    );
};

PopUp.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string
};

export default PopUp;