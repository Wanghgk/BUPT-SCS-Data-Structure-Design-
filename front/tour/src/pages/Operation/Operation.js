import {useState,useRef,useEffect} from "react";


import Style from "./Operation.module.css"
import axios from "axios";
import qs from "qs";
import {useSelector} from "react-redux";

export default function Operation(props) {
    const {enActive,flushDetail} = props

    const [results,setResults] = useState([])
    const [nodeDetail,setNodeDetail] = useState({id:0,name:"",img:"http://127.0.0.1:5002/3-d.png"})
    const operationRef = useRef()
    const newflush = useRef(true)

    const token = sessionStorage.getItem("token")
    const darkness = useSelector(state => state.darkness.value)

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         operationRef.current.classList.remove(Style["node-detail"])
    //     },1)
    // })

    useEffect(()=>{
        if(!newflush.current){
            const newNodeDetail = {id:flushDetail.id,name:flushDetail.name,img:"http://127.0.0.1:5002/3-d.png"}
            setNodeDetail(newNodeDetail)
            operationRef.current.classList.add(Style["node-detail"])
        }else {
            newflush.current = false
        }

    },[flushDetail])

    function searchResult(e) {
        operationRef.current.classList.remove(Style["node-detail"])
        // console.log(e.target.value)
        const data = {keyword:e.target.value}
        const header = {headers:{"authorization" : token}}
        axios.post("http://127.0.0.1:8080/path/search",qs.stringify(data),header)
            .then(res=>{
                // console.log(res)
                setResults(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    function showDetail(index) {
        const newNode = results[index]
        const newNodeDetail = {id:newNode.id,name:newNode.name,img:"http://127.0.0.1:5002/3-d.png"}
        setNodeDetail(newNodeDetail)
        operationRef.current.classList.add(Style["node-detail"])
    }

    function postShortestPath(end) {
        const header = {headers:{"authorization" : token}}
        const data = {start:47,end:end}
        axios.post("http://127.0.0.1:8080/path/shortest",qs.stringify(data),header)
            .then(res=>{
                // console.log(res)
                enActive(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    function postFastestPath(end) {
        const header = {headers:{"authorization" : token}}
        const data = {start:47,end:end}
        axios.post("http://127.0.0.1:8080/path/fastest",qs.stringify(data),header)
            .then(res=>{
                // console.log(res)
                enActive(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div className={Style["operation"]} ref={operationRef}>
            <input placeholder={"输入目标地点"} onChange={(e)=>{searchResult(e)}}/>
            <div className={Style["search-result"]}>
                {
                    results.map((item,index)=> {
                        return (
                            <div className={[`${Style["destination"]}`, `${Style[(index%2)===0?"left":"right"]}`].join(' ')} key={item.id} onClick={(e)=>{e.stopPropagation();showDetail(index)}}>{item.name}</div>
                        )

                    })
                }
            </div>
            <div className={Style["detail"]}>
                <div className={Style["node-name"]}>{nodeDetail.name}</div>
                <div className={Style["node-image"]}>
                    <img src={nodeDetail.img}/>
                </div>
                <div className={Style["newtons"]}>
                    <div className={Style["newton-item"]}>
                        <div className={Style["newton"]} onClick={(e)=>{e.stopPropagation();postShortestPath(nodeDetail.id)}}>
                            <i className={["iconfont", "icon-navigation1", `${Style["icon"]}`].join(' ')}></i>
                        </div>
                        <div className={Style["newton-name"]}>最近距离</div>
                    </div>
                    <div className={Style["newton-item"]}>
                        <div className={Style["newton"]} onClick={(e)=>{e.stopPropagation();postFastestPath(nodeDetail.id)}}>
                            <i className={["iconfont", "icon-navigation1", `${Style["icon"]}`].join(' ')}></i>
                        </div>
                        <div className={Style["newton-name"]}>最短时间</div>
                    </div>

                </div>
            </div>
        </div>
    )
}