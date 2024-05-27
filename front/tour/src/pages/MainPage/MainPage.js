import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Request from "../../service/request"


import Style from "./MainPage.module.css"
import Swiper from "../Swiper/Swiper";
import TurnTable from "../TurnTable/TurnTable";
import axios from "axios";
import UserInfo from "../UserInfo/UserInfo";
export default function MainPage() {

    const [content,changeContent] = useState(["推送项目1","推送项目2","推送项目3","推送项目4","推送项目5","更改头像","更新信息","允许收集用户数据"])
    const [color,setColor] = useState([true,true,true,true,true,true,true,true])
    const [userInfo,setUserInfo] = useState({
        id:-1,
        avatar:"http://127.0.0.1:5002/3-d.png",
        username:"none",
        nickname:"none",
        status:0,
        createTime:"no time",
        updateTime:"no time"
    })

    const stickContainer = useRef()
    const mainPageContainer = useRef()
    const page1 = useRef()
    const page2 = useRef()

    const darkness = useSelector(state => state.darkness.value)
    const token = sessionStorage.getItem("token")

    let contents = [
        ["项目1","项目2","项目3","项目4","项目5","6","7","8"],
        ["9","10","11","12","13","14","15","16"],
        ["17","18","19","20","21","22","23","24"],
        ["25","26","27","28","29","30","31","32"]
    ]

    function mainPageScroll(e) {
        // console.log( e.target.scrollTop)
        if(e.target.scrollTop > 550) {
            page1.current.classList.add(Style["page-1-background"])
        }

        if(e.target.scrollTop > 700) {
            page2.current.classList.add(Style["page-2-background"])
        }

    }

    function changeColor(ele,stickIdx) {
        if(ele!==null)
            ele.stopPropagation()

        let newColor = color
        newColor[stickIdx] = !newColor[stickIdx]

        // ele.target.classList.add(Style["close"])

        if(newColor[stickIdx]) {
            ele.target.classList.remove(Style["no"])
        }else {
            ele.target.classList.add((Style["no"]))
        }

        if(stickIdx<5){
            let permit = sessionStorage.getItem("permit")
            let permitCopy = JSON.parse(permit)
            permitCopy[stickIdx] = !permitCopy[stickIdx]
            // console.log(permitCopy)
            sessionStorage.setItem("permit",JSON.stringify(permitCopy))
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
        let permitString = sessionStorage.getItem("permit")
        let permit = JSON.parse(permitString)

        setColor([permit[0],permit[1],permit[2],permit[3],permit[4],color[5],color[6],color[7]])

        axios.get("http://127.0.0.1:8080/user/userInfo",{headers:{"authorization" : token}})
            .then(res=>{
                // console.log(res)
                setUserInfo(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])

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

                        <div className={[`${Style["stick"]}`, `${Style["long"]}`, `${color[0]?Style["yes"]:Style["no"]}`].join(' ')}
                             id={Style["stick1"]} onClick={(e)=>{changeColor(e,0)}}><div>{content[0]}:{color[0]?"允许":"禁止"}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`, `${color[1]?Style["yes"]:Style["no"]}`].join(' ')}
                                 id={Style["stick2"]} onClick={(e)=>{changeColor(e,1)}}><div>{content[1]}:{color[1]?"允许":"禁止"}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`, `${color[2]?Style["yes"]:Style["no"]}`].join(' ')}
                                 id={Style["stick3"]} onClick={(e)=>{changeColor(e,2)}}><div>{content[2]}:{color[2]?"允许":"禁止"}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["long"]}`, `${color[3]?Style["yes"]:Style["no"]}`].join(' ')}
                                 id={Style["stick4"]} onClick={(e)=>{changeColor(e,3)}}><div>{content[3]}:{color[3]?"允许":"禁止"}</div></div>

                    </div>
                    <div className={[`${Style["stick-right"]}`, `${Style["stick-side"]}`].join(' ')}>

                        <div className={[`${Style["stick"]}`, `${Style["long"]}`, `${color[4]?Style["yes"]:Style["no"]}`].join(' ')}
                             id={Style["stick1"]} onClick={(e)=>{changeColor(e,4)}}><div>{content[4]}:{color[4]?"允许":"禁止"}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`, `${color[5]?Style["yes"]:Style["no"]}`].join(' ')}
                             id={Style["stick2"]} onClick={(e)=>{changeColor(e,5)}}><div>{content[5]}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["short"]}`, `${color[6]?Style["yes"]:Style["no"]}`].join(' ')}
                             id={Style["stick3"]} onClick={(e)=>{changeColor(e,6)}}><div>{content[6]}</div></div>


                        <div className={[`${Style["stick"]}`, `${Style["long"]}`, `${color[7]?Style["yes"]:Style["no"]}`].join(' ')}
                             id={Style["stick4"]} onClick={(e)=>{changeColor(e,7)}}><div>{content[7]}:{color[7]?"允许":"禁止"}</div></div>

                    </div>
                </div>

            </div>
            <div className={Style["page"]} style={{"--order": 2}} ref={page2}>
                <UserInfo userInfo={userInfo}/>
            </div>


        </div>
    )
}