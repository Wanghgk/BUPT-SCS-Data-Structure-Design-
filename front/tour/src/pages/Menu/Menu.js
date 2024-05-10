import {useRef} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

import Style from "./Menu.module.css"
import {useEffect} from "react";

export default function () {

    const darkness = useSelector(state => state.darkness.value)
    const menu = useRef()

    useEffect(() => {
        if (darkness) {
            menu.current.classList.add(Style["dark"])
        } else {
            menu.current.classList.remove(Style["dark"])
        }
    }, [darkness]);

    return (
        <div className={Style["menu"]} ref={menu}>
            <div className={Style["shell"]}>
                <NavLink to={"../main"} className={[`${Style["box"]}`,`${Style["img1"]}`].join(' ')}>
                    <div className={Style["text"]}>
                        <header>
                            <span className={Style["title"]}>首页</span>
                            <span className={Style["num"]}></span>
                        </header>
                        <p>
                            千里之行，始于足下 ——《老子·德经·第六十四章》
                        </p>
                    </div>
                </NavLink>
                <NavLink to={"../navigate"} className={[`${Style["box"]}`,`${Style["img2"]}`].join(' ')}>
                    <div className={Style["text"]}>
                        <header>
                            <span className={Style["title"]}>地图导航</span>
                            <span className={Style["num"]}></span>
                        </header>
                        <p>
                            为者常成，行者常至 ——《晏子春秋·卷六·内篇·篇二十七》
                        </p>
                    </div>
                </NavLink>
                <NavLink to={"../diary"} className={[`${Style["box"]}`,`${Style["img3"]}`].join(' ')}>
                    <div className={Style["text"]}>
                        <header>
                            <span className={Style["title"]}>地图游记</span>
                            <span className={Style["num"]}></span>
                        </header>
                        <p>
                            读万卷书，行万里路 ——《随园诗话·补遗 卷一》
                        </p>
                    </div>
                </NavLink>
                <NavLink to={"../editor"} className={[`${Style["box"]}`,`${Style["img4"]}`].join(' ')}>
                    <div className={Style["text"]}>
                        <header>
                            <span className={Style["title"]}>地图编辑</span>
                            <span className={Style["num"]}>(测试)</span>
                        </header>
                        <p>
                            检校舆地图，宁复见施设 ——《建炎感事》
                        </p>
                    </div>
                </NavLink>

            </div>
        </div>
    )
}