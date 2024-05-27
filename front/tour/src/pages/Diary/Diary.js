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
    const search = useRef()
    const searchInput = useRef()
    const navigate = useNavigate()

    const token = sessionStorage.getItem("token")
    const darkness = useSelector(state => state.darkness.value)
    let pastScrollY = useSelector(state => state.diaryState.scrollY)
    let articles = useSelector(state => state.diaryState.articles)
    let requestTimes = useSelector(state => state.diaryState.requestTimes)
    const dispatch = useDispatch()
    const localTimesRef = useRef(0)
    const localArticlesRef = useRef([])
    const permitRef = useRef([true,true,true,true,true])
    let getNewArticleUrl = "http://127.0.0.1:8080/article/recommend?size=30&receiveCategories="


    // 在组件挂载和卸载时添加和移除滚动事件监听器
    useEffect(() => {
        //获取允许推荐的内容
        let permit = sessionStorage.getItem("permit")
        permitRef.current = JSON.parse(permit)
        // console.log(permit,permitRef.current)
        getNewArticleUrl += permitRef.current[0]?"true,":"false,"
        getNewArticleUrl += permitRef.current[1]?"true,":"false,"
        getNewArticleUrl += permitRef.current[2]?"true,":"false,"
        getNewArticleUrl += permitRef.current[3]?"true,":"false,"
        getNewArticleUrl += permitRef.current[4]?"true":"false"

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

        //判断是否缩放搜索框
        if(scrollTop > 100) {
            search.current.classList.add(Style["small"])
            search.current.classList.remove(Style["big"])
        }else {
            search.current.classList.remove(Style["small"])
            search.current.classList.add(Style["big"])
        }
        // console.log(typeof Number(window.scrollY))
    }

    function newArticles(){
        // console.log("1")

        // console.log(localTimesRef.current,localArticlesRef.current)
        // 模拟请求

        // true,true,true,true,true

        // console.log(getNewArticleUrl)
        axios.get(getNewArticleUrl,
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
                    for (let j = i * 10; j < (i + 1) * 10 && j<resArray.length; ++j) {
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

    function articleSearch() {
        if(search.current.classList.contains(Style["small"])) {
            //已经缩小，执行放大
            search.current.classList.remove(Style["small"])
            search.current.classList.add(Style["big"])
        }else {
            //已经放大，可以搜索
            navigate(`../result/${searchInput.current.value}`)
            // console.log(searchInput.current.value)
        }
    }

    return (
        <div className={Style["diary"]} ref={diary}>
            <div className={Style["write-artical"]} onClick={()=>{navigate("../publish")}}>
                <i  className={["iconfont","icon-bi",`${Style["icon"]}`].join(' ')} ></i>
            </div>
            <div className={Style["search-scale"]}>
                <div className={[`${Style["search"]}`, `${Style["big"]}`].join(' ')} ref={search}>
                    <input className={Style["search-input"]} placeholder={"SEARCH"} ref={searchInput}/>
                    <div className={Style["search-button"]} onClick={articleSearch}>
                        <i className={["iconfont", "icon-sousuo1", `${Style["icon"]}`].join(' ')}></i>
                    </div>
                </div>
            </div>

            <div className={Style["waterfall"]}>
                {
                    articles.map((item) => {
                        return (<div className={Style["block"]} key={item.key} onClick={()=> {
                            toArticle(item.id)
                        }}>
                            <ArticalCard title={item.title} imgUrl={item.imgUrl} small={false}></ArticalCard>
                        </div>)

                    })
                }
            </div>


        </div>
    )
}