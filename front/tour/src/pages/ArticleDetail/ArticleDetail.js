import {useState,useEffect,useRef} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { Carousel } from 'react-responsive-carousel'; // 引入轮播图组件

import Style from "./ArticleDetail.module.css"
import axios from "axios";

 export default function ArticleDetail() {
     const params = useParams();
     const darkness = useSelector(state => state.darkness.value)
     const token = sessionStorage.getItem("token")
     const article = useRef()
     let [detail,setdetail] = useState({title:"",author:"",content:"",images:[]})

    useEffect(()=>{
        axios.get("http://127.0.0.1:8080/article/detail?id="+((Number(params.id)-1)%30+1),{headers:{"authorization" : token}})
            .then(res=>{
                let {data} = res.data
                // console.log(res,typeof data.content)
                setdetail({title: data.title,author: data.createUser,content: data.content,images: [data.coverImg]})
            })
            .catch(err =>console.log(err))
    },[])

     useEffect(()=>{
         if(darkness){
             article.current.classList.add(Style["dark"])
         }else{
             article.current.classList.remove(Style["dark"])
         }
     },[darkness])


     const images = ["../image/waterfall/11.jpg"]

    return (
        <div className={Style["article"]} ref={article}>
            <div className={Style["slider-container"]}>
                <Carousel showThumbs={false}
                          showStatus={false}
                          showIndicators={false}
                          renderArrowPrev={(onClickHandler, hasPrev, label) =>
                              hasPrev && (
                                  <button onClick={onClickHandler}
                                          className={[`${Style["carousel-button"]}`, `${Style["prev"]}`].join(" ")}>
                                      Previous
                                  </button>
                              )
                          }
                          renderArrowNext={(onClickHandler, hasNext, label) =>
                              hasNext && (
                                  <button onClick={onClickHandler}
                                          className={[`${Style["carousel-button"]}`, `${Style["next"]}`].join(" ")}>
                                      Next
                                  </button>
                              )
                          }>
                    {detail.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Image ${index}`}/>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className={Style["content-container"]}>
                <div className={Style["title"]}>{detail.title}</div>
                <p className={Style["author"]}>作者：{detail.author}</p>
                <div className={Style["content"]}>
                    {detail.content.split('\n').map((paragraph, index) => (
                        <p className={Style["paragraph"]} key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    )
 }
