import {useState,useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import {toggleDarkness} from "../../redux/features/LeftBar/darknessSlice";
import {setUserId,setUserUsername,setUserAvatar,setUserNickname,setUserToken} from "../../redux/features/Login/userSlice";

import Style from "./Login.module.css"
import axios from "axios";
import qs from "qs";
export default function Login (props){

    let [login,changeLogin] = useState(true)
    // const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    function toggleLogin(){
        changeLogin(!login)
    }

    function sinInUp() {
        const username = usernameRef.current.value
        const password = passwordRef.current.value


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
                            dispatch(setUserToken(data.data))
                            sessionStorage.setItem("token",data.data)
                            requestUserInfo(data.data)

                            console.log(data.data)
                            if(data.data !== undefined){
                                navigate("/tour/main")
                            }
                        }
                    )
                    .catch(err =>console.log(err))
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
                <input ref={usernameRef} type="text" id="username" placeholder={login ? "Username" : "New Username"}/>
                <input ref={passwordRef} type="password" id="password" placeholder={login ? "Password" : "New Password"}/>
                <input type="submit" value={login ? "Login" : "Register"} id="loginBtn" onClick={sinInUp}/>
                <div className={Style["footer"]}>
                    <div className={Style["Remember"]} style={{opacity: login ? 1 : 0}}>
                        <input type="checkbox" id="rememberMe"/>
                        <span>记住我</span>
                    </div>
                    <button id={Style["Password"]} onClick={toggleLogin}>{login?"去注册":"去登录"}</button>

                </div>
            </div>
        </div>
    )
}