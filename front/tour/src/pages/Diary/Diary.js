import {useRef,useEffect,useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setDiaryScrollY,setDiaryArticles,incRequestTimes} from "../../redux/features/Diary/diaryStateSlice"

import ArticalCard from "../ArticalCard/ArticalCard";
import tempArticles from "./tempArticles";

import Style from "./Diary.module.css"
import "../../iconfont.css"
import axios from "axios";

export default function Diary() {

    const tempTotalArticles = 38

    let isLoading;

    const diary = useRef()
    const navigate = useNavigate()

    const token = sessionStorage.getItem("token")
    const darkness = useSelector(state => state.darkness.value)
    let pastScrollY = useSelector(state => state.diaryState.scrollY)
    let articles = useSelector(state => state.diaryState.articles)
    let requestTimes = useSelector(state => state.diaryState.requestTimes)
    const dispatch = useDispatch()
    const localTimesRef = useRef(0)
    const localArticlesRef = useRef([])


    // 在组件挂载和卸载时添加和移除滚动事件监听器
    useEffect(() => {
        //挂载时判断是否为第一次打开，若为第一次则请求数据
        if(requestTimes === 0){
            newArticles()
            // dispatch(incRequestTimes())
            // localTimesRef.current = 1
            // dispatch(setDiaryArticles(tempArticles))
            // localArticlesRef.current = tempArticles
        }else {
            localTimesRef.current = requestTimes
            localArticlesRef.current = articles
        }

        isLoading = false
        diary.current.scrollTo(0,pastScrollY)
        diary.current.addEventListener('scroll', handleScroll);

        const diaryCurrent = diary.current
        return () => {
            diaryCurrent.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(()=>{
        if(darkness){
            diary.current.classList.add(Style["dark"])
        }else{
            diary.current.classList.remove(Style["dark"])
        }
    },[darkness])

    useEffect(()=>{},[articles])

    function handleScroll(){
        dispatch(setDiaryScrollY(Number(diary.current.scrollTop)))

        // console.log(diary.current.scrollTop,diary.current.offsetHeight,diary.current.scrollHeight)
        const scrollTop = diary.current.scrollTop;
        const windowHeight = diary.current.offsetHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            diary.current.scrollHeight
        );

        // 判断是否触底
        if (scrollTop + windowHeight + 60 >= documentHeight && !isLoading) {
            isLoading = true
            // console.log('触底了！');
            setTimeout(()=>{
                newArticles()
                // console.log(articles.length)
                isLoading = false
            },1000)

        }
        // console.log(typeof Number(window.scrollY))
    }

    function newArticles(){

        // console.log(localTimesRef.current,localArticlesRef.current)
        // 模拟请求
        axios.get("http://127.0.0.1:8080/article/recommend?size=30&receiveCategories=true,true,true,true,true",
            {headers:{"authorization" : token}})
            .then((res)=>{
                // console.log(res)
                let resArray = res.data.data
                let newArticles = [];
                // console.log(newArticles,newArticles.length)
                for (let i = 0; i < 3; ++i) {
                    let sliced = localArticlesRef.current.slice(i * localTimesRef.current * 10, (i + 1) * localTimesRef.current * 10);
                    // console.log("before concat:",newArticles)
                    newArticles = newArticles.concat(sliced);
                    // console.log("slice:",sliced,"concat:",newArticles)
                    for (let j = i * 10; j < (i + 1) * 10; ++j) {
                        newArticles.push({ id: resArray[j].id, title:resArray[j].title, imgUrl: resArray[j].coverImg, key:resArray[j].id + "-" + localTimesRef.current});
                    }
                }

                localTimesRef.current += 1
                dispatch(incRequestTimes())
                // 更新 articles
                // console.log("newArticles:",newArticles)
                localArticlesRef.current = newArticles
                dispatch(setDiaryArticles(newArticles));
            })
            .catch((err)=>{console.log(err)})


    }

    function toArticle(id) {
        navigate(`../article/${id}`)
    }

    return (
        <div className={Style["diary"]} ref={diary}>
            <div className={Style["write-artical"]} onClick={()=>{navigate("../publish")}}>
                <i  className={["iconfont","icon-bi",`${Style["icon"]}`].join(' ')} ></i>
            </div>
            <div className={Style["waterfall"]}>
                {/*<div className={Style["block"]}>*/}
                {/*    <ArticalCard imgUrl={"./image/waterfall/1.jpg"}></ArticalCard>*/}
                {/*</div>*/}
                {
                    articles.map((item)=> {
                        return (<div className={Style["block"]} key={item.key} onClick={()=> {
                            toArticle(item.id)
                        }}>
                            <ArticalCard title={item.title} imgUrl={item.imgUrl}></ArticalCard>
                        </div>)

                    })
                }
            </div>


        </div>
    )
}