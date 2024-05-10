import {useState, useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import FormData from 'form-data';

import Style from "./Publish.module.css"
import "../../iconfont.css"
import axios from "axios";
import qs from "qs";
import PopUp from "../PopUp/PopUp";

export default function Publish() {
    const darkness = useSelector(state => state.darkness.value)
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token")
    const publish = useRef()
    const upload = useRef()
    const title = useRef()
    const content = useRef()
    const popUp = useRef()
    let enableSubmit = useRef(true)
    const [src, setSrc] = useState("none")
    const [popUpContent,setPopUpContent] = useState("")

    useEffect(() => {
        if (darkness) {
            publish.current.classList.add(Style["dark"])
        } else {
            publish.current.classList.remove(Style["dark"])
        }
    }, [darkness]);

    function chooseFile() {
        upload.current.click()
    }

    function handleImageChange(e) {
        try {
            let imgUrl = e.target.files[0]

            let reader = new FileReader()
            const formData = new FormData()
            formData.append('file', imgUrl)
            reader.onload = function () {
                const header = {
                    "authorization": token,
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary123456654321'
                }
                //向后端发送图片
                axios({
                    url: "http://127.0.0.1:8080/upload",
                    method: 'POST',
                    data: formData,
                    headers: header
                })
                    .then((res) => {
                        // console.log(res)
                        // console.log(res.data.data)
                        setSrc("http://" + res.data.data)

                    })
                    .catch((err) => {
                        // console.log(err)
                        setPopUpContent("请求服务器失败")
                        popUp.current.classList.add(Style["pop-up-active"])
                        setTimeout(()=>{
                            popUp.current.classList.remove(Style["pop-up-active"])
                            enableSubmit.current = true;
                        },625)
                    })
            }
            reader.readAsDataURL(imgUrl)
        }catch (err){
            console.log(err)
        }
    }

    function addArticle() {
        if(enableSubmit.current){
            enableSubmit.current = false
            // console.log("title:",title.current.value)
            // console.log("content:",content.current.value)
            const data = {
                title: title.current.value,
                content: content.current.value,
                coverImg: src,
                categoryId: 1
            }


            const header = {
                "authorization": token
            }

            axios.post("http://127.0.0.1:8080/article", data, {headers: header})
                .then((res) => {
                    console.log(res)
                    setPopUpContent("上传成功")
                    popUp.current.classList.add(Style["pop-up-active"])
                    setTimeout(()=>{
                        popUp.current.classList.remove(Style["pop-up-active"])
                        enableSubmit.current = true;
                        navigate('../diary')
                    },625)
                })
                .catch((err) => {
                    // console.log(err)
                    setPopUpContent("请求服务器失败")
                    popUp.current.classList.add(Style["pop-up-active"])
                    setTimeout(()=>{
                        popUp.current.classList.remove(Style["pop-up-active"])
                        enableSubmit.current = true;
                    },625)
                })
        }

    }


    return (
        <div className={Style["publish"]} ref={publish}>
            <div className={Style["position"]}>
                <h1 className={Style["outline"]}>读万卷书，行万里路</h1>
                <div className={Style["form-group"]}>
                    <h2>标题：</h2>
                    <input className={Style["textarea"]}
                           type="text"
                           id="title"
                           autocomplete="off"
                        // onChange={handleTitleChange}
                           ref={title}
                    />
                </div>
                <div className={Style["form-group"]}>
                    <h2>内容：</h2>
                    <textarea className={Style["textarea"]}
                              id={Style["content"]}
                        // onChange={handleContentChange}
                              ref={content}
                    />
                </div>
                <div className={Style["form-group"]}>
                    <h2>上传图片：</h2>
                    <img className={Style["preview-img"]} src={src}
                         style={{visibility: (src === "none") ? "hidden" : "visible"}}/>
                    <button className={Style["button"]} id={Style["upload-button"]} onClick={chooseFile}>
                        <i className={["iconfont", "icon-shangchuan", `${Style["icon"]}`].join(' ')}></i>上传图片(一张)
                    </button>
                    <input
                        style={{display: "none"}}
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            handleImageChange(e)
                        }}
                        ref={upload}
                    />
                </div>
                <button className={Style["button"]} id={Style["submit"]} type="submit" onClick={addArticle}>提交
                </button>
            </div>
            <div className={Style["pop-up-container"]} ref={popUp} onClick={(e)=>{e.preventDefault()}}>
                <PopUp width={200} content={popUpContent} height={50} fontSize={20} background={darkness?"linear-gradient(rgba(78, 158, 255, 0.5), rgba(39, 113, 255, 0.5))":"linear-gradient(rgba(78, 158, 255, 0.5), rgba(39, 113, 255, 0.5))"} textColor={darkness?"#f0f0f0":"#c0c0c0"}></PopUp>
            </div>
        </div>
    )
}