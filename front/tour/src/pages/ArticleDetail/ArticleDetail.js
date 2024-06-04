import {useState,useEffect,useRef} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { Carousel } from 'react-responsive-carousel'; // 引入轮播图组件

import Style from "./ArticleDetail.module.css"
import axios from "axios";
import ImageSwiper from "../ImageSwiper/ImageSwiper";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import StarRating from "../StarRating/StarRating";
import qs from "qs";

 export default function ArticleDetail() {
     const tempTotalArticles = 38
     const params = useParams();
     const darkness = useSelector(state => state.darkness.value)
     const token = sessionStorage.getItem("token")
     const article = useRef()
     const scoreRef = useRef()
     let [detail,setdetail] = useState({title:"",author:0,content:"",images:[]})
     let [enScore,changeEnScore] = useState(true)

    useEffect(()=>{
        const header = {headers:{"authorization" : token}}
        axios.get("http://127.0.0.1:8080/article/detail?id="+/*((*/Number(params.id)/*-1)%tempTotalArticles+1)*/,{headers:{"authorization" : token}})
            .then(res=>{
                let {data} = res.data
                // console.log(res,typeof data.content)
                setdetail({title: data.title,author: data.createUser,content: data.content,images: data.coverImg.split(",")})
            })
            .catch(err =>console.log(err))
        let data = {id:Number(params.id)}
        axios.post("http://127.0.0.1:8080/article/view",qs.stringify(data),header)
    },[])

     useEffect(()=>{
         if(darkness){
             article.current.classList.add(Style["dark"])
         }else{
             article.current.classList.remove(Style["dark"])
         }
     },[darkness])

     function setScore(score) {
         scoreRef.current = score
     }

     function postScore() {
         const data = {id:Number(params.id),score:scoreRef.current}
         const header = {headers:{"authorization" : token}}
         axios.post("http://127.0.0.1:8080/article/score",qs.stringify(data),header)
             .then(()=>{
                 changeEnScore(false)
             })
             .catch(()=>{})

     }


     const images = ["../image/waterfall/11.jpg"]

    return (
        <div className={Style["article"]} ref={article}>
            <div className={Style["slider-container"]}>
                {/*<Carousel showThumbs={false}*/}
                {/*          showStatus={false}*/}
                {/*          showIndicators={false}*/}
                {/*          renderArrowPrev={(onClickHandler, hasPrev, label) =>*/}
                {/*              hasPrev && (*/}
                {/*                  <button onClick={onClickHandler}*/}
                {/*                          className={[`${Style["carousel-button"]}`, `${Style["prev"]}`].join(" ")}>*/}
                {/*                      Previous*/}
                {/*                  </button>*/}
                {/*              )*/}
                {/*          }*/}
                {/*          renderArrowNext={(onClickHandler, hasNext, label) =>*/}
                {/*              hasNext && (*/}
                {/*                  <button onClick={onClickHandler}*/}
                {/*                          className={[`${Style["carousel-button"]}`, `${Style["next"]}`].join(" ")}>*/}
                {/*                      Next*/}
                {/*                  </button>*/}
                {/*              )*/}
                {/*          }>*/}
                {/*    {detail.images.map((image, index) => (*/}
                {/*        <div key={index}>*/}
                {/*            <img src={image} alt={`Image ${index}`}/>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</Carousel>*/}
                <ImageSwiper images={detail.images}/>
            </div>
            <div className={Style["content-container"]}>
                <div className={Style["title"]}>{detail.title}</div>
                <AuthorInfo author={detail.author}/>
                <div className={Style["content"]}>
                    {detail.content.split('\n').map((paragraph, index) => (
                        <p className={Style["paragraph"]} key={index}>{paragraph}</p>
                    ))}
                </div>
                <div className={Style["star-score"]} >
                    <StarRating setScore={setScore} enScore={enScore}/>
                    {
                        enScore &&
                        <div className={Style["post-button"]} onClick={postScore}>提交评分</div>
                    }
                </div>
            </div>
        </div>
    )
 }
