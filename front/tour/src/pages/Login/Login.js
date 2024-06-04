import {useState,useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import {toggleDarkness} from "../../redux/features/LeftBar/darknessSlice";
import {setUserId,setUserUsername,setUserAvatar,setUserNickname,setUserToken} from "../../redux/features/Login/userSlice";

import Style from "./Login.module.css"
import axios from "axios";
import qs from "qs";
import PopUp from "../PopUp/PopUp";
export default function Login (props){

    let [login,changeLogin] = useState(true)
    const [popUpContent,setPopUpContent] = useState("")
    // const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const popUp = useRef()
    const navigate = useNavigate()

    function toggleLogin(){
        changeLogin(!login)
    }

    function sinInUp() {
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        if (username === "") {
            setPopUpContent("用户名不能为空")
            popUp.current.classList.add(Style["pop-up-active"])
            setTimeout(()=>{
                popUp.current.classList.remove(Style["pop-up-active"])
            },625)
        } else if (password === "") {
            setPopUpContent("密码不能为空")
            popUp.current.classList.add(Style["pop-up-active"])
            setTimeout(()=>{
                popUp.current.classList.remove(Style["pop-up-active"])
            },625)
        } else {
            if(login){
                //登录
                const data = {
                    username: username,
                    password: password
                }
                axios.post("http://127.0.0.1:8080/user/login",qs.stringify(data))
                    .then(
                        res=> {
                            // console.log(token)
                            const {data} = res
                            if(data.code !== 1 && data.data !== undefined && data.data !== null){
                                dispatch(setUserToken(data.data))
                                sessionStorage.setItem("token",data.data)
                                sessionStorage.setItem("permit",JSON.stringify([true,true,true,true,true]))
                                requestUserInfo(data.data)

                                console.log(data.data,data)
                                navigate("/tour/main")
                            }else {
                                setPopUpContent("用户名或密码错误")
                                popUp.current.classList.add(Style["pop-up-active"])
                                setTimeout(()=>{
                                    popUp.current.classList.remove(Style["pop-up-active"])
                                },625)
                            }


                        }
                    )
                    .catch(
                        err => {
                            console.log(err)
                            setPopUpContent("连接失败")
                            popUp.current.classList.add(Style["pop-up-active"])
                            setTimeout(()=>{
                                popUp.current.classList.remove(Style["pop-up-active"])
                            },625)
                        }
                    )
            }else{
                //注册
                const data = {
                    username: username,
                    password: password
                }
                axios.post("http://127.0.0.1:8080/user/register",qs.stringify(data))
                    .then(res=> {
                        console.log(res)


                    })
                    .catch(err =>console.log(err))
            }
        }
        }




    function requestUserInfo(token) {
        // console.log(token)
        const headers = {
            "authorization" : token
        }
        axios.get("http://127.0.0.1:8080/user/userInfo", {headers:headers})
            .then(res =>console.log(res))
            .catch(err =>console.log(err))
        // console.log(header)
    }

    return (
        <div className={Style["login"]}>
            <div className={Style["shell"]}>
                <h2 className={Style["title"]}>{login ? "Login" : "Register"}</h2>
                <input className={Style["input"]} ref={usernameRef} type="text" autocomplete="off" id="username"
                       placeholder={login ? "Username" : "New Username"}/>
                <input className={Style["input"]} ref={passwordRef} type="password" autocomplete="off" id="password"
                       placeholder={login ? "Password" : "New Password"}/>
                <input className={Style["submit"]} type="submit" value={login ? "Login" : "Register"} id="loginBtn"
                       onClick={sinInUp}/>
                <div className={Style["footer"]}>
                    <div className={Style["Remember"]} style={{opacity: login ? 1 : 0}}>
                        <input type="checkbox" id="rememberMe"/>
                        <span>记住我</span>
                    </div>
                    <button id={Style["Password"]} onClick={toggleLogin}>{login ? "去注册" : "去登录"}</button>

                </div>
            </div>
            <div className={Style["pop-up-container"]} ref={popUp} onClick={(e) => {
                e.preventDefault()
            }}>
                <PopUp width={200} content={popUpContent} height={50} fontSize={20}
                       background={"linear-gradient(rgba(78, 158, 255, 0.5), rgba(39, 113, 255, 0.5))"}
                       textColor={"#f0f0f0"}></PopUp>
            </div>
        </div>
    )
}