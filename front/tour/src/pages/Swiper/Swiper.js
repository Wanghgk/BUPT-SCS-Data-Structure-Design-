import {useState,useEffect,useRef} from "react";

import Style from "./Swiper.module.css"

var index = 0
var timer
export default function Swiper() {

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

        setTimer()

        return () =>{
            clearInterval(timer)
            console.log("[]clear timer")
        }
    }, []);

    useEffect(() => {
        clearInterval(timer)
        // console.log("@@",index)
        if(index === 1 || index === 3){
            setTimeout(()=>{
                swiper.current.style.transition = "0.3s"
                // console.log(swiper.current.style.transition)
                changeImg(index)
                // console.log("@@@")
            },50)
        }
        setTimer()

        return ()=>{
            clearInterval(timer)
        }
    },[img])

    function setTimer() {
        timer = setInterval(()=>{
            add()
        },12000)
    }

    function add() {
        // console.log("add",index)
        if(index >= 4){


            swiper.current.style.transition = '0s'
            // console.log(swiper.current.style.transition)
            index = 1;
            // console.log("向右越过",index)
            changeImg(index - 1)

        }else{
            index++;
            changeImg(index)
        }
    }

    function desc(){
        // console.log("desc",index)
        if(index < 1){

            swiper.current.style.transition = '0s'
            index = 3;
            // console.log("向左越过",index)
            changeImg(index + 1)


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
        setTimer()
    }


    return (
        <div className={Style["wrap"]}>
            <div className={Style["swiper"]} style={{"--img": img}} ref={swiper}>
                <div className={Style["swiper-item"]} style={{"backgroundImage": "url(../image/6.png)"}}></div>
                <div className={Style["swiper-item"]} style={{"backgroundImage": "url(../image/7.png)"}}></div>
                <div className={Style["swiper-item"]} style={{"backgroundImage": "url(../image/8.png)"}}></div>
                <div className={Style["swiper-item"]} style={{"backgroundImage": "url(../image/9.png)"}}></div>
                <div className={Style["swiper-item"]} style={{"backgroundImage": "url(../image/6.png)"}}></div>
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