import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";
import Style from "./AuthorInfo.module.css"


export default function AuthorInfo(props) {
    const {author} = props
    const [authorDetail,setAuthorDetail] = useState({avatar:"",name:""})
    const token = sessionStorage.getItem("token")

    useEffect(()=>{
        const data = {id:Number(author)}
        const header = {headers:{"authorization" : token}}
        axios.post("http://127.0.0.1:8080/user/searchUser",qs.stringify(data),header)
            .then((res)=>{
                console.log(res)
                setAuthorDetail({avatar: res.data.data.avatar,name: res.data.data.nickname})
            })
            .catch(err=>{
                console.log(err)
            })
    },[author])


    return (
        <div className={Style["author-info"]}>
            <img className={Style["author-avatar"]} src={authorDetail.avatar}/>
            <p className={Style["author-nickname"]}>{authorDetail.name}</p>
        </div>
    )
}