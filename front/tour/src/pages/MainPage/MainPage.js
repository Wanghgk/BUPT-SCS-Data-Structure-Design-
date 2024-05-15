import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Request from "../../service/request"


import Style from "./MainPage.module.css"
import Swiper from "../Swiper/Swiper";
import TurnTable from "../TurnTable/TurnTable";
export default function MainPage() {

    const [content,changeContent] = useState(["项目1","项目2","项目3","项目4","项目5","更改头像","更新信息","允许收集用户数据"])
    const [color,setColor] = useState([true,true,true,true,true,true,true,true])

    const stickContainer = useRef()
    const mainPageContainer = useRef()
    const page1 = useRef()

    const darkness = useSelector(state => state.darkness.value)

    let contents = [
        ["项目1","项目2","项目3","项目4","项目5","6","7","8"],
        ["9","10","11","12","13","14","15","16"],
        ["17","18","19","20","21","22","23","24"],
        ["25","26","27","28","29","30","31","32"]
    ]

    function mainPageScroll(e) {
        // console.log( e.target.scrollTop)
        if(e.target.scrollTop > 658) {
            page1.current.classList.add(Style["page-1-background"])
        }
    }

    function changeColor(ele,stickIdx) {
        ele.preventDefault()

        let newColor = color
        newColor[stickIdx] = !newColor[stickIdx]

        if(newColor[stickIdx]) {
            ele.target.classList.remove(Style["no"])
        }else {
            ele.target.classList.add((Style["no"]))
        }

        setColor([...newColor])
    }

    function changeStick(newContentId) {

        // if(newContentId !== content){
        //     stickContainer.current.classList.add(Style["close"])
        //     requestNews(newContentId)
        // }
        // console.log(newContentId)
    }

    function flushStick() {
        stickContainer.current.classList.toggle(Style["close"])
        // requestNews()
        // setTimeout(()=>{
        //     stickContainer.current.classList.remove(Style["close"])
        // },500)
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
        <div className={Style["main-page"]} ref={mainPageContainer} onScroll={(e)=>{mainPageScroll(e)}}>
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
            <div className={Style["page"]} style={{"--order": 1}} ref={page1}>
                <TurnTable changeStick={(id)=> {changeStick(id)}} flushStick={()=>{flushStick()}}/>
                <div className={Style["stick-container"]} ref={stickContainer}>
                    <div className={[`${Style["stick-left"]}`, `${Style["stick-side"]}`].join(' ')}>

                        <div className={[`${Style["stick"]}`, `${Style["long"]}`].join(' ')}
                             id={Style["stick1"]} onClick={(e)=>{changeColor(e,0)}}><div>{content[0]}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`].join(' ')}
                                 id={Style["stick2"]} onClick={(e)=>{changeColor(e,1)}}><div>{content[1]}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`].join(' ')}
                                 id={Style["stick3"]} onClick={(e)=>{changeColor(e,2)}}><div>{content[2]}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["long"]}`].join(' ')}
                                 id={Style["stick4"]} onClick={(e)=>{changeColor(e,3)}}><div>{content[3]}</div></div>

                    </div>
                    <div className={[`${Style["stick-right"]}`, `${Style["stick-side"]}`].join(' ')}>

                        <div className={[`${Style["stick"]}`, `${Style["long"]}`].join(' ')}
                             id={Style["stick1"]} onClick={(e)=>{changeColor(e,4)}}><div>{content[4]}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`].join(' ')}
                             id={Style["stick2"]} onClick={(e)=>{changeColor(e,5)}}><div>{content[5]}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`].join(' ')}
                             id={Style["stick3"]} onClick={(e)=>{changeColor(e,6)}}><div>{content[6]}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["long"]}`].join(' ')}
                             id={Style["stick4"]} onClick={(e)=>{changeColor(e,7)}}><div>{content[7]}</div></div>

                    </div>
                </div>

            </div>
            <div className={Style["page"]} style={{"--order": 2}}>

            </div>


        </div>
    )
}