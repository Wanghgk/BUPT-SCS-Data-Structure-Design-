import {useState, useEffect, useRef} from "react";

import Style from "./UserInfo.module.css"
import {userSlice} from "../../redux/features/Login/userSlice";
import axios from "axios";
import ArticalCard from "../ArticalCard/ArticalCard";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function UserInfo(props) {
    const {userInfo} = props

    const [diaries,setDiaries] = useState([])
    const navigate = useNavigate()
    const userInfoRef = useRef()

    const token = sessionStorage.getItem("token")
    const darkness = useSelector(state => state.darkness.value)

    function toArticle(id) {
        navigate(`../article/${id}`)
    }

    useEffect(()=>{
        axios.get("http://127.0.0.1:8080/article/list",{headers:{"authorization" : token}})
            .then(res=>{
                console.log(res)
                setDiaries(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])

    useEffect(()=>{
        if(darkness){
            userInfoRef.current.classList.add(Style["dark"])
        }else{
            userInfoRef.current.classList.remove(Style["dark"])
        }
    },[darkness])

    return (
        <div className={Style["user-info"]}  ref={userInfoRef}>
            <div className={Style["basic-info"]} >
                <div className={Style["avatar"]} >
                    <img src={userInfo.avatar} alt={"头像"}/>
                </div>
                <div className={Style["names"]}>
                    <div className={Style["nickname"]}>昵称：{userInfo.nickname}</div>
                </div>
            </div>

            <div className={Style["diaries-list"]} >
                {
                    diaries.map((item)=>{
                        return (
                            <div className={Style["diary"]} key={item.id} onClick={(ele)=>{ele.stopPropagation();toArticle(item.id)}}>
                                <ArticalCard title={item.title} imgUrl={item.coverImg} small={true}></ArticalCard>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}