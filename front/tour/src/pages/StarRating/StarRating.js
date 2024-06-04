import React, {useEffect} from "react";

import Style from "./StarRating.module.css"
import axios from "axios";
// 星星组件
function Star({ marked, starId }) {
    return (
        <span className={Style["star"]} star-id={starId} style={{ color: "#ff9933" }} role="button">
      {/* 空星，实星 */}
            {marked ? "\u2605" : "\u2606"}
    </span>
    );
}

// 星级评分
function Stars(props) {
    const {setScore,enScore} = props
    // 分数显示
    const [rating, setRating] = React.useState(
        typeof props.rating == "number" ? props.rating : 0
    );
    // 鼠标移入效果
    const [selection, setSelection] = React.useState(0);
    useEffect(()=>{
        setScore(Number(rating))
    },[selection])
    const hoverOver = event => {
        if(enScore) {
            let val = 0;
            if (event && event.target && event.target.getAttribute("star-id"))
                val = event.target.getAttribute("star-id");
            setSelection(val);
        }
    };
    return (
        <div className={Style["stars-row"]}
            // 鼠标移入效果
            onMouseOut={() => hoverOver(null)}
            // 点击选中分数
            onClick={event => {
                    if(enScore) {
                        setRating(event.target.getAttribute("star-id") || rating)
                    }
                }
            }
            onMouseOver={hoverOver}
        >
            {/* 创建5个组件 */}
            {Array.from({ length: 5 }, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1} `}
                    marked={selection ? selection >= i + 1 : rating >= i + 1}
                />
            ))}
        </div>
    );
}

export default function StarRating(props) {
    const {setScore,enScore} = props

    return (
        <div className={Style["stars-container"]}>
            <Stars setScore={setScore} enScore={enScore}/>
            {/*<StarRating rating={2} />*/}
        </div>
    );
}