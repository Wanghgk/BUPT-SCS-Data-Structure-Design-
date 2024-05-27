import {useEffect, useRef, useState} from "react";
import {useSelector,useDispatch} from "react-redux";

import Style from "./Map.module.css"

import Data from "../../map (6).json"
import Block from "../Block/Block";
import Road from "../Road/Road";
import Operation from "../Operation/Operation";
import axios from "axios";

export default function Map() {
    const [nodes, setNodes] = useState([])
    const [roads, setRoads] = useState([])
    const [mapWidth, setMapWidth] = useState(Data.width)
    const [mapHeight, setMapHeight] = useState(Data.height)
    const [base, setBase] = useState(Data.base)
    const [activeNodes,setActiveNodes] = useState([])
    const [hoverNode,setHoverNode] = useState({id:-1,name:"",show:false,mouseScreenX:-1,mouseScreenY:-1})
    const [flushDetail,setFlushDetail] = useState(-1)


    const token = sessionStorage.getItem("token")
    const darkness = useSelector(state => state.darkness.value)

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

    return (
        <div className={Style["map"]}
             ref={mapRef}
             onMouseDown={(e)=>{dragBegin(e)}}
             onMouseMove={(e)=>{dragging(e)}}
             onMouseUp={dragOver}>
            <div className={Style["blank"]}
                 style={{display:hoverNode.show?"block":"none","--client-x":hoverNode.mouseScreenX, "--client-y":hoverNode.mouseScreenY}}>
                <div className={Style["blank-name"]}>{hoverNode.name}</div>
                <div className={Style["triangle"]}></div>
            </div>
            <div onClick={(e)=>{e.stopPropagation()}}
                 onMouseDown={(e)=>{e.stopPropagation()}}>
                <Operation enActive={enActive} flushDetail={flushDetail}></Operation>

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
                                     style={{left: e.x - 2.5, top: e.y + 1}}></div>
                                <Block pointLeft={0}
                                       pointTop={0}
                                       blockLeft={block.left-2.5}
                                       blockTop={block.top+1}
                                       width={block.width}
                                       height={block.height}
                                       nodeId={"block" + e.id}
                                       rotate={block.rotate}
                                       enableGrab={false}
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
