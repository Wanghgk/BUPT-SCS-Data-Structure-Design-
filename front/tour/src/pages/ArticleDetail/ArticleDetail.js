
import { Carousel } from 'react-responsive-carousel'; // 引入轮播图组件

import Style from "./ArticleDetail.module.css"

 export default function ArticleDetail() {
    const title = "title"
    const author = "author"
    const content = "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。\n" +
        "\n" +
        "你说得对，但是原根是一个数学符号。设m是正整数，a是整数，若a模m的阶等于φ(m)，则称a为模m的一个原根。假设一个数g是P的原根，那么g^i mod P的结果两两不同，且有 1<g<P，0<i<P，归根到底就是g^(P-1) = 1 (mod P)当且仅当指数为P-1的时候成立。(这里P是素数)。你的数学很差，我现在每天用原根都能做1e5次数据规模1e6的NTT，每个月差不多3e6次卷积， 也就是现实生活中3e18次乘法运算，换算过来最少也要算1000年。虽然我只有14岁，但是已经超越了中国绝大多数人(包括你)的水平，这便是原根给我的骄傲的资本。\n" +
        "\n" +
        "你说的对，但是《必蓝档案》是阿罗娜研发的一款全新游戏抽卡。故事发生在一个被称作「募集」的抽卡世界里，在这里被阿罗娜选中的人将被授予「九蓝一金」，引导非酋之力。你将扮演一位名为「sensei」的神秘角色，在卡池中歪出性格各异、能力独特的学生，和她们一起吃井，寻找不存在的「出货」，逐步发掘「前程四井」的真相。\n" +
        "\n" +
        "喵喵喵喵，喵喵《喵喵》喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵。喵喵喵喵喵喵喵喵喵喵「喵喵喵」喵喵喵喵喵，喵喵喵，喵喵喵喵喵喵喵喵喵喵「喵喵喵」，喵喵喵喵喵喵。喵喵喵喵喵喵喵喵「喵喵喵」喵喵喵喵，喵喵喵喵喵喵喵喵喵喵喵喵喵、喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵，喵喵喵喵喵喵喵——喵喵，喵喵喵喵「喵喵」喵喵喵。\n" +
        "\n" +
        "春暖花开，载着《诗经》漫游诗意盎然的古典园林。走在粉墙黛瓦之间，把玩着一枚「醉翁之意」的玉佩，叹息时光，怀古幽情。鹊桥相会，明月清风，任笔墨飞舞在宣纸上的「临江仙」，如梦如幻。悠悠岁月中，品味着那「千古风流」的诗词文化，探寻着春风拂面、江南水乡的美景，沉浸在诗词艳丽的画卷，品味着历史与现实交融——岁月，不禁感慨「青青子衿」的诗意。\n" +
        "\n" +
        "在诗集中，唐诗《相思》是由著名诗人王维写的一首借咏物而寄相思的五绝。著名战役安史之乱始于「唐玄宗」天宝十四年，战争中，被叛军异常勇猛直接攻陷「长安城」，玄宗仓皇西逃。王维被叛军的首领「安禄山」扣留在长安，而王维的好友李龟年侥幸出逃、流至江南卖艺为生，此处江南指唐朝江南，在今天的湖南省——同时，也是诗中「南国」的原型。"
     const images = ["../image/waterfall/11.jpg"]

    return (
        <div className={Style["article"]}>
            <div className={Style["slider-container"]}>
                <Carousel showThumbs={false}
                          showStatus={false}
                          showIndicators={false}
                          renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                hasPrev && (
                                    <button onClick={onClickHandler} className={[`${Style["carousel-button"]}`,`${Style["prev"]}`].join(" ")}>
                                        Previous
                                    </button>
                                )
                            }
                          renderArrowNext={(onClickHandler, hasNext, label) =>
                              hasNext && (
                                  <button onClick={onClickHandler} className={[`${Style["carousel-button"]}`,`${Style["next"]}`].join(" ")}>
                                      Next
                                  </button>
                              )
                          }>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Image ${index}`}/>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className={Style["content-container"]}>
                <h1 className={Style["title"]}>{title}</h1>
                <p className={Style["author"]}>作者：{author}</p>
                <div className={Style["content"]}>
                    {content.split('\n\n').map((paragraph, index) => (
                        <p className={Style["paragraph"]} key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    )
 }
