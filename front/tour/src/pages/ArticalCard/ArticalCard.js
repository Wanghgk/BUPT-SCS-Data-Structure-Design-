import {useEffect,useRef} from "react";

import Style from "./ArticalCard.module.css"


export default function ArticalCard(props) {

    const {imgUrl,title,small} = props

    return (
        <div className={Style["artical-card"]}>
            <img src={imgUrl} alt={"图片要逃走啦!"} style={{maxHeight:small?200:"",minHeight:small?100:"",height:small?171.5:""}}/>
            <span>{title}</span>
        </div>
    )
}