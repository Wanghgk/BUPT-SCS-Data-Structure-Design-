import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Request from "../../service/request"


import Style from "./MainPage.module.css"
import Swiper from "../Swiper/Swiper";
import TurnTable from "../TurnTable/TurnTable";
export default function MainPage() {

    const [content,changeContent] = useState(["1","2","3","4","5","6","7","8"])

    const stickContainer = useRef()
    const mainPageContainer = useRef()

    const darkness = useSelector(state => state.darkness.value)

    let contents = [
        ["1","2","3","4","5","6","7","8"],
        ["9","10","11","12","13","14","15","16"],
        ["17","18","19","20","21","22","23","24"],
        ["25","26","27","28","29","30","31","32"]
    ]

    function changeStick(newContentId) {

        if(newContentId !== content){
            stickContainer.current.classList.add(Style["close"])
            requestNews(newContentId)
        }
        // console.log(newContentId)
    }

    function flushStick() {
        stickContainer.current.classList.add(Style["close"])
        // requestNews()
        setTimeout(()=>{
            stickContainer.current.classList.remove(Style["close"])
        },500)
    }

    async function requestNews(newContentId) {

        // Request({
        //     method:'get',
        //     url:'/stick',
        //     params:{id:newContentId}
        // }).then((res)=>{
        //     changeContentId(newContentId)
        //     stickContainer.current.classList.remove(Style["close"])
        //     console.log(res)
        // })

        setTimeout(()=>{
            const newContent = contents[newContentId]
            changeContent(newContent)
            stickContainer.current.classList.remove(Style["close"])
        },500)

    }

    useEffect(()=>{
        if(darkness){
            mainPageContainer.current.classList.add(Style["dark"])
        }else{
            mainPageContainer.current.classList.remove(Style["dark"])
        }
    },[darkness])

    return (
        <div className={Style["main-page"]} ref={mainPageContainer}>
            <div className={Style["page"]}>
                <div className={Style["swiper"]}>
                    <Swiper></Swiper>
                </div>
                <div className={Style["slogan"]}>
                    <div className={Style["slogan-container"]}>
                        <span>千里之行，始于足下。</span>
                    </div>
                </div>
            </div>
            <div className={Style["page"]} style={{"--order": 1}}>
                <TurnTable changeStick={(id)=> {changeStick(id)}} flushStick={()=>{flushStick()}}/>
                <div className={Style["stick-container"]} ref={stickContainer}>
                    <div className={[`${Style["stick-left"]}`, `${Style["stick-side"]}`].join(' ')}>

                        <div className={[`${Style["stick"]}`, `${Style["long"]}`].join(' ')}
                                 id={Style["stick1"]}><a href={"#"}>{content[0]}</a></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`].join(' ')}
                                 id={Style["stick2"]}><a href={"#"}>{content[1]}</a></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`].join(' ')}
                                 id={Style["stick3"]}><a href={"#"}>{content[2]}</a></div>


                        <div className={[`${Style["stick"]}`, `${Style["long"]}`].join(' ')}
                                 id={Style["stick4"]}><a href={"#"}>{content[3]}</a></div>

                    </div>
                    <div className={[`${Style["stick-right"]}`, `${Style["stick-side"]}`].join(' ')}>

                        <div className={[`${Style["stick"]}`, `${Style["long"]}`].join(' ')}
                             id={Style["stick1"]}><a href={"#"}>{content[4]}</a></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`].join(' ')}
                             id={Style["stick2"]}><a href={"#"}>{content[5]}</a></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`].join(' ')}
                             id={Style["stick3"]}><a href={"#"}>{content[6]}</a></div>


                        <div className={[`${Style["stick"]}`, `${Style["long"]}`].join(' ')}
                             id={Style["stick4"]}><a href={"#"}>{content[7]}</a></div>

                    </div>
                </div>

            </div>
            <div className={Style["page"]} style={{"--order": 2}}>

            </div>


        </div>
    )
}