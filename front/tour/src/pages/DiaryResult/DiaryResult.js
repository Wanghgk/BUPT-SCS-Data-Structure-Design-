import {useRef,useEffect,useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";


import ArticalCard from "../ArticalCard/ArticalCard";

import Style from "./DiaryResult.module.css"
import "../../iconfont.css"
import axios from "axios";
import {setDiaryScrollY} from "../../redux/features/Diary/diaryStateSlice";

export default function DiaryResult() {

    let isLoading;

    const diary = useRef()
    const search = useRef()
    const searchInput = useRef()
    const navigate = useNavigate()

    const token = sessionStorage.getItem("token")
    const darkness = useSelector(state => state.darkness.value)
    let [articles,setArticles] = useState([])

    const dispatch = useDispatch()

    const params = useParams();

    useEffect(() => {

        isLoading = false
        diary.current.addEventListener('scroll', handleScroll);

        const diaryCurrent = diary.current

        //加载初始article
        axios.get("http://127.0.0.1:8080/article/search?title="+params.title,
            {headers:{"authorization" : token}})
            .then(res=>{
                // console.log(res)
                setArticles(res.data)
            })
            .catch(err=>{
                console.log(err)
            })

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

    function handleScroll(){
        dispatch(setDiaryScrollY(Number(diary.current.scrollTop)))

        // console.log(diary.current.scrollTop,diary.current.offsetHeight,diary.current.scrollHeight)
        const scrollTop = diary.current.scrollTop;

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
            axios.get("http://127.0.0.1:8080/article/search?title="+params.title,
                {headers:{"authorization" : token}})
                .then(res=>{
                    // console.log(res)
                    setArticles(res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
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
                        return (<div className={Style["block"]} key={item.id} onClick={()=> {
                            toArticle(item.id)
                        }}>
                            <ArticalCard title={item.title} imgUrl={item.coverImg}></ArticalCard>
                        </div>)

                    })
                }
            </div>


        </div>
    )
}