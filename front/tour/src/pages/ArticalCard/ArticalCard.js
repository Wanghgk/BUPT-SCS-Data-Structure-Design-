

import Style from "./Artical.module.css"

export default function ArticalCard(props) {

    const {imgUrl,title} = props


    return (
        <div className={Style["artical-card"]} >
            <img src={imgUrl} alt={"图片要逃走啦!"}/>
            <span>{title}</span>
        </div>
    )
}