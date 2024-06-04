import {useState,useEffect,useRef} from "react";

import Style from "./ImageSwiper.module.css"

var index = 0
var timer
export default function ImageSwiper(props) {
    const {images} = props

    let [img,changeImg] = useState(0)
    // let [width,setWidth] = useState(window.innerWidth)
    const swiper = useRef()

    // let index = img;

    useEffect(() => {
        //     const handleResize = () => setWidth(window.innerWidth);
        //     window.addEventListener("resize", handleResize);
        //     return () => {
        //         window.removeEventListener("resize", handleResize);
        //     };

        // return () =>{
        //     clearInterval(timer)
        //     console.log("[]clear timer")
        // }
        swiper.current.style.transition = "0s"
        setTimeout(()=>{
            swiper.current.style.transition = "0.3s"
        },50)
    }, []);

    useEffect(() => {
        if(index === 1 || index === images.length-1){
            setTimeout(()=>{
                swiper.current.style.transition = "0.3s"
                // console.log(swiper.current.style.transition)
                changeImg(index)
                // console.log("@@@")
            },50)
        }
    },[img])

    function add() {
        // console.log("add",index)
        if(index >= images.length-1){

            // swiper.current.style.transition = '0s'
            // // console.log(swiper.current.style.transition)
            // index = 1;
            // // console.log("向右越过",index)
            // changeImg(index - 1)

        }else{
            index++;
            changeImg(index)
        }
    }

    function desc(){
        // console.log("desc",index)
        if(index < 1){

            // swiper.current.style.transition = '0s'
            // index = images.length-1;
            // // console.log("向左越过",index)
            // changeImg(index + 1)

        }else{
            index--;
            changeImg(index)
        }

    }

    function switchSwiper(change){
        clearInterval(timer)
        if(change === 1){
            add()
        }else if(change === -1){
            desc()
        }
        // console.log(change,index)
    }


    return (
        <div className={Style["wrap"]}>
            <div className={Style["swiper"]} style={{"--img": img,"--total-img": images.length}} ref={swiper}>
                {
                    images.map((item,idx)=> {
                        return <div className={Style["swiper-item"]} key={item+idx}>
                            <img src={item}></img>
                        </div>
                    })
                }
            </div>
            <div className={Style["buttons"]}>
            <div className={[`${Style["switch"]}`, `${Style["switch-left"]}`].join(' ')} onClick={() => {
                    switchSwiper(-1)
                }}><i className={["iconfont","icon-xiangzuojiantou",`${Style["arrow"]}`].join(' ')}></i></div>
                <div className={[`${Style["switch"]}`, `${Style["switch-right"]}`].join(' ')} onClick={() => {
                    switchSwiper(1)
                }}><i className={["iconfont","icon-xiangyoujiantou",`${Style["arrow"]}`].join(' ')}></i></div>
            </div>
        </div>

    )
}