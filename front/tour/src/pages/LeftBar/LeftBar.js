import  {useRef,useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {toggleDarkness} from "../../redux/features/LeftBar/darknessSlice";
import SubPub from "pubsub-js"
import Style from "./LeftBar.module.css"
import "../../iconfont.css"

export default function LeftBar() {

    const darkness = useSelector(state => state.darkness.value)
    const dispatch = useDispatch()

    const body = useRef()
    const shell = useRef()


    function toggleShell() {
        shell.current.classList.toggle(Style["close"])
    }

    function toggleDark() {
        body.current.classList.toggle(Style["dark"])
        // console.log(body.current.classList.contains(Style["dark"]))
        SubPub.publish("dark",{setDark:body.current.classList.contains(Style["dark"])})

        dispatch(toggleDarkness())
        // console.log(darkness)
    }

    return(
        <div className={Style["left-bar"]} ref={body}>
            <nav className={[`${Style["shell"]}`,`${Style["close"]}`].join(' ')} ref={shell}>
                <header>
                    <div className={Style["image-text"]}>
                        <span className={Style["image"]}>
                            <img src="../image/10.gif" alt=""/>
                        </span>
                        <div className={[`${Style["text"]}`,`${Style["logo-text"]}`].join(' ')}>
                            <span className={Style["name"]}>Wanghgk</span>
                            <span className={Style["software"]}>-tour-</span>
                        </div>
                    </div>
                    <i className={["iconfont","icon-xiangyoujiantou1",`${Style["toggle"]}`].join(' ')} onClick={toggleShell}></i>
                </header>
                <div className={Style["menu-bar"]}>
                    <div className={Style["menu"]}>
                        {/*<li className={Style["search-box"]}>*/}
                        {/*    <i className={["iconfont","icon-sousuo",`${Style["icon"]}`].join(' ')}></i>*/}
                        {/*    <input type="text" placeholder="搜索..."/>*/}
                        {/*</li>*/}
                        <ul className={Style["menu-links"]}>
                            <li className={Style["nav-link"]}>
                                <NavLink to={"main"}>
                                    <i className={["iconfont", "icon-shouye", `${Style["icon"]}`].join(' ')}></i>
                                    <span className={[`${Style["text"]}`, `${Style["nac-text"]}`].join(' ')}>主页</span>
                                </NavLink>
                            </li>

                            <li className={Style["nav-link"]}>
                                <NavLink to={"menu"}>
                                    <i className={["iconfont", "icon-caidan", `${Style["icon"]}`].join(' ')}></i>
                                    <span
                                        className={[`${Style["text"]}`, `${Style["nac-text"]}`].join(' ')}>页面菜单</span>
                                </NavLink>
                            </li>

                            <li className={Style["nav-link"]}>
                                <NavLink to={"navigate"}>
                                    <i className={["iconfont", "icon-daohang", `${Style["icon"]}`].join(' ')}></i>
                                    <span
                                        className={[`${Style["text"]}`, `${Style["nac-text"]}`].join(' ')}>地图导航</span>
                                </NavLink>
                            </li>

                            <li className={Style["nav-link"]}>
                                <NavLink to={"diary"}>
                                    <i className={["iconfont", "icon-rijijilu", `${Style["icon"]}`].join(' ')}></i>
                                    <span
                                        className={[`${Style["text"]}`, `${Style["nac-text"]}`].join(' ')}>博客游记</span>
                                </NavLink>
                            </li>

                            <li className={Style["nav-link"]}>
                                <NavLink to={"editor"}>
                                    <i className={["iconfont", "icon-ditu", `${Style["icon"]}`].join(' ')}></i>
                                    <span
                                        className={[`${Style["text"]}`, `${Style["nac-text"]}`].join(' ')}>地图编辑</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={Style["bottom-content"]}>
                        <li className={Style[""]}>
                            <NavLink to={"../"}>
                                <i className={["iconfont", "icon-icon_logout", `${Style["icon"]}`].join(' ')}></i>
                                <span className={[`${Style["text"]}`, `${Style["nac-text"]}`].join(' ')}>注销</span>
                            </NavLink>
                        </li>
                        <li className={Style["mode"]} onClick={toggleDark}>
                            <div className={Style["sun-moon"]}>
                                <i className={["iconfont","icon-rijian",`${Style["icon"]}`].join(' ')}></i>
                                <i className={["iconfont","icon-yejian",`${Style["icon"]}`].join(' ')}></i>
                            </div>
                            <span className={[`${Style["mode-text"]}`,`${Style["text"]}`].join(' ')}>夜间模式</span>
                            <div className={Style["toggle-switch"]}>
                                <span className={Style["switch"]}></span>
                            </div>
                        </li>
                    </div>
                </div>

            </nav>
        </div>
    )
}