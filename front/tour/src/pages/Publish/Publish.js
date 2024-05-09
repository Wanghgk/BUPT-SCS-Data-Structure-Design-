import {useState, useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import FormData from 'form-data';

import Style from "./Publish.module.css"
import "../../iconfont.css"
import axios from "axios";
import qs from "qs";

export default function Publish() {
    const darkness = useSelector(state => state.darkness.value)
    const token = sessionStorage.getItem("token")
    const publish = useRef()
    const upload = useRef()
    const title = useRef()
    const content = useRef()
    const [src, setSrc] = useState("none")

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
                        console.log(err)
                    })
            }
            reader.readAsDataURL(imgUrl)
        }catch (err){
            console.log(err)
        }
    }

    function addArticle() {
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
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className={Style["publish"]} ref={publish}>
            <div className={Style["form-group"]}>
                <h2>标题：</h2>
                <input
                    type="text"
                    id="title"
                    // onChange={handleTitleChange}
                    ref={title}
                />
            </div>
            <div className={Style["form-group"]}>
                <h2>内容：</h2>
                <textarea
                    id="content"
                    // onChange={handleContentChange}
                    ref={content}
                />
            </div>
            <div className={Style["form-group"]}>
                <h2>上传图片：</h2>
                <img className={Style["preview-img"]} src={src} style={{display: (src === "none") ? "none" : "block"}}/>
                <button className={Style["upload-button"]} onClick={chooseFile}>
                    <i className={["iconfont", "icon-shangchuan", `${Style["icon"]}`].join(' ')}></i>上传图片
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
            <button id={Style["submit"]} type="submit" onClick={addArticle}>提交</button>
        </div>
    )
}