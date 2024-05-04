import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Style from "./TurnTable.module.css"

export default function TurnTable(props) {

    const {changeStick,flushStick} = props
    const turntable = useRef()
    const darkness = useSelector(state => state.darkness.value)

    useEffect(()=>{
        if(darkness){
            turntable.current.classList.add(Style["dark"])
        }else{
            turntable.current.classList.remove(Style["dark"])
        }
    },[darkness])

    return (
        <div className={Style["turntable"]} ref={turntable}>
            <div className={Style["void"]} id="void">
                <div className={Style["crop"]}>
                    <ul className={Style["card-list"]} style={{"--count":6}}>
                        <li>
                            <div className={Style["card"]}><div>
                                <span>鼠标悬停在中心选项框可以暂停旋转</span>
                            </div></div>
                        </li>
                        <li>
                            <div className={[`${Style["card"]}`, `${Style["card-button"]}`].join(' ')} onClick={()=>{changeStick(0)}}><div>
                                <img src="../image/11.gif" alt=""/>
                            </div></div>
                        </li>
                        <li>
                            <div className={Style["card"]}><div>
                                <span>点击对应图片可以改变推荐项目</span>
                            </div></div>
                        </li>
                        <li>
                            <div className={[`${Style["card"]}`, `${Style["card-button"]}`].join(' ')} onClick={()=>{changeStick(1)}}><div>
                                <img src="../image/11.gif" alt=""/>
                            </div></div>
                        </li>
                        <li>
                            <div className={Style["card"]}><div>
                                <span>点击中心圆可以刷新推荐项</span>
                            </div></div>
                        </li>
                        <li>
                            <div className={[`${Style["card"]}`, `${Style["card-button"]}`].join(' ')} onClick={()=>{changeStick(2)}}><div>
                                <img src="../image/11.gif" alt=""/>
                            </div></div>
                        </li>
                    </ul>
                    <div className={Style["last-circle"]}></div>
                    <div className={Style["second-circle"]}></div>

                </div>
                <div className={Style["mask"]}></div>
                <div className={Style["center-circle"]} onClick={flushStick}></div>
            </div>
        </div>
    )
}