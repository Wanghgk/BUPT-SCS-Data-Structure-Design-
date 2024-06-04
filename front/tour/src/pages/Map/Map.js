import {useEffect, useRef, useState} from "react";
import {useSelector,useDispatch} from "react-redux";

import Style from "./Map.module.css"

import Data from "../../map (6).json"
import Block from "../Block/Block";
import Road from "../Road/Road";
import Operation from "../Operation/Operation";
import axios from "axios";
import qs from "qs";

export default function Map() {
    const [nodes, setNodes] = useState([])
    const [roads, setRoads] = useState([])
    const [mapWidth, setMapWidth] = useState(Data.width)
    const [mapHeight, setMapHeight] = useState(Data.height)
    const [base, setBase] = useState(Data.base)
    const [activeNodes,setActiveNodes] = useState([])
    const [targets,setTargets] = useState([])
    const [hoverNode,setHoverNode] = useState({id:-1,name:"",show:false,mouseScreenX:-1,mouseScreenY:-1})
    const [flushDetail,setFlushDetail] = useState(-1)
    const [nowPosition,setNowPosition] = useState(47)
    const [focusNode,setFocusNode] = useState(-1)
    const [vehicle,setVehicle] = useState(0)
    const nowVehicle = useRef(0)



    const token = sessionStorage.getItem("token")
    const darkness = useSelector(state => state.darkness.value)
    const inRef = useRef(false)

    const draggingRef = useRef({
        isDragging: false,
        beginX: 0,
        beginY: 0,
    })
    const mapRef = useRef()

    useEffect(()=>{
        const header = {headers:{"authorization" : token}}
        axios.get("http://127.0.0.1:8080/path/nodes",header)
            .then(res=>{
                // console.log(res)
                setNodes(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        axios.get("http://127.0.0.1:8080/path/roads",header)
            .then(res=>{
                // console.log(res)
                setRoads(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        // mapScrollTo(959,643)//北邮位置
    },[])

    function dragBegin(e){
        draggingRef.current.isDragging = true;
        draggingRef.current.beginX = e.clientX;
        draggingRef.current.beginY = e.clientY;
    }

    function dragging(e){
        if(draggingRef.current.isDragging){
            let deltaX = e.clientX - draggingRef.current.beginX;
            let deltaY = e.clientY - draggingRef.current.beginY;
            draggingRef.current.beginX = e.clientX;
            draggingRef.current.beginY = e.clientY;
            mapRef.current.scrollTop -= deltaY;
            mapRef.current.scrollLeft -= deltaX;
        }
    }

    function dragOver(){
        draggingRef.current.isDragging = false;
    }

    function enActive(toActive) {
        setActiveNodes(toActive)
    }

    function handleBlank(ele,id,name,show) {
        // console.log(ele)
        var scrollX = mapRef.current.scrollLeft || mapRef.current.scrollLeft;
        var scrollY = mapRef.current.scrollTop || mapRef.current.scrollTop;
        setHoverNode({id:id,name:name,show:show,mouseScreenX:ele.screenX+scrollX,mouseScreenY:ele.screenY+scrollY})
    }

    function toggleFlush(node) {
        setFlushDetail(node)
    }

    function changePosition(id) {
        setNowPosition(id)
    }

    function switchVehicle(kind) {
        // console.log(kind)
        setVehicle(kind)
        nowVehicle.current = kind
    }

    function mapScrollTo(id,left,top) {
        setFocusNode(id)
        const width = mapRef.current.clientWidth
        const height = mapRef.current.clientHeight
        // console.log(width,height)
        const position = {
            left: (left - width / 2),
            top: (top - height / 2),
            behavior: "smooth"
        }
        mapRef.current.scrollTo(position)
    }

    function changeTarget(id,add) {
        let newTargets = targets
        if(add){
            if(id !== nowPosition)
                setTargets([...newTargets,id])
        }else {
            newTargets = newTargets.filter((item)=>{
                return item !== id
            })
            setTargets([...newTargets])
        }

    }

    function goin(goIn,nowNode) {
        const header = {headers:{"authorization" : token}}
        inRef.current = goIn;
        const data = {isIn:goIn}
        setNodes([])
        setRoads([])
        if(goIn) {
            axios.post("http://127.0.0.1:8080/path/view",qs.stringify({id:nowNode}),header)
        }
            axios.post("http://127.0.0.1:8080/path/setIn",qs.stringify(data),header)
                .then((res)=>{
                    axios.get("http://127.0.0.1:8080/path/nodes",header)
                        .then(res=>{
                            // console.log(res)
                            setNodes(res.data.data)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    axios.get("http://127.0.0.1:8080/path/roads",header)
                        .then(res=>{
                            // console.log(res)
                            setRoads(res.data.data)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
                .catch(err=>{
                    console.log(err)
                })


    }

    return (
        <div className={Style["map"]}
             ref={mapRef}
             onMouseDown={(e)=>{dragBegin(e)}}
             onMouseMove={(e)=>{dragging(e)}}
             onMouseUp={dragOver}>
            <div className={Style["blank"]}
                 style={{display:hoverNode.show?"block":"none","--client-x":hoverNode.mouseScreenX, "--client-y":hoverNode.mouseScreenY}}>
                <div className={Style["blank-name"]}>
                    {/*<div>id:{hoverNode.id}</div>*/}
                    <div>{hoverNode.name}</div>
                </div>
                <div className={Style["triangle"]}></div>
            </div>
            <div onClick={(e)=>{e.stopPropagation()}}
                 onMouseDown={(e)=>{e.stopPropagation()}}>
                <Operation enActive={enActive} flushDetail={flushDetail} changePosition={changePosition} mapScrollTo={mapScrollTo} changeTarget={changeTarget} vehicle={nowVehicle.current} roads={roads} targets={targets} goin={goin}></Operation>
                <div className={Style["settings"]} onClick={(e)=>{e.stopPropagation()}}>
                    <div className={Style["setting"]} onClick={()=>{switchVehicle(0)}}>
                        <i className={["iconfont", "icon-qiche", `${Style["icon"]}`].join(' ')} style={nowVehicle.current===0?{color:"#0b6fea"}:{}}></i>
                        <div className={Style["setting-name"]} style={nowVehicle.current===0?{color:"#0b6fea"}:{}}>汽车</div>
                    </div>
                    <div className={Style["setting"]} onClick={()=>{switchVehicle(1)}}>
                        <i className={["iconfont", "icon-mbile", `${Style["icon"]}`].join(' ')} style={nowVehicle.current===1?{color:"#0b6fea"}:{}}></i>
                        <div className={Style["setting-name"]} style={nowVehicle.current===1?{color:"#0b6fea"}:{}}>电动车</div>
                    </div>
                    <div className={Style["setting"]} onClick={()=>{switchVehicle(2)}}>
                        <i className={["iconfont", "icon-zihangche", `${Style["icon"]}`].join(' ')} style={nowVehicle.current===2?{color:"#0b6fea"}:{}}></i>
                        <div className={Style["setting-name"]} style={nowVehicle.current===2?{color:"#0b6fea"}:{}}>自行车</div>
                    </div>
                    <div className={Style["setting"]} onClick={()=>{switchVehicle(3)}}>
                        <i className={["iconfont", "icon-buxing", `${Style["icon"]}`].join(' ')} style={nowVehicle.current===3?{color:"#0b6fea"}:{}}></i>
                        <div className={Style["setting-name"]} style={nowVehicle.current===3?{color:"#0b6fea"}:{}}>步行</div>
                    </div>
                </div>
            </div>

            {
                nodes.map((e) => {
                    if (e.kind) {

                        const block = JSON.parse(e.block)
                        return (
                            <div key={"node" + e.id}
                                 onMouseEnter={(ele)=>{handleBlank(ele,e.id,e.name,true)}}
                                 onMouseMove={(ele)=>{handleBlank(ele,e.id,e.name,true)}}
                                 onMouseLeave={(ele)=>{handleBlank(ele,e.id,e.name,false)}}
                                 onClick={(ele)=>{ele.stopPropagation();toggleFlush(e)}}
                                 style={{cursor:"pointer"}}
                            >
                                <div className={Style["node"]}
                                     style={{left: e.x - 2.5, top: e.y + 1, background:e.id===nowPosition?"#71a5f1":e.id===focusNode?"#80c05e":targets.includes(e.id)?"#f6e65b":""}}></div>
                                <Block pointLeft={0}
                                       pointTop={0}
                                       blockLeft={block.left-2.5}
                                       blockTop={block.top+1}
                                       width={block.width}
                                       height={block.height}
                                       nodeId={"block" + e.id}
                                       name={e.name}
                                       rotate={block.rotate}
                                       enableGrab={false}
                                       showName={false}
                                       setBlockPosition={null}
                                       focusNode={null}
                                ></Block>
                            </div>
                        )
                    } else {
                        return (
                            <div key={"node" + e.id}>
                                <div className={Style["node"]}
                                     style={{left: e.x - 2.5, top: e.y + 1}}></div>
                            </div>
                        )
                    }
                })
            }
            {
                roads.map((e) => {
                    return (
                        <div key={"road" + e.id}>
                            <Road left={e.left} top={e.top} distance={e.distance}
                                  thickness={e.thickness} deg={e.angle} active={activeNodes.includes(e.id)}></Road>
                        </div>
                    )
                })
            }
        </div>
    )
}
