
import {NavLink} from "react-router-dom";
import Style from "./Menu.module.css"

export default function () {


    return (
        <div className={Style["menu"]}>
            <div className={Style["shell"]}>
                <NavLink to={"../main"} className={[`${Style["box"]}`,`${Style["img1"]}`].join(' ')}>
                    <div className={Style["text"]}>
                        <header>
                            <span className={Style["title"]}>NO.</span>
                            <span className={Style["num"]}>1</span>
                        </header>
                        <p>
                            乐队的吉他手、作词担当。
                            严重的沟通障碍症患者，不敢和人主动搭话。
                            内心话语远远多于实际说出来的。经常做出一些常人难以理解的行动。
                            在网络上以“Guitar Hero”的名义活跃着，拥有大量粉丝。昵称是“小波奇（ぼっちちゃん）”（和名字结合成“一人ぼっち”）一里波知既视感
                        </p>
                    </div>
                </NavLink>
                <NavLink to={"../navigate"} className={[`${Style["box"]}`,`${Style["img2"]}`].join(' ')}>
                    <div className={Style["text"]}>
                        <header>
                            <span className={Style["title"]}>NO.</span>
                            <span className={Style["num"]}>2</span>
                        </header>
                        <p>
                            乐队的吉他手和歌手，和波奇是校友。
                            社交圈广，有很多朋友的现充。
                            其实不会弹吉他，因为憧憬凉前辈而加入了虹夏的乐队，一直瞒着乐队的其他成员，直到第一次演出前退出乐队逃跑了。
                            在波奇的帮助下和乐队成员和解，重新加入乐队。
                        </p>
                    </div>
                </NavLink>
                <NavLink to={"../diary"} className={[`${Style["box"]}`,`${Style["img3"]}`].join(' ')}>
                    <div className={Style["text"]}>
                        <header>
                            <span className={Style["title"]}>NO.</span>
                            <span className={Style["num"]}>3</span>
                        </header>
                        <p>
                            乐队的鼓手。
                            在公园中发现了背着吉他包灰心丧气的波奇，并强拉她加入了“结束乐队”。
                            乐队的润滑剂，善于交流。穿着也比较时尚。
                            将自己姐姐的Livehouse作为乐队活动地点。平常也会在Livehouse打工。
                        </p>
                    </div>
                </NavLink>
                <NavLink to={"../editor"} className={[`${Style["box"]}`,`${Style["img4"]}`].join(' ')}>
                    <div className={Style["text"]}>
                        <header>
                            <span className={Style["title"]}>NO.</span>
                            <span className={Style["num"]}>4</span>
                        </header>
                        <p>
                            乐队的贝斯手、作曲担当。
                            被别人叫做怪人会很兴奋的怪人。
                            表情变化少，和波奇一样没什么朋友。曾经因为过于孤僻而被波奇当成是社恐同类却发现只是喜欢一个人待着而已。
                        </p>
                    </div>
                </NavLink>

            </div>
        </div>
    )
}